"use server";
import pool from "@/libs/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData) {
  try {
    await signIn("credentials", {
      username: formData.get("username"), // Mengambil username dari form
      password: formData.get("password"), // Mengambil password dari form
      redirectTo: "/product", // Arahkan ke /product setelah login sukses
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Username atau Password salah.";
        default:
          return "Terjadi kesalahan sistem.";
      }
    }
    throw error;
  }
}

export async function handleLogout() {
    await signOut({ redirectTo: "/login" }); // Arahkan ke /login setelah logout
}

export async function registerUser(formData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");

  // 1. Validasi sederhana
  if (!name || !username || !password) {
    return "Semua field harus diisi.";
  }

  try {
    // 2. Cek apakah username sudah ada
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username],
    );

    if (existingUser.length > 0) {
      return "Username sudah digunakan.";
    }

    // 3. Hashing Password (Keamanan)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Simpan ke Database
    await pool.query(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, hashedPassword],
    );
  } catch (error) {
    console.error("Register Error:", error);
    return "Gagal melakukan registrasi.";
  }

  // 5. Redirect ke halaman login setelah sukses
  redirect("/login?message=Registrasi Berhasil, silakan login.");
}