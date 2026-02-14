"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLocationButton({ id }: { id: number }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Bu şubeyi silmek istediğinizden emin misiniz?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/locations/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Silme işlemi başarısız oldu");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
