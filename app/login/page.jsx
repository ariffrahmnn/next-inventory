"use client"; // Tambahkan ini di paling atas

import { useState } from "react"; // Import useState untuk mengelola pesan error
import { authenticate } from "@/libs/auth/action";
import { useFormStatus } from "react-dom"; // Import hook untuk status form
import Link from "next/link";

export default function LoginPage() {
  // Sisipkan perintah berikut
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData) => {
    const error = await authenticate(formData);
    if (error) setErrorMessage(error);
  };
  // -------------------------

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login Maju Jaya
        </h1>


        <form className="flex flex-col gap-4" action={handleSubmit}>
          <div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
          </div>
          <div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm italic">{errorMessage}</p>
          )}


          <LoginButton />
          <Link 
          href="/register" 
          className="text-center text-sm text-gray-600 hover:text-gray-800 mt-4"
        >
          Belum punya akun? Daftar di sini
        </Link>
        </form>
      </div>
    </main>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 mt-4 block disabled:bg-gray-400"
    >
      {pending ? "Memproses..." : "Masuk ke Dashboard"}
    </button>
  );
}