import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import CustomerDashboard from "./pages/customer/Dashboard";
import PaketList from "./pages/customer/PaketList";
import Pendaftaran from "./pages/customer/Pendaftaran";
import StatusPendaftaran from "./pages/customer/StatusPendaftaran";
import UploadDokumen from "./pages/customer/UploadDokumen";
import InformasiManasik from "./pages/customer/InformasiManasik";
import FormKeselamatan from "./pages/customer/FormKeselamatan";
import ReviewUmrah from "./pages/customer/ReviewUmrah";
import EditProfile from "./pages/customer/EditProfile";
import Notifikasi from "./pages/customer/Notifikasi";
import AdminDashboard from "./pages/admin/Dashboard";
import ManagePaket from "./pages/admin/ManagePaket";
import KelolaPaket from "./pages/admin/KelolaPaket";
import ManageJadwal from "./pages/admin/ManageJadwal";
import ManajemenJamaah from "./pages/admin/ManajemenJamaah";
import VerifikasiDokumen from "./pages/admin/VerifikasiDokumen";
import OperasionalDashboard from "./pages/operasional/Dashboard";
import PimpinanDashboard from "./pages/pimpinan/Dashboard";
import ReviewJamaah from "./pages/pimpinan/ReviewJamaah";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "customer/dashboard", Component: CustomerDashboard },
      { path: "customer/paket", Component: PaketList },
      { path: "customer/pendaftaran", Component: Pendaftaran },
      { path: "customer/status", Component: StatusPendaftaran },
      { path: "customer/upload-dokumen", Component: UploadDokumen },
      { path: "customer/informasi-manasik", Component: InformasiManasik },
      { path: "customer/form-keselamatan", Component: FormKeselamatan },
      { path: "customer/review", Component: ReviewUmrah },
      { path: "customer/edit-profile", Component: EditProfile },
      { path: "customer/notifikasi", Component: Notifikasi },
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/paket", Component: ManagePaket },
      { path: "admin/kelola-paket", Component: KelolaPaket },
      { path: "admin/jadwal", Component: ManageJadwal },
      { path: "admin/jamaah", Component: ManajemenJamaah },
      { path: "admin/verifikasi-dokumen", Component: VerifikasiDokumen },
      { path: "operasional/dashboard", Component: OperasionalDashboard },
      { path: "pimpinan/dashboard", Component: PimpinanDashboard },
      { path: "pimpinan/review-jamaah", Component: ReviewJamaah },
      { path: "*", Component: NotFound },
    ],
  },
]);