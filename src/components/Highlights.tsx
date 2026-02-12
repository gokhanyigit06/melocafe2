import { db } from "@/lib/db";
import Journal from "./Journal";

export default async function Highlights() {
    try {
        // DATABASE_URL hatalıysa veya DB kapalıysa burası hata fırlatır
        const result = await db.query(
            'SELECT * FROM posts WHERE published = true ORDER BY created_at DESC LIMIT 3'
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const posts = (result?.rows || []).map((post: any) => ({
            ...post,
            id: post.id.toString(),
            coverImage: post.cover_image,
        }));

        return <Journal posts={posts} />;
    } catch (error) {
        // Hata durumunda konsola yaz ama sayfanın geri kalanını çökertme
        console.error("Veritabanı bağlantı hatası (Highlights):", error);

        // Boş dizi gönderiyoruz, Journal bileşeni "Coming Soon" gösterecek
        return <Journal posts={[]} />;
    }
}
