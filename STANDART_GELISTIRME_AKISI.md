# Melo Standart Geliştirme Akışı (Golden Workflow)

Bu belge, veritabanı sorunlarıyla vakit kaybetmeden, doğrudan üretime odaklanmak için izlenmesi gereken standart süreçleri içerir.

## 1. Başlangıç: Docker ile Yerel PostgreSQL (Local Environment)

Projeye başlarken bilgisayarına PostgreSQL kurmak yerine, proje kök dizininde bir `docker-compose.yml` dosyası oluştur. Bu yöntem temizdir, projeyi silince veritabanı da arkada çöp bırakmaz.

**Dosya:** `docker-compose.yml`
```yaml
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    container_name: melo_project_db
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: melodb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Nasıl Çalıştırılır?**
Terminalde şu komutu yazman yeterli:
```bash
docker-compose up -d
```
*Artık yerel bilgisayarında 5432 portunda çalışan bir PostgreSQL var!*

---

## 2. Çevre Değişkenleri (.env)

Yerel geliştirmede `.env` dosyan her zaman şu formatta olmalı. Docker ayarlarıyla eşleşmeli.

**Dosya:** `.env`
```bash
# Docker'daki ayarlarla aynı olmalı
DATABASE_URL="postgresql://admin:password123@localhost:5432/melodb"

# NextAuth (Geliştirme için)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gizli-yerel-sifre"
```

---

## 3. Veritabanı Bağlantısı (db.ts - Standart)

Her projede `src/lib/db.ts` dosyanı şu şekilde oluştur. Bu yapı hem yerelde (SSL kapalı) hem de Coolify sunucusunda (SSL gerekliyse) hatasız çalışır.

**Dosya:** `src/lib/db.ts`
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Coolify/Production ise SSL ayarını otomatik yap, Local ise kapat
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const db = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: async (text: string, params?: any[]) => {
    // Burada standart PostgreSQL ($1, $2...) kullanıyoruz.
    return pool.query(text, params);
  },
};
```

---

## 4. Veritabanı Şeması Yönetimi (Migration Strategy)

Tek tek `setup-db.js`, `update-table.js` gibi scriptler yerine, projenin kök dizininde tek bir **`schema.sql`** dosyası tut.

**Dosya:** `schema.sql`
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    -- ...
);

CREATE TABLE IF NOT EXISTS posts (
    -- ...
);
```

**Kurulum Scripti (package.json için):**
Bu, hem yerelde hem sunucuda çalışacak tek komuttur.

**Dosya:** `scripts/setup-db.js`
```javascript
/* eslint-disable @typescript-eslint/no-require-imports */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function setup() {
    try {
        const sql = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
        await pool.query(sql);
        console.log('✅ Veritabanı tabloları başarıyla oluşturuldu.');
    } catch (e) {
        console.error('❌ Hata:', e);
    } finally {
        await pool.end();
    }
}

setup();
```

---

## 5. Deployment (Coolify) Kontrol Listesi

Yayına alırken şu 3 adımı uygula, hata alma ihtimalin %0'a iner.

1.  **Coolify'da DB Oluştur:** PostgreSQL veritabanını oluştur ve "Internal Connection URL"i kopyala.
2.  **Environment Variables:**
    *   `DATABASE_URL`: Kopyaladığın URL.
    *   `NEXTAUTH_URL`: `https://senin-domainin.com`
    *   `NEXTAUTH_SECRET`: Uzun rastgele bir şifre.
3.  **Deploy Komutu:**
    *   Build Command: `npm run build`
    *   Start Command: `node scripts/setup-db.js && next start`

---

## Özet

1.  Projeye başla -> `docker-compose up -d` (Postgres hazır).
2.  Kodla -> `schema.sql` dosyasını güncelle.
3.  Yayına al -> Coolify otomatik olarak `schema.sql`'i çalıştırır.

Bu yöntemle **4 saatlik hata ayıklama süresi**, **5 dakikalık kurulum** süresine iner.
