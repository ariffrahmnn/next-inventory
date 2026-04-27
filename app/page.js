import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">
                Selamat Datang di Maju Jaya 📦
            </h1>
            <p className="text-gray-600 mb-8">Sistem Manajemen Inventaris Modern</p>
            <Link 
                href="/product" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
                Masuk ke Dashboard
            </Link>
        </div>
    );
}