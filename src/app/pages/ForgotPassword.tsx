import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  KeyRound,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userFound, setUserFound] = useState<any>(null);

  const handleCheckEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi email
    if (!email.trim()) {
      setError("Email harus diisi");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    // Check email di localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      setError("Email tidak terdaftar dalam sistem");
      return;
    }

    // Email found
    setUserFound(user);
    setSuccess(`Email ditemukan! Silakan buat password baru untuk akun ${user.username}`);
    setTimeout(() => {
      setStep("reset");
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (!newPassword) {
      setError("Password baru harus diisi");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (!confirmPassword) {
      setError("Konfirmasi password harus diisi");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password tidak sama");
      return;
    }

    // Update password di localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedUsers = users.map((u: any) => {
      if (u.email === email) {
        return { ...u, password: newPassword };
      }
      return u;
    });
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Show success
    setSuccess("Password berhasil diubah! Anda akan diarahkan ke halaman login.");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
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

  const pwdStrength = passwordStrength(newPassword);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xl grid grid-cols-1 gap-8 items-center">
        {/* Left side removed */}

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-[#f4c430]/30 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl shadow-[#f4c430]/20">
            <CardHeader className="text-center space-y-2 pb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#f4c430]/50">
                <KeyRound className="w-10 h-10 text-black" />
              </div>
              <Badge className="mb-2 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
                <Sparkles className="w-3 h-3 mr-1" />
                {step === "email" ? "Step 1 of 2" : "Step 2 of 2"}
              </Badge>
              <CardTitle className="text-4xl text-white">
                {step === "email" ? "Lupa Password" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-base text-gray-400">
                {step === "email" 
                  ? "Masukkan email terdaftar untuk verifikasi"
                  : "Buat password baru untuk akun Anda"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Email Verification */}
              {step === "email" && (
                <form onSubmit={handleCheckEmail} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base text-white">
                      Email Terdaftar *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        className={`pl-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                          error
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-[#f4c430]/30"
                        }`}
                        autoFocus
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </p>
                    )}
                    {success && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {success}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Verifikasi Email
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <div className="bg-[#f4c430]/10 border border-[#f4c430]/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-[#f4c430] text-lg mt-0.5">ℹ️</div>
                      <div>
                        <p className="text-sm text-[#f4c430] font-medium mb-1">Informasi</p>
                        <p className="text-xs text-gray-400">
                          Masukkan email yang Anda gunakan saat mendaftar. Kami akan memeriksa apakah email tersebut terdaftar dalam sistem.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back to Login */}
                  <div className="text-center pt-4 border-t border-[#f4c430]/20">
                    <Link
                      to="/login"
                      className="text-sm text-gray-400 hover:text-[#f4c430] inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Kembali ke Login
                    </Link>
                  </div>
                </form>
              )}

              {/* Step 2: Reset Password */}
              {step === "reset" && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  {/* Email Display */}
                  <div className="bg-[#f4c430]/10 border border-[#f4c430]/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                        {userFound?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="text-sm text-[#f4c430] font-medium">
                          {userFound?.username}
                        </p>
                        <p className="text-xs text-gray-400">{email}</p>
                      </div>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-base text-white">
                      Password Baru *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setError("");
                        }}
                        className={`pl-10 pr-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                          error && error.includes("baru")
                            ? "border-red-500 focus-visible:ring-red-500"
                            : "border-[#f4c430]/30"
                        }`}
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {newPassword && (
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
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-base text-white">
                      Konfirmasi Password Baru *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setError("");
                        }}
                        className={`pl-10 pr-10 h-12 bg-black text-white placeholder:text-gray-500 ${
                          error && error.includes("sama")
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
                    {error && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </p>
                    )}
                    {success && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {success}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                  >
                    <KeyRound className="mr-2 w-5 h-5" />
                    Reset Password
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  {/* Info Box */}
                  <div className="bg-[#f4c430]/10 border border-[#f4c430]/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <div className="text-[#f4c430] text-lg mt-0.5">🔒</div>
                      <div>
                        <p className="text-sm text-[#f4c430] font-medium mb-1">Keamanan Password</p>
                        <p className="text-xs text-gray-400">
                          Gunakan kombinasi huruf besar, huruf kecil, angka, dan karakter khusus untuk password yang lebih kuat.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
