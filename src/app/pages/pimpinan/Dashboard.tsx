import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Package, 
  Calendar,
  DollarSign,
  ChevronUp,
  ChevronDown,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download
} from "lucide-react";
import { useState } from "react";

interface PaketPerforma {
  id: string;
  nama: string;
  totalRevenue: number;
  jamaahTerdaftar: number;
  kapasitas: number;
  tingkatHunian: number;
  status: "Tersedia" | "Hampir Penuh" | "Penuh";
}

interface PendaftaranStats {
  status: string;
  jumlah: number;
  persentase: number;
  trend: "up" | "down" | "stable";
  color: string;
}

interface DokumenStats {
  jamaahName: string;
  paket: string;
  progress: number;
  status: "Lengkap" | "Dalam Proses" | "Belum Lengkap" | "Perlu Revisi";
  dokumenLengkap: number;
  totalDokumen: number;
}

interface KeberangkatanUmrah {
  id: string;
  tanggal: string;
  paket: string;
  maskapai: string;
  hotelMekkah: string;
  hotelMadinah: string;
  jumlahJamaah: number;
}

export default function PimpinanDashboard() {
  const [periode, setPeriode] = useState("bulan-ini");

  // Mock data - Performa Paket
  const paketPerforma: PaketPerforma[] = [
    {
      id: "P001",
      nama: "Paket VIP 16 Hari",
      totalRevenue: 15000000,
      jamaahTerdaftar: 3,
      kapasitas: 15,
      tingkatHunian: 20,
      status: "Tersedia"
    },
    {
      id: "P002",
      nama: "Paket Premium 14 Hari",
      totalRevenue: 18000000,
      jamaahTerdaftar: 6,
      kapasitas: 20,
      tingkatHunian: 30,
      status: "Tersedia"
    },
    {
      id: "P003",
      nama: "Paket Standar 12 Hari",
      totalRevenue: 9000000,
      jamaahTerdaftar: 4,
      kapasitas: 25,
      tingkatHunian: 16,
      status: "Tersedia"
    },
    {
      id: "P004",
      nama: "Paket Hemat 9 Hari",
      totalRevenue: 3500000,
      jamaahTerdaftar: 2,
      kapasitas: 30,
      tingkatHunian: 6.7,
      status: "Tersedia"
    },
    {
      id: "P005",
      nama: "Paket Express 7 Hari",
      totalRevenue: 2000000,
      jamaahTerdaftar: 1,
      kapasitas: 20,
      tingkatHunian: 5,
      status: "Tersedia"
    }
  ];

  // Mock data - Pendaftaran
  const pendaftaranStats: PendaftaranStats[] = [
    { status: "Terdaftar", jumlah: 16, persentase: 69.6, trend: "up", color: "emerald" },
    { status: "Menunggu Pembayaran", jumlah: 5, persentase: 21.7, trend: "stable", color: "amber" },
    { status: "Proses Verifikasi", jumlah: 2, persentase: 8.7, trend: "down", color: "blue" },
    { status: "Dibatalkan", jumlah: 0, persentase: 0, trend: "stable", color: "red" }
  ];

  // Mock data - Dokumen
  const dokumenStats: DokumenStats[] = [
    {
      jamaahName: "Ahmad Fauzi",
      paket: "Premium 14 Hari",
      progress: 100,
      status: "Lengkap",
      dokumenLengkap: 8,
      totalDokumen: 8
    },
    {
      jamaahName: "Siti Nurhaliza",
      paket: "VIP 16 Hari",
      progress: 100,
      status: "Lengkap",
      dokumenLengkap: 8,
      totalDokumen: 8
    },
    {
      jamaahName: "Budi Santoso",
      paket: "Standar 12 Hari",
      progress: 87.5,
      status: "Dalam Proses",
      dokumenLengkap: 7,
      totalDokumen: 8
    },
    {
      jamaahName: "Rina Wati",
      paket: "Hemat 9 Hari",
      progress: 62.5,
      status: "Dalam Proses",
      dokumenLengkap: 5,
      totalDokumen: 8
    },
    {
      jamaahName: "Dedi Kurniawan",
      paket: "Express 7 Hari",
      progress: 37.5,
      status: "Belum Lengkap",
      dokumenLengkap: 3,
      totalDokumen: 8
    },
    {
      jamaahName: "Fatimah Az-Zahra",
      paket: "Premium 14 Hari",
      progress: 75,
      status: "Perlu Revisi",
      dokumenLengkap: 6,
      totalDokumen: 8
    }
  ];

  const keberangkatanData: KeberangkatanUmrah[] = [
  {
    id: "KB001",
    tanggal: "2026-05-10",
    paket: "VIP 16 Hari",
    maskapai: "Garuda Indonesia",
    hotelMekkah: "Hilton Makkah",
    hotelMadinah: "Anwar Al Madinah",
    jumlahJamaah: 15
  },
  {
    id: "KB002",
    tanggal: "2026-06-02",
    paket: "Premium 14 Hari",
    maskapai: "Saudi Airlines",
    hotelMekkah: "Pullman Zamzam",
    hotelMadinah: "Taiba Front",
    jumlahJamaah: 20
  }
  ];

  // Calculations
  const totalRevenue = paketPerforma.reduce((acc, p) => acc + p.totalRevenue, 0);
  const totalJamaah = paketPerforma.reduce((acc, p) => acc + p.jamaahTerdaftar, 0);
  const totalKapasitas = paketPerforma.reduce((acc, p) => acc + p.kapasitas, 0);
  const conversionRate = ((totalJamaah / totalKapasitas) * 100).toFixed(1);
  const paketAktif = paketPerforma.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      "Lengkap": { color: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30", icon: CheckCircle2 },
      "Dalam Proses": { color: "bg-blue-600/20 text-blue-400 border-blue-600/30", icon: Clock },
      "Belum Lengkap": { color: "bg-amber-600/20 text-amber-400 border-amber-600/30", icon: AlertCircle },
      "Perlu Revisi": { color: "bg-red-600/20 text-red-400 border-red-600/30", icon: XCircle },
      "Tersedia": { color: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30", icon: CheckCircle2 },
      "Hampir Penuh": { color: "bg-amber-600/20 text-amber-400 border-amber-600/30", icon: AlertCircle },
      "Penuh": { color: "bg-red-600/20 text-red-400 border-red-600/30", icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig["Lengkap"];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const downloadLaporan = (k: KeberangkatanUmrah) => {
    const csv = [
      ["ID Keberangkatan", k.id],
      ["Tanggal", k.tanggal],
      ["Paket", k.paket],
      ["Maskapai", k.maskapai],
      ["Hotel Mekkah", k.hotelMekkah],
      ["Hotel Madinah", k.hotelMadinah],
      ["Jumlah Jamaah", k.jumlahJamaah],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-keberangkatan-${k.id}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard Pimpinan
            </h1>
            <p className="text-gray-400">
              Monitoring dan analisis performa bisnis umrah
            </p>
          </div>

          {/* Filter Periode */}
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-48 bg-black/50 border-[#f4c430]/20 text-white">
              <Calendar className="w-4 h-4 mr-2 text-[#f4c430]" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-[#f4c430]/20">
              <SelectItem value="hari-ini">Hari Ini</SelectItem>
              <SelectItem value="minggu-ini">Minggu Ini</SelectItem>
              <SelectItem value="bulan-ini">Bulan Ini</SelectItem>
              <SelectItem value="tahun-ini">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <Card className="bg-gradient-to-br from-[#f4c430]/20 via-black to-gray-900 border-[#f4c430]/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4c430]/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#f4c430]/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#f4c430]" />
                </div>
                <Badge className="bg-emerald-600/20 text-emerald-400 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(totalRevenue)}
                </p>
                <p className="text-xs text-[#f4c430] mt-1">Periode: {periode.replace("-", " ")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Total Jamaah */}
          <Card className="bg-gradient-to-br from-blue-900/20 via-black to-gray-900 border-blue-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-0">
                  <ChevronUp className="w-3 h-3 mr-1" />
                  +8
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Jamaah</p>
                <p className="text-2xl font-bold text-white">{totalJamaah}</p>
                <p className="text-xs text-blue-400 mt-1">Terdaftar aktif</p>
              </div>
            </CardContent>
          </Card>

          {/* Conversion Rate */}
          <Card className="bg-gradient-to-br from-purple-900/20 via-black to-gray-900 border-purple-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <Badge className="bg-purple-600/20 text-purple-400 border-0">
                  Excellent
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">{conversionRate}%</p>
                <p className="text-xs text-purple-400 mt-1">Tingkat hunian</p>
              </div>
            </CardContent>
          </Card>

          {/* Paket Aktif */}
          <Card className="bg-gradient-to-br from-emerald-900/20 via-black to-gray-900 border-emerald-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-emerald-500" />
                </div>
                <Badge className="bg-emerald-600/20 text-emerald-400 border-0">
                  Active
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Paket Aktif</p>
                <p className="text-2xl font-bold text-white">{paketAktif}</p>
                <p className="text-xs text-emerald-400 mt-1">Paket tersedia</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="performa" className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-[#f4c430]/20 p-1">
            <TabsTrigger 
              value="performa"
              className="data-[state=active]:bg-[#f4c430] data-[state=active]:text-black"
            >
              📊 Performa Paket
            </TabsTrigger>
            <TabsTrigger 
              value="pendaftaran"
              className="data-[state=active]:bg-[#f4c430] data-[state=active]:text-black"
            >
              👥 Laporan Pendaftaran
            </TabsTrigger>
            <TabsTrigger 
              value="dokumen"
              className="data-[state=active]:bg-[#f4c430] data-[state=active]:text-black"
            >
              📄 Kelengkapan Dokumen
            </TabsTrigger>
            <TabsTrigger 
              value="keberangkatan"
              className="data-[state=active]:bg-[#f4c430] data-[state=active]:text-black"
            >
              ✈️ Laporan Keberangkatan
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Performa Paket */}
          <TabsContent value="performa">
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
              <CardHeader>
                <CardTitle className="text-white">Performa Paket Umrah</CardTitle>
                <CardDescription className="text-gray-400">
                  Analisis revenue dan tingkat hunian setiap paket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#f4c430]/20">
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Paket</th>
                        <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Revenue</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Jamaah</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Kapasitas</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Tingkat Hunian</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paketPerforma.map((paket) => (
                        <tr 
                          key={paket.id}
                          className="border-b border-gray-800 hover:bg-[#f4c430]/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-semibold text-white">{paket.nama}</div>
                            <div className="text-xs text-gray-500">{paket.id}</div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="font-semibold text-[#f4c430]">
                              {formatCurrency(paket.totalRevenue)}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="font-semibold text-white">{paket.jamaahTerdaftar}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="font-semibold text-gray-400">{paket.kapasitas}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white font-semibold">{paket.tingkatHunian.toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    paket.tingkatHunian >= 80 ? "bg-red-600" :
                                    paket.tingkatHunian >= 50 ? "bg-amber-600" :
                                    "bg-emerald-600"
                                  }`}
                                  style={{ width: `${Math.min(paket.tingkatHunian, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {getStatusBadge(paket.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-[#f4c430]/30 bg-[#f4c430]/5">
                        <td className="py-4 px-4 font-bold text-white">TOTAL</td>
                        <td className="py-4 px-4 text-right font-bold text-[#f4c430]">
                          {formatCurrency(totalRevenue)}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-white">{totalJamaah}</td>
                        <td className="py-4 px-4 text-center font-bold text-gray-400">{totalKapasitas}</td>
                        <td className="py-4 px-4 text-center font-bold text-white">{conversionRate}%</td>
                        <td className="py-4 px-4"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Laporan Pendaftaran */}
          <TabsContent value="pendaftaran">
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
              <CardHeader>
                <CardTitle className="text-white">Laporan Pendaftaran</CardTitle>
                <CardDescription className="text-gray-400">
                  Status dan distribusi pendaftaran jamaah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#f4c430]/20">
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Jumlah</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Persentase</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendaftaranStats.map((stat, index) => (
                        <tr 
                          key={index}
                          className="border-b border-gray-800 hover:bg-[#f4c430]/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-semibold text-white">{stat.status}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className={`font-bold text-lg text-${stat.color}-400`}>
                              {stat.jumlah}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white font-semibold">{stat.persentase.toFixed(1)}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all bg-${stat.color}-600`}
                                  style={{ width: `${stat.persentase}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge className={`bg-${stat.color}-600/20 text-${stat.color}-400 border-0`}>
                              {stat.trend === "up" && <ChevronUp className="w-3 h-3 mr-1" />}
                              {stat.trend === "down" && <ChevronDown className="w-3 h-3 mr-1" />}
                              {stat.trend === "stable" && <span className="w-3 h-3 mr-1">→</span>}
                              {stat.trend === "up" ? "Naik" : stat.trend === "down" ? "Turun" : "Stabil"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Kelengkapan Dokumen */}
          <TabsContent value="dokumen">
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
              <CardHeader>
                <CardTitle className="text-white">Kelengkapan Dokumen</CardTitle>
                <CardDescription className="text-gray-400">
                  Monitoring progress dokumen setiap jamaah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#f4c430]/20">
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Nama Jamaah</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Paket</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Dokumen</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Progress</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dokumenStats.map((doc, index) => (
                        <tr 
                          key={index}
                          className="border-b border-gray-800 hover:bg-[#f4c430]/5 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="font-semibold text-white">{doc.jamaahName}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-400">{doc.paket}</div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="text-white font-semibold">
                              {doc.dokumenLengkap}/{doc.totalDokumen}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-white font-semibold">{doc.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    doc.progress === 100 ? "bg-emerald-600" :
                                    doc.progress >= 75 ? "bg-blue-600" :
                                    doc.progress >= 50 ? "bg-amber-600" :
                                    "bg-red-600"
                                  }`}
                                  style={{ width: `${doc.progress}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {getStatusBadge(doc.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="keberangkatan">
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
              <CardHeader>
                <CardTitle className="text-white">Laporan Per Keberangkatan</CardTitle>
                <CardDescription className="text-gray-400">
                  Download laporan lengkap setiap keberangkatan umrah
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#f4c430]/20">
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">ID</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Tanggal</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Paket</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Maskapai</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Jamaah</th>
                        <th className="text-center py-4 px-4 text-sm font-semibold text-gray-400">Aksi</th>
                      </tr>
                    </thead>

                    <tbody>
                      {keberangkatanData.map((k) => (
                        <tr
                          key={k.id}
                          className="border-b border-gray-800 hover:bg-[#f4c430]/5 transition-colors"
                        >
                          <td className="py-4 px-4 font-semibold text-white">{k.id}</td>

                          <td className="py-4 px-4 text-gray-400">{k.tanggal}</td>

                          <td className="py-4 px-4 text-gray-400">{k.paket}</td>

                          <td className="py-4 px-4 text-gray-400">{k.maskapai}</td>

                          <td className="py-4 px-4 text-center font-semibold text-white">
                            {k.jumlahJamaah}
                          </td>

                          <td className="py-4 px-4 text-center">
                            <Button
                              onClick={() => downloadLaporan(k)}
                              className="bg-[#f4c430] text-black hover:bg-[#e0b020]"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
