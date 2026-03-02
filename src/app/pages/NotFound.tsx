import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
        <Link
          to="/"
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
