import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  Camera,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  UserCircle,
  Shield,
  Sparkles
} from "lucide-react";

export default function EditProfile() {
  const userName = localStorage.getItem("userName") || "";
  const userEmail = localStorage.getItem("userEmail") || "";

  // Load user data from localStorage
  const [profileData, setProfileData] = useState({
    username: userName,
    email: userEmail,
    fullName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfileData({
        username: parsed.username || userName,
        email: parsed.email || userEmail,
        fullName: parsed.fullName || "",
        phone: parsed.phone || "",
        address: parsed.address || "",
        city: parsed.city || "",
        province: parsed.province || "",
        postalCode: parsed.postalCode || "",
      });
    }

    // Load profile image
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem("userProfileImage", result);
        setSuccess("Foto profil berhasil diupdate!");
        setTimeout(() => setSuccess(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.username.trim()) {
      newErrors.username = "Username harus diisi";
    } else if (profileData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }

    if (!profileData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (profileData.phone && !/^[0-9+\-\s()]+$/.test(profileData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    if (profileData.postalCode && !/^\d{5}$/.test(profileData.postalCode)) {
      newErrors.postalCode = "Kode pos harus 5 digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Password saat ini harus diisi";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Password baru harus diisi";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password minimal 6 karakter";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama";
    }

    // Check current password (from registered users)
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const currentUser = users.find((u: any) => u.username === profileData.username);
    if (currentUser && currentUser.password !== passwordData.currentPassword) {
      newErrors.currentPassword = "Password saat ini salah";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validateProfile()) {
      return;
    }

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    localStorage.setItem("userName", profileData.username);
    localStorage.setItem("userEmail", profileData.email);

    // Update in registeredUsers if exists
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedUsers = users.map((u: any) => {
      if (u.username === userName || u.email === userEmail) {
        return { ...u, ...profileData };
      }
      return u;
    });
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    setSuccess("Profil berhasil diperbarui!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!validatePassword()) {
      return;
    }

    // Update password in registeredUsers
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedUsers = users.map((u: any) => {
      if (u.username === profileData.username) {
        return { ...u, password: passwordData.newPassword };
      }
      return u;
    });
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setSuccess("Password berhasil diubah!");
    setTimeout(() => setSuccess(""), 3000);
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

  const pwdStrength = passwordStrength(passwordData.newPassword);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Edit Profil</h1>
          <p className="text-gray-600">Kelola informasi pribadi dan keamanan akun Anda</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">{success}</p>
          </div>
        )}

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f4c430] data-[state=active]:to-[#d4a028] data-[state=active]:text-black">
              <UserCircle className="w-4 h-4 mr-2" />
              Informasi Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f4c430] data-[state=active]:to-[#d4a028] data-[state=active]:text-black">
              <Shield className="w-4 h-4 mr-2" />
              Keamanan
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Picture */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Camera className="w-5 h-5 text-[#f4c430]" />
                  Foto Profil
                </CardTitle>
                <CardDescription>Update foto profil Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#f4c430]"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black text-3xl font-bold border-4 border-[#f4c430]">
                        {profileData.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <label
                      htmlFor="profileImage"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-[#f4c430] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#d4a028] transition-colors shadow-lg"
                    >
                      <Camera className="w-4 h-4 text-black" />
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{profileData.username}</h3>
                    <p className="text-sm text-gray-500 mb-3">{profileData.email}</p>
                    <Badge className="bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Jamaah
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Information */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <User className="w-5 h-5 text-[#f4c430]" />
                  Informasi Pribadi
                </CardTitle>
                <CardDescription>Update informasi pribadi Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Username */}
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-black">
                        Username *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="username"
                          value={profileData.username}
                          onChange={(e) => handleProfileChange("username", e.target.value)}
                          className={`pl-10 ${
                            errors.username ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.username}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black">
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange("email", e.target.value)}
                          className={`pl-10 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-black">
                        Nama Lengkap
                      </Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => handleProfileChange("fullName", e.target.value)}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-black">
                        Nomor Telepon
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange("phone", e.target.value)}
                          placeholder="08123456789"
                          className={`pl-10 ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-black">
                      Alamat Lengkap
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleProfileChange("address", e.target.value)}
                        placeholder="Jl. Nama Jalan No. 123, RT/RW"
                        rows={3}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* City */}
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-black">
                        Kota/Kabupaten
                      </Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleProfileChange("city", e.target.value)}
                        placeholder="Jakarta"
                      />
                    </div>

                    {/* Province */}
                    <div className="space-y-2">
                      <Label htmlFor="province" className="text-black">
                        Provinsi
                      </Label>
                      <Input
                        id="province"
                        value={profileData.province}
                        onChange={(e) => handleProfileChange("province", e.target.value)}
                        placeholder="DKI Jakarta"
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-black">
                        Kode Pos
                      </Label>
                      <Input
                        id="postalCode"
                        value={profileData.postalCode}
                        onChange={(e) => handleProfileChange("postalCode", e.target.value)}
                        placeholder="12345"
                        maxLength={5}
                        className={errors.postalCode ? "border-red-500" : ""}
                      />
                      {errors.postalCode && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90 shadow-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Lock className="w-5 h-5 text-[#f4c430]" />
                  Ubah Password
                </CardTitle>
                <CardDescription>
                  Update password Anda untuk menjaga keamanan akun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-5">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-black">
                      Password Saat Ini *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${
                          errors.currentPassword ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-black">
                      Password Baru *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${
                          errors.newPassword ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {passwordData.newPassword && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Kekuatan password:</span>
                          <span
                            className={`font-medium ${
                              pwdStrength.label === "Lemah"
                                ? "text-red-500"
                                : pwdStrength.label === "Sedang"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            {pwdStrength.label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${pwdStrength.color}`}
                            style={{ width: `${pwdStrength.strength}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {errors.newPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-black">
                      Konfirmasi Password Baru *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 pr-10 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#f4c430]/10 border border-[#f4c430]/30 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#f4c430] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-black mb-1">Tips Password Aman</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Minimal 8 karakter</li>
                          <li>• Kombinasi huruf besar dan kecil</li>
                          <li>• Sertakan angka dan karakter khusus</li>
                          <li>• Jangan gunakan password yang sama di situs lain</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90 shadow-lg"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Ubah Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
