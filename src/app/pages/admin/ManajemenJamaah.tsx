import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { 
  Search, 
  UserX, 
  UserPlus, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  AlertCircle,
  Check
} from "lucide-react";
import { motion } from "motion/react";

interface JamaahPengganti {
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: string;
  alamat: string;
  noTelepon: string;
  email: string;
  nomorPaspor: string;
  tanggalBerlakuPaspor: string;
  hubunganKeluarga: string;
}

interface Jamaah {
  id: string;
  nama: string;
  nik: string;
  noPaspor: string;
  noTelepon: string;
  email: string;
  paket: string;
  tanggalKeberangkatan: string;
  status: "Aktif" | "Dibatalkan" | "Diganti";
  alasanPembatalan?: string;
  tanggalPembatalan?: string;
  jamaahPengganti?: JamaahPengganti;
}

export default function ManajemenJamaah() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBatalDialog, setShowBatalDialog] = useState(false);
  const [showGantiDialog, setShowGantiDialog] = useState(false);
  const [selectedJamaah, setSelectedJamaah] = useState<Jamaah | null>(null);
  const [alasanPembatalan, setAlasanPembatalan] = useState("");
  const [jamaahPengganti, setJamaahPengganti] = useState<JamaahPengganti>({
    nama: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    noTelepon: "",
    email: "",
    nomorPaspor: "",
    tanggalBerlakuPaspor: "",
    hubunganKeluarga: "",
  });

  // Mock data jamaah
  const [jamaahList, setJamaahList] = useState<Jamaah[]>([
    {
      id: "J001",
      nama: "Ahmad Fauzi",
      nik: "3201012345678901",
      noPaspor: "A1234567",
      noTelepon: "081234567890",
      email: "ahmad.fauzi@email.com",
      paket: "Paket Premium 14 Hari",
      tanggalKeberangkatan: "15 Maret 2026",
      status: "Aktif",
    },
    {
      id: "J002",
      nama: "Siti Nurhaliza",
      nik: "3201012345678902",
      noPaspor: "A2345678",
      noTelepon: "081234567891",
      email: "siti.nurhaliza@email.com",
      paket: "Paket Standar 12 Hari",
      tanggalKeberangkatan: "15 Maret 2026",
      status: "Aktif",
    },
    {
      id: "J003",
      nama: "Budi Santoso",
      nik: "3201012345678903",
      noPaspor: "A3456789",
      noTelepon: "081234567892",
      email: "budi.santoso@email.com",
      paket: "Paket Ekonomis 9 Hari",
      tanggalKeberangkatan: "22 Maret 2026",
      status: "Aktif",
    },
    {
      id: "J004",
      nama: "Fatimah Az-Zahra",
      nik: "3201012345678904",
      noPaspor: "A4567890",
      noTelepon: "081234567893",
      email: "fatimah@email.com",
      paket: "Paket Premium 14 Hari",
      tanggalKeberangkatan: "22 Maret 2026",
      status: "Dibatalkan",
      alasanPembatalan: "Kondisi kesehatan tidak memungkinkan",
      tanggalPembatalan: "10 Februari 2026",
    },
    {
      id: "J005",
      nama: "Muhammad Rizki",
      nik: "3201012345678905",
      noPaspor: "A5678901",
      noTelepon: "081234567894",
      email: "rizki@email.com",
      paket: "Paket Standar 12 Hari",
      tanggalKeberangkatan: "29 Maret 2026",
      status: "Diganti",
      alasanPembatalan: "Keperluan mendesak keluarga",
      tanggalPembatalan: "12 Februari 2026",
      jamaahPengganti: {
        nama: "Abdullah Rizki",
        nik: "3201012345678999",
        tempatLahir: "Jakarta",
        tanggalLahir: "1990-05-15",
        jenisKelamin: "Laki-laki",
        alamat: "Jl. Merdeka No. 45, Jakarta",
        noTelepon: "081234567899",
        email: "abdullah.rizki@email.com",
        nomorPaspor: "A9999999",
        tanggalBerlakuPaspor: "2028-12-31",
        hubunganKeluarga: "Adik Kandung",
      },
    },
  ]);

  const filteredJamaah = jamaahList.filter(
    (jamaah) =>
      jamaah.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jamaah.nik.includes(searchQuery) ||
      jamaah.noPaspor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jamaah.paket.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBatalkanJamaah = () => {
    if (!selectedJamaah || !alasanPembatalan.trim()) return;

    setJamaahList(
      jamaahList.map((j) =>
        j.id === selectedJamaah.id
          ? {
              ...j,
              status: "Dibatalkan",
              alasanPembatalan,
              tanggalPembatalan: new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            }
          : j
      )
    );

    setShowBatalDialog(false);
    setAlasanPembatalan("");
    setSelectedJamaah(null);
  };

  const handleGantiJamaah = () => {
    if (!selectedJamaah) return;

    // Validasi form
    if (
      !jamaahPengganti.nama ||
      !jamaahPengganti.nik ||
      !jamaahPengganti.nomorPaspor ||
      !jamaahPengganti.noTelepon
    ) {
      alert("Mohon lengkapi data jamaah pengganti yang wajib diisi");
      return;
    }

    setJamaahList(
      jamaahList.map((j) =>
        j.id === selectedJamaah.id
          ? {
              ...j,
              status: "Diganti",
              alasanPembatalan,
              tanggalPembatalan: new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              jamaahPengganti: jamaahPengganti,
            }
          : j
      )
    );

    setShowGantiDialog(false);
    setAlasanPembatalan("");
    setJamaahPengganti({
      nama: "",
      nik: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      noTelepon: "",
      email: "",
      nomorPaspor: "",
      tanggalBerlakuPaspor: "",
      hubunganKeluarga: "",
    });
    setSelectedJamaah(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return <Badge className="bg-green-600 hover:bg-green-700">Aktif</Badge>;
      case "Dibatalkan":
        return <Badge className="bg-red-600 hover:bg-red-700">Dibatalkan</Badge>;
      case "Diganti":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Diganti</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manajemen Jamaah</h1>
        <p className="text-gray-400">Kelola data jamaah, pembatalan, dan penggantian</p>
      </div>

      {/* Search Bar */}
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari jamaah (nama, NIK, paspor, paket)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/50 border-[#f4c430]/20 text-white placeholder:text-gray-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-900/20 via-black to-gray-900 border-green-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Jamaah Aktif</p>
                <p className="text-3xl font-bold text-white">
                  {jamaahList.filter((j) => j.status === "Aktif").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/20 via-black to-gray-900 border-red-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Dibatalkan</p>
                <p className="text-3xl font-bold text-white">
                  {jamaahList.filter((j) => j.status === "Dibatalkan").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 via-black to-gray-900 border-blue-600/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Diganti</p>
                <p className="text-3xl font-bold text-white">
                  {jamaahList.filter((j) => j.status === "Diganti").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jamaah List */}
      <div className="grid gap-4">
        {filteredJamaah.map((jamaah, index) => (
          <motion.div
            key={jamaah.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 hover:border-[#f4c430]/40 transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Info Jamaah */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{jamaah.nama}</h3>
                          {getStatusBadge(jamaah.status)}
                        </div>
                        <p className="text-gray-400 text-sm">ID: {jamaah.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <CreditCard className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">NIK: {jamaah.nik}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <CreditCard className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">Paspor: {jamaah.noPaspor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">{jamaah.noTelepon}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">{jamaah.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">{jamaah.paket}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4 text-[#f4c430]" />
                        <span className="text-sm">{jamaah.tanggalKeberangkatan}</span>
                      </div>
                    </div>

                    {/* Info Pembatalan */}
                    {(jamaah.status === "Dibatalkan" || jamaah.status === "Diganti") && (
                      <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-red-400 font-semibold mb-1">
                              {jamaah.status === "Dibatalkan" ? "Dibatalkan" : "Diganti"}
                            </p>
                            <p className="text-gray-400 text-sm mb-1">
                              <strong>Alasan:</strong> {jamaah.alasanPembatalan}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Tanggal: {jamaah.tanggalPembatalan}
                            </p>
                          </div>
                        </div>

                        {/* Info Jamaah Pengganti */}
                        {jamaah.status === "Diganti" && jamaah.jamaahPengganti && (
                          <div className="mt-4 pt-4 border-t border-gray-700">
                            <p className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                              <UserPlus className="w-4 h-4" />
                              Data Jamaah Pengganti
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Nama:</span>
                                <span className="text-gray-300 ml-2">
                                  {jamaah.jamaahPengganti.nama}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">NIK:</span>
                                <span className="text-gray-300 ml-2">
                                  {jamaah.jamaahPengganti.nik}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">No. Paspor:</span>
                                <span className="text-gray-300 ml-2">
                                  {jamaah.jamaahPengganti.nomorPaspor}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">No. Telepon:</span>
                                <span className="text-gray-300 ml-2">
                                  {jamaah.jamaahPengganti.noTelepon}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">Hubungan:</span>
                                <span className="text-gray-300 ml-2">
                                  {jamaah.jamaahPengganti.hubunganKeluarga}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {jamaah.status === "Aktif" && (
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => {
                          setSelectedJamaah(jamaah);
                          setShowBatalDialog(true);
                        }}
                        variant="outline"
                        className="border-red-600/50 text-red-500 hover:bg-red-600/10 hover:text-red-400"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Batalkan
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedJamaah(jamaah);
                          setShowGantiDialog(true);
                        }}
                        variant="outline"
                        className="border-[#f4c430]/50 text-[#f4c430] hover:bg-[#f4c430]/10"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Ganti Jamaah
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Dialog Batalkan Jamaah */}
      <Dialog open={showBatalDialog} onOpenChange={setShowBatalDialog}>
        <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <UserX className="w-5 h-5 text-red-500" />
              Batalkan Jamaah
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Jamaah yang dibatalkan tidak dapat dikembalikan ke status aktif.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">{selectedJamaah?.nama}</p>
              <p className="text-gray-400 text-sm">Paket: {selectedJamaah?.paket}</p>
              <p className="text-gray-400 text-sm">
                Keberangkatan: {selectedJamaah?.tanggalKeberangkatan}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alasan">Alasan Pembatalan *</Label>
              <Textarea
                id="alasan"
                value={alasanPembatalan}
                onChange={(e) => setAlasanPembatalan(e.target.value)}
                placeholder="Masukkan alasan pembatalan jamaah..."
                className="bg-black/50 border-[#f4c430]/20 text-white min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBatalDialog(false);
                setAlasanPembatalan("");
                setSelectedJamaah(null);
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Batal
            </Button>
            <Button
              onClick={handleBatalkanJamaah}
              disabled={!alasanPembatalan.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <UserX className="w-4 h-4 mr-2" />
              Batalkan Jamaah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Ganti Jamaah */}
      <Dialog open={showGantiDialog} onOpenChange={setShowGantiDialog}>
        <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <UserPlus className="w-5 h-5 text-[#f4c430]" />
              Ganti Jamaah
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Masukkan data jamaah pengganti untuk menggantikan jamaah yang dibatalkan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Jamaah Lama */}
            <div className="bg-red-900/10 border border-red-600/20 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <UserX className="w-4 h-4" />
                Jamaah Dibatalkan
              </p>
              <p className="text-white font-semibold">{selectedJamaah?.nama}</p>
              <p className="text-gray-400 text-sm">Paket: {selectedJamaah?.paket}</p>
              <p className="text-gray-400 text-sm">
                Keberangkatan: {selectedJamaah?.tanggalKeberangkatan}
              </p>
            </div>

            {/* Alasan Pembatalan */}
            <div className="space-y-2">
              <Label htmlFor="alasan-ganti">Alasan Penggantian *</Label>
              <Textarea
                id="alasan-ganti"
                value={alasanPembatalan}
                onChange={(e) => setAlasanPembatalan(e.target.value)}
                placeholder="Masukkan alasan penggantian jamaah..."
                className="bg-black/50 border-[#f4c430]/20 text-white"
              />
            </div>

            {/* Form Jamaah Pengganti */}
            <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4 space-y-4">
              <p className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Data Jamaah Pengganti
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap *</Label>
                  <Input
                    id="nama"
                    value={jamaahPengganti.nama}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, nama: e.target.value })
                    }
                    placeholder="Nama lengkap sesuai KTP"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nik">NIK *</Label>
                  <Input
                    id="nik"
                    value={jamaahPengganti.nik}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, nik: e.target.value })
                    }
                    placeholder="Nomor Induk Kependudukan"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempat-lahir">Tempat Lahir</Label>
                  <Input
                    id="tempat-lahir"
                    value={jamaahPengganti.tempatLahir}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, tempatLahir: e.target.value })
                    }
                    placeholder="Tempat lahir"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal-lahir">Tanggal Lahir</Label>
                  <Input
                    id="tanggal-lahir"
                    type="date"
                    value={jamaahPengganti.tanggalLahir}
                    onChange={(e) =>
                      setJamaahPengganti({
                        ...jamaahPengganti,
                        tanggalLahir: e.target.value,
                      })
                    }
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenis-kelamin">Jenis Kelamin</Label>
                  <Select
                    value={jamaahPengganti.jenisKelamin}
                    onValueChange={(value) =>
                      setJamaahPengganti({ ...jamaahPengganti, jenisKelamin: value })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                      <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="Perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="no-telepon">No. Telepon *</Label>
                  <Input
                    id="no-telepon"
                    value={jamaahPengganti.noTelepon}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, noTelepon: e.target.value })
                    }
                    placeholder="08xxxxxxxxxx"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={jamaahPengganti.email}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, email: e.target.value })
                    }
                    placeholder="email@example.com"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Textarea
                    id="alamat"
                    value={jamaahPengganti.alamat}
                    onChange={(e) =>
                      setJamaahPengganti({ ...jamaahPengganti, alamat: e.target.value })
                    }
                    placeholder="Alamat lengkap"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="no-paspor">Nomor Paspor *</Label>
                  <Input
                    id="no-paspor"
                    value={jamaahPengganti.nomorPaspor}
                    onChange={(e) =>
                      setJamaahPengganti({
                        ...jamaahPengganti,
                        nomorPaspor: e.target.value,
                      })
                    }
                    placeholder="A1234567"
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="berlaku-paspor">Berlaku Hingga</Label>
                  <Input
                    id="berlaku-paspor"
                    type="date"
                    value={jamaahPengganti.tanggalBerlakuPaspor}
                    onChange={(e) =>
                      setJamaahPengganti({
                        ...jamaahPengganti,
                        tanggalBerlakuPaspor: e.target.value,
                      })
                    }
                    className="bg-black/50 border-[#f4c430]/20 text-white"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hubungan">Hubungan Keluarga dengan Jamaah Lama</Label>
                  <Select
                    value={jamaahPengganti.hubunganKeluarga}
                    onValueChange={(value) =>
                      setJamaahPengganti({ ...jamaahPengganti, hubunganKeluarga: value })
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                      <SelectValue placeholder="Pilih hubungan keluarga" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                      <SelectItem value="Pasangan (Suami/Istri)">
                        Pasangan (Suami/Istri)
                      </SelectItem>
                      <SelectItem value="Orang Tua">Orang Tua</SelectItem>
                      <SelectItem value="Anak Kandung">Anak Kandung</SelectItem>
                      <SelectItem value="Saudara Kandung">Saudara Kandung</SelectItem>
                      <SelectItem value="Keponakan">Keponakan</SelectItem>
                      <SelectItem value="Sepupu">Sepupu</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowGantiDialog(false);
                setAlasanPembatalan("");
                setJamaahPengganti({
                  nama: "",
                  nik: "",
                  tempatLahir: "",
                  tanggalLahir: "",
                  jenisKelamin: "",
                  alamat: "",
                  noTelepon: "",
                  email: "",
                  nomorPaspor: "",
                  tanggalBerlakuPaspor: "",
                  hubunganKeluarga: "",
                });
                setSelectedJamaah(null);
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Batal
            </Button>
            <Button
              onClick={handleGantiJamaah}
              className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Simpan Penggantian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
