// app/layout.js
import "./globals.css";

export const metadata = {
  title: 'Inventaris Rif',
  description: 'Aplikasi Inventaris Maju Jaya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Children ini adalah tempat halaman login/dashboard akan dirender */}
        {children}
      </body>
    </html>
  )
}