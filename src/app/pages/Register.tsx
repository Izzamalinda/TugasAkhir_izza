import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  UserPlus,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error saat user mulai mengetik
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username harus diisi";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username hanya boleh huruf, angka, dan underscore";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    // Validate terms
    if (!agreeTerms) {
      newErrors.terms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulasi registrasi - dalam aplikasi nyata, ini akan memanggil API
    // Simpan data user ke localStorage (mock)
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if email already exists
    if (users.some((u: any) => u.email === formData.email)) {
      setErrors({ email: "Email sudah terdaftar" });
      return;
    }

    // Check if username already exists
    if (users.some((u: any) => u.username === formData.username)) {
      setErrors({ username: "Username sudah digunakan" });
      return;
    }

    // Add new user
    users.push({
      username: formData.username,
      email: formData.email,
      password: formData.password, // Dalam produksi, ini harus di-hash
      role: "customer", // Default role
      registeredAt: new Date().toISOString(),
    });
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // Auto login setelah registrasi
    localStorage.setItem("userRole", "customer");
    localStorage.setItem("userName", formData.username);

    // Show success dan redirect
    alert("Registrasi berhasil! Anda akan diarahkan ke dashboard.");
    navigate("/customer/dashboard");
  };

  const passwordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: "Lemah", color: "bg-red-500" };
    if (strength <= 3) return { strength: 66, label: "Sedang", color: "bg-yellow-500" };
    return { strength: 100, label: "Kuat", color: "bg-green-500" };
  };

  const pwdStrength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 gap-8 items-center overflow-hidden">

        {/* Right Side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-[#f4c430]/30 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl shadow-[#f4c430]/20">
            <CardHeader className="text-center space-y-2 pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#f4c430]/50">
                <UserPlus className="w-10 h-10 text-black" />
              </div>
              <Badge className="mb-2 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Gratis Selamanya
              </Badge>
              <CardTitle className="text-4xl text-white">Daftar</CardTitle>
              <CardDescription className="text-base text-gray-400">
                Buat akun baru untuk mulai mendaftar umrah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base text-white">
                    Username *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      className={`pl-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                        errors.username
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#f4c430]/30"
                      }`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base text-white">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`pl-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                        errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#f4c430]/30"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base text-white">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`pl-10 pr-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                        errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#f4c430]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Kekuatan password:</span>
                        <span className={`font-medium ${
                          pwdStrength.label === "Lemah" ? "text-red-400" :
                          pwdStrength.label === "Sedang" ? "text-yellow-400" :
                          "text-green-400"
                        }`}>
                          {pwdStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${pwdStrength.color}`}
                          style={{ width: `${pwdStrength.strength}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-base text-white">
                    Konfirmasi Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                        errors.confirmPassword
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-[#f4c430]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-4 border border-[#f4c430]/30 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => {
                        setAgreeTerms(checked as boolean);
                        if (errors.terms) {
                          setErrors((prev) => ({ ...prev, terms: "" }));
                        }
                      }}
                      className="mt-0.5 border-[#f4c430]/50"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-gray-300 cursor-pointer leading-relaxed"
                    >
                      Saya menyetujui{" "}
                      <a href="#" className="text-[#f4c430] hover:underline">
                        Syarat & Ketentuan
                      </a>{" "}
                      serta{" "}
                      <a href="#" className="text-[#f4c430] hover:underline">
                        Kebijakan Privasi
                      </a>{" "}
                      Ardaya Travel
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                >
                  <UserPlus className="mr-2 w-5 h-5" />
                  Daftar Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-[#f4c430]/20">
                  <p className="text-sm text-gray-400">
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="text-[#f4c430] hover:underline font-semibold"
                    >
                      Login di sini
                    </Link>
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
