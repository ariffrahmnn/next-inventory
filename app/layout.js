export const metadata = {
  title: "Inventaris Rif",
  description: "Aplikasi Inventaris Maju Jaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Children di sini akan diisi oleh DashboardLayout atau halaman lainnya */}
        {children}
      </body>
    </html>
  );
}