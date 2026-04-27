"use client"; // Wajib karena ada event onClick dan window.confirm

import { deleteProduct } from "@/libs/product/action";

export default function DeleteButton({ id }) {
    const handleHide = async () => {
        const tanya = window.confirm("yakin mau hapus barang ini? Data bakal hilang selamanya lho.");
        
        if (tanya) {
            try {
                await deleteProduct(id);
            } catch (err) {
                alert("Waduh, gagal hapus!");
            }
        }
    };

    return (
        <button 
            onClick={handleHide}
            className="text-red-500 hover:text-red-700 font-semibold transition-colors"
        >
            Hapus
        </button>
    );
}