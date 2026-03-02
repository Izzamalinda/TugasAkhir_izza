import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { LogIn, Lock, Mail, ArrowRight, Crown, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulasi login - dalam aplikasi nyata, ini akan memanggil API
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", email.split("@")[0]);

    // Redirect berdasarkan role
    switch (role) {
      case "customer":
        navigate("/customer/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "operasional":
        navigate("/operasional/dashboard");
        break;
      case "pimpinan":
        navigate("/pimpinan/dashboard");
        break;
    }
  };

  const roleDescriptions: Record<string, string> = {
    customer: "Akses untuk jamaah yang ingin mendaftar umrah",
    admin: "Kelola paket, jadwal, dan laporan keuangan",
    operasional: "Checklist pendistribusian, keselamatan & keamanan jamaah",
    pimpinan: "Lihat laporan evaluasi dan statistik lengkap",
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 gap-8 items-center">

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-[#f4c430]/30 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl shadow-[#f4c430]/20">
            <CardHeader className="text-center space-y-2 pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#f4c430]/50">
                <LogIn className="w-10 h-10 text-black" />
              </div>
              <CardTitle className="text-4xl text-white">Login</CardTitle>
              <CardDescription className="text-base text-gray-400">
                Masuk ke sistem Ardaya Travel Umrah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-base text-white">Pilih Role</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-12 bg-black border-[#f4c430]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">👤 Customer</SelectItem>
                      <SelectItem value="admin">⚙️ Admin</SelectItem>
                      <SelectItem value="operasional">📋 Operasional</SelectItem>
                      <SelectItem value="pimpinan">👔 Pimpinan</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-2">
                    {roleDescriptions[role]}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-black border-[#f4c430]/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-12 bg-black border-[#f4c430]/30 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-xs text-[#f4c430] hover:underline"
                    >
                      Lupa password?
                    </a>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                >
                  <Crown className="mr-2 w-5 h-5" />
                  Login
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-[#f4c430]/20">
                  <p className="text-sm text-gray-400">
                    Belum punya akun?{" "}
                    <a
                      href="/register"
                      className="text-[#f4c430] hover:underline font-semibold"
                    >
                      Daftar di sini
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}