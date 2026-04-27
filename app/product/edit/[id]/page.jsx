import { getProductById, updateProduct } from "@/libs/product/action";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditProductPage({ params }) {
    // 1. Ambil ID dari URL (params harus di-await di Next.js versi terbaru)
    const { id } = await params;
    
    // 2. Ambil data lama dari database buat isi form
    const product = await getProductById(id);

    // 3. Kalau ID tidak ada di DB, kasih peringatan
    if (!product) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold text-red-500">Barang tidak ditemukan!</h1>
                <p className="text-gray-600 mb-6">Data dengan ID {id} tidak ada di database.</p>
                <Link href="/product" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Kembali ke Daftar
                </Link>
            </div>
        );
    }

    // 4. Fungsi untuk kirim update ke database
    async function handleUpdate(formData) {
        "use server";
        await updateProduct(id, formData);
        redirect("/product"); // Balik ke tabel setelah sukses
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">Edit Data Barang</h2>
            
            <form action={handleUpdate} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Barang</label>
                    <input 
                        name="name" 
                        type="text" 
                        defaultValue={product.name}
                        required 
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Harga</label>
                        <input 
                            name="price" 
                            type="number" 
                            defaultValue={product.price}
                            required 
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Stok</label>
                        <input 
                            name="stock" 
                            type="number" 
                            defaultValue={product.stock}
                            required 
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button 
                        type="submit" 
                        className="flex-1 bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-all shadow-md"
                    >
                        Simpan Perubahan
                    </button>
                    <Link 
                        href="/product" 
                        className="flex-1 bg-gray-100 text-gray-600 text-center py-3 rounded-xl hover:bg-gray-200 transition-all"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}