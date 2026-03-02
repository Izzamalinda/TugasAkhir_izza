import {
  Home,
  LogIn,
  Menu,
  Package,
  FileText,
  CheckSquare,
  Upload,
  BookOpen,
  Shield,
  Star,
  Settings,
  Calendar,
  BarChart3,
  LogOut,
  ChevronRight,
  X,
  UserPlus,
  Bell,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Users,
  FileCheck
} from "lucide-react";
import { useState } from "react";
import { useLocation, Outlet, Link } from "react-router";
import { Button } from "./ui/button";
import Chatbot from "./Chatbot";
import logo from "../../assets/logo.png";

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Simulasi user role dari localStorage atau state management
  const userRole = localStorage.getItem("userRole") || null;
  const userName = localStorage.getItem("userName") || "Guest";
  const isLoggedIn = !!userRole;

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  // Navigation items berdasarkan role
  const getNavItems = () => {
    if (!isLoggedIn) {
      return [
        { path: "/", label: "Beranda", icon: Home },
        { path: "/login", label: "Login", icon: LogIn },
      ];
    }

    switch (userRole) {
      case "customer":
        return [
          { path: "/customer/dashboard", label: "Dashboard", icon: Home },
          { path: "/customer/paket", label: "Paket Umrah", icon: Package },
          { path: "/customer/pendaftaran", label: "Pendaftaran", icon: FileText },
          { path: "/customer/status", label: "Status", icon: CheckSquare },
          { path: "/customer/upload-dokumen", label: "Upload Dokumen", icon: Upload },
          { path: "/customer/informasi-manasik", label: "Info Manasik", icon: BookOpen },
          { path: "/customer/form-keselamatan", label: "Form Keselamatan", icon: Shield },
          { path: "/customer/review", label: "Review Umrah", icon: Star },
          { path: "/customer/notifikasi", label: "Notifikasi", icon: Bell },
          { path: "/customer/edit-profile", label: "Edit Profil", icon: Settings },
        ];
      case "admin":
        return [
          { path: "/admin/dashboard", label: "Dashboard", icon: Home },
          { path: "/admin/paket", label: "Kelola Paket", icon: Package },
          { path: "/admin/jadwal", label: "Kelola Jadwal", icon: Calendar },
          { path: "/admin/jamaah", label: "Manajemen Jamaah", icon: Users },
          { path: "/admin/verifikasi-dokumen", label: "Verifikasi Dokumen", icon: FileCheck },
        ];
      case "operasional":
        return [
          { path: "/operasional/dashboard", label: "Dashboard", icon: Home },
        ];
      case "pimpinan":
        return [
          { path: "/pimpinan/dashboard", label: "Dashboard", icon: Home },
          { path: "/pimpinan/laporan", label: "Laporan", icon: BarChart3 },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  // Role display names
  const getRoleDisplay = () => {
    switch (userRole) {
      case "customer":
        return "Jamaah";
      case "admin":
        return "Administrator";
      case "operasional":
        return "Operasional";
      case "pimpinan":
        return "Pimpinan";
      default:
        return "Guest";
    }
  };

  return (
    <div className="min-h-screen flex bg-black overflow-hidden">
      {/* Sidebar Desktop (fixed full-height) */}
      {isLoggedIn && (
        <aside
          className={`hidden lg:flex fixed left-0 top-0 bottom-0 flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-black border-r border-[#f4c430]/20 transition-all duration-300 z-50 ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          {/* Logo & Toggle */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#f4c430]/20">
            {sidebarOpen ? (
              <>
                <Link to="/" className="flex items-center gap-2">
                  <img src={logo} alt="Ardaya Travel" className="h-16 w-auto" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#f4c430] hover:bg-[#f4c430]/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="text-[#f4c430] hover:bg-[#f4c430]/10 mx-auto"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <div className="p-4 border-b border-[#f4c430]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{userName}</div>
                  <div className="text-[#f4c430] text-xs">{getRoleDisplay()}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation (no internal scroll so only main scrolls) */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50"
                        : "text-gray-300 hover:text-[#f4c430] hover:bg-[#f4c430]/10"
                    } ${!sidebarOpen && "justify-center"}`}
                  >
                    {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-[#f4c430]/20">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </aside>
      )}

      {/* Mobile Sidebar */}
      {isLoggedIn && (
        <div
          className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity ${
            mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileSidebarOpen(false)}
        >
          <aside
            className={`fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-black via-[#0a0a0a] to-black border-r border-[#f4c430]/20 transition-transform ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo & Close */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[#f4c430]/20">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Ardaya Travel" className="h-14 w-auto" />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileSidebarOpen(false)}
                className="text-[#f4c430] hover:bg-[#f4c430]/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-[#f4c430]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate">{userName}</div>
                  <div className="text-[#f4c430] text-xs">{getRoleDisplay()}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                          : "text-gray-300 hover:text-[#f4c430] hover:bg-[#f4c430]/10"
                      }`}
                    >
                      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-[#f4c430]/20">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span>Logout</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-margin duration-200 ${
        isLoggedIn ? (sidebarOpen ? 'lg:ml-64' : 'lg:ml-20') : ''
      }`}>
        {/* Top Bar (for mobile & non-logged users) */}
        {(!isLoggedIn || true) && (
          <header className="h-16 bg-black border-b border-[#f4c430]/20 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            {/* Mobile Menu Button */}
            {isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden text-[#f4c430] hover:bg-[#f4c430]/10"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            {/* Logo (for non-logged users) */}
            {!isLoggedIn && (
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Ardaya Travel" className="h-14 w-auto" />
              </Link>
            )}

            {/* Spacer */}
            {isLoggedIn && <div className="flex-1 lg:hidden" />}

            {/* Right Actions */}
            {!isLoggedIn && (
              <div className="flex items-center gap-2">
                <Link to="/">
                  <Button
                    variant={location.pathname === "/" ? "default" : "ghost"}
                    className={
                      location.pathname === "/"
                        ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                        : "text-white hover:text-[#f4c430]"
                    }
                  >
                    {location.pathname === "/" && <Home className="w-4 h-4 mr-2" />}
                    Beranda
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant={location.pathname === "/login" ? "default" : "ghost"}
                    className={
                      location.pathname === "/login"
                        ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                        : "text-white hover:text-[#f4c430]"
                    }
                  >
                    {location.pathname === "/login" && <LogIn className="w-4 h-4 mr-2" />}
                    Login
                  </Button>
                </Link>
              </div>
            )}

            {/* Current Page Title (for logged users on mobile) */}
            {isLoggedIn && (
              <div className="lg:hidden text-white font-semibold truncate">
                {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </div>
            )}
          </header>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
}