"use server";

import pool from "@/libs/db";
import { revalidatePath } from "next/cache";

// Ambil semua data barang
export async function getAllProducts() {
    try {
        const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
        return rows;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return [];
    }
}

// Tambah barang baru
export async function createProduct(formData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const stock = formData.get("stock");

    try {
        await pool.query(
            "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
            [name, price, stock]
        );
        
        // PENTING: Refresh data tanpa reload halaman
        revalidatePath("/product");
    } catch (error) {
        console.error("Gagal menambah data:", error);
        throw new Error("Gagal menyimpan ke database");
    }
}

// 1. Fungsi untuk ambil SATU data barang berdasarkan ID
export async function getProductById(id) {
    try {
        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        return rows[0]; // Ambil baris pertama saja
    } catch (error) {
        console.error("Gagal ambil detail barang:", error);
        return null;
    }
}

// 2. Fungsi untuk UPDATE data barang
export async function updateProduct(id, formData) {
    const name = formData.get("name");
    const price = formData.get("price");
    const stock = formData.get("stock");

    try {
        await pool.query(
            "UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
            [name, price, stock, id]
        );
        revalidatePath("/product");
    } catch (error) {
        console.error("Gagal update data:", error);
        throw new Error("Gagal mengupdate database");
    }
}

// libs/product/action.js
export async function deleteProduct(id) {
    try {
        await pool.query("DELETE FROM products WHERE id = ?", [id]);
        revalidatePath("/product"); // Supaya tabel langsung segar (refresh otomatis)
    } catch (error) {
        console.error("Gagal hapus data:", error);
        throw new Error("Gagal menghapus data dari database");
    }
}