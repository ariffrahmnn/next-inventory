import { getAllProducts } from "@/libs/product/action";
import Link from "next/link";
import DeleteButton from "./DeleteButton"; // Pastikan file ini sudah kamu buat

export default async function ProductPage() {
    const products = await getAllProducts();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">📦 Inventaris Maju Jaya</h1>
                    <Link 
                        href="/product/tambah" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all"
                    >
                        + Tambah Barang
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-600 uppercase">Nama Produk</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-right">Harga</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">Stok</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">{item.name}</td>
                                    <td className="p-4 text-right text-gray-700">
                                        Rp {(item.price || 0).toLocaleString('id-ID')}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {item.stock} Unit
                                        </span>
                                    </td>
                                    <td className="p-4 text-center flex justify-center gap-4">
                                        <Link 
                                            href={`/product/edit/${item.id}`} 
                                            className="text-amber-500 hover:text-amber-700 font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        
                                        {/* Komponen Hapus Langsung di Sini */}
                                        <DeleteButton id={item.id} /> 
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-12 text-center text-gray-400 italic">Belum ada data barang tersedia.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}