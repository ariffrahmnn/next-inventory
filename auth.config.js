export const authConfig = {
  pages: {
    signIn: "/login", // Arahkan ke halaman login custom kita
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/product");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect ke login jika belum login
      }
      return true;
    },
  },
  providers: [], // Kosongkan dulu, akan diisi di auth.js
};