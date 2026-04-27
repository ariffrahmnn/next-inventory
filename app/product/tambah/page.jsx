import { createProduct } from "@/libs/product/action";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function TambahProductPage() {
    
    async function handleSubmit(formData) {
        "use server";
        await createProduct(formData);
        redirect("/product");
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Tambah Barang Baru</h2>
                
                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Barang</label>
                        <input 
                            name="name" 
                            type="text" 
                            required 
                            placeholder="Contoh: Kopi Luwak"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Harga (Rp)</label>
                            <input 
                                name="price" 
                                type="number" 
                                required 
                                placeholder="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Stok</label>
                            <input 
                                name="stock" 
                                type="number" 
                                required 
                                placeholder="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            type="submit" 
                            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            Simpan Data
                        </button>
                        <Link 
                            href="/product" 
                            className="flex-1 bg-gray-100 text-center text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}