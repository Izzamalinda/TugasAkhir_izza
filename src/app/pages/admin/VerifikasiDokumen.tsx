import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  AlertTriangle,
  Filter,
  Users,
  Calendar,
  Download,
} from "lucide-react";
import { motion } from "motion/react";

interface Dokumen {
  jenis: string;
  status: "belum-upload" | "menunggu-verifikasi" | "diverifikasi" | "ditolak";
  file?: string;
  tanggalUpload?: string;
  tanggalVerifikasi?: string;
  keterangan?: string;
}

interface Jamaah {
  id: string;
  namaLengkap: string;
  jenisKelamin: string;
  noKTP: string;
  noPendaftaran: string;
  paket: string;
  tanggalKeberangkatan: string;
  dokumen: {
    ktp: Dokumen;
    kk: Dokumen;
    passport: Dokumen;
    foto: Dokumen;
    vaksin: Dokumen;
  };
}

export default function VerifikasiDokumen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [selectedJamaah, setSelectedJamaah] = useState<Jamaah | null>(null);
  const [selectedDokumen, setSelectedDokumen] = useState<{ jenis: string; data: Dokumen } | null>(
    null
  );
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showVerifikasiDialog, setShowVerifikasiDialog] = useState(false);
  const [verifikasiStatus, setVerifikasiStatus] = useState<"diverifikasi" | "ditolak">(
    "diverifikasi"
  );
  const [keterangan, setKeterangan] = useState("");

  // Mock data
  const [jamaahList, setJamaahList] = useState<Jamaah[]>([
    {
      id: "J001",
      namaLengkap: "Ahmad Fauzi",
      jenisKelamin: "Laki-laki",
      noKTP: "3174012345678901",
      noPendaftaran: "UM2026001",
      paket: "Paket Premium 14 Hari",
      tanggalKeberangkatan: "15 Maret 2026",
      dokumen: {
        ktp: {
          jenis: "KTP",
          status: "diverifikasi",
          file: "ktp_ahmad_fauzi.pdf",
          tanggalUpload: "10 Feb 2026",
          tanggalVerifikasi: "11 Feb 2026",
          keterangan: "Dokumen lengkap dan sesuai",
        },
        kk: {
          jenis: "Kartu Keluarga",
          status: "diverifikasi",
          file: "kk_ahmad_fauzi.pdf",
          tanggalUpload: "10 Feb 2026",
          tanggalVerifikasi: "11 Feb 2026",
        },
        passport: {
          jenis: "Passport",
          status: "diverifikasi",
          file: "passport_ahmad_fauzi.pdf",
          tanggalUpload: "10 Feb 2026",
          tanggalVerifikasi: "11 Feb 2026",
        },
        foto: {
          jenis: "Pas Foto",
          status: "diverifikasi",
          file: "foto_ahmad_fauzi.jpg",
          tanggalUpload: "10 Feb 2026",
          tanggalVerifikasi: "11 Feb 2026",
        },
        vaksin: {
          jenis: "Buku Vaksin",
          status: "diverifikasi",
          file: "vaksin_ahmad_fauzi.pdf",
          tanggalUpload: "10 Feb 2026",
          tanggalVerifikasi: "11 Feb 2026",
        },
      },
    },
    {
      id: "J002",
      namaLengkap: "Siti Nurhaliza",
      jenisKelamin: "Perempuan",
      noKTP: "3174012345678902",
      noPendaftaran: "UM2026001",
      paket: "Paket Premium 14 Hari",
      tanggalKeberangkatan: "15 Maret 2026",
      dokumen: {
        ktp: {
          jenis: "KTP",
          status: "menunggu-verifikasi",
          file: "ktp_siti_nurhaliza.pdf",
          tanggalUpload: "12 Feb 2026",
        },
        kk: {
          jenis: "Kartu Keluarga",
          status: "menunggu-verifikasi",
          file: "kk_siti_nurhaliza.pdf",
          tanggalUpload: "12 Feb 2026",
        },
        passport: {
          jenis: "Passport",
          status: "menunggu-verifikasi",
          file: "passport_siti_nurhaliza.pdf",
          tanggalUpload: "12 Feb 2026",
        },
        foto: {
          jenis: "Pas Foto",
          status: "belum-upload",
        },
        vaksin: {
          jenis: "Buku Vaksin",
          status: "belum-upload",
        },
      },
    },
    {
      id: "J003",
      namaLengkap: "Muhammad Rizki",
      jenisKelamin: "Laki-laki",
      noKTP: "3174012345678903",
      noPendaftaran: "UM2026001",
      paket: "Paket Premium 14 Hari",
      tanggalKeberangkatan: "15 Maret 2026",
      dokumen: {
        ktp: {
          jenis: "KTP",
          status: "ditolak",
          file: "ktp_muhammad_rizki.pdf",
          tanggalUpload: "11 Feb 2026",
          tanggalVerifikasi: "12 Feb 2026",
          keterangan: "Foto tidak jelas, mohon upload ulang dengan resolusi lebih tinggi",
        },
        kk: {
          jenis: "Kartu Keluarga",
          status: "belum-upload",
        },
        passport: {
          jenis: "Passport",
          status: "belum-upload",
        },
        foto: {
          jenis: "Pas Foto",
          status: "belum-upload",
        },
        vaksin: {
          jenis: "Buku Vaksin",
          status: "belum-upload",
        },
      },
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "diverifikasi":
        return (
          <Badge className="bg-[#f4c430] hover:bg-[#f4c430]/90 text-black">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Diverifikasi
          </Badge>
        );
      case "menunggu-verifikasi":
        return (
          <Badge className="bg-[#f4c430]/80 hover:bg-[#f4c430]/90 text-black">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu Verifikasi
          </Badge>
        );
      case "ditolak":
        return (
          <Badge className="bg-red-600 hover:bg-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        );
      default:
        return (
          <Badge className="bg-white/10 hover:bg-white/20 text-gray-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Belum Upload
          </Badge>
        );
    }
  };

  const handleVerifikasi = () => {
    if (!selectedJamaah || !selectedDokumen) return;

    const today = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    setJamaahList(
      jamaahList.map((j) =>
        j.id === selectedJamaah.id
          ? {
              ...j,
              dokumen: {
                ...j.dokumen,
                [selectedDokumen.jenis]: {
                  ...selectedDokumen.data,
                  status: verifikasiStatus,
                  tanggalVerifikasi: today,
                  keterangan: keterangan || undefined,
                },
              },
            }
          : j
      )
    );

    setShowVerifikasiDialog(false);
    setSelectedJamaah(null);
    setSelectedDokumen(null);
    setKeterangan("");
    setVerifikasiStatus("diverifikasi");
  };

  const getDokumenStats = (jamaah: Jamaah) => {
    const dokumenArray = Object.values(jamaah.dokumen);
    const total = dokumenArray.length;
    const diverifikasi = dokumenArray.filter((d) => d.status === "diverifikasi").length;
    const menunggu = dokumenArray.filter((d) => d.status === "menunggu-verifikasi").length;
    const ditolak = dokumenArray.filter((d) => d.status === "ditolak").length;
    const belumUpload = dokumenArray.filter((d) => d.status === "belum-upload").length;

    return { total, diverifikasi, menunggu, ditolak, belumUpload };
  };

  const filteredJamaah = jamaahList.filter((jamaah) => {
    const matchSearch =
      jamaah.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jamaah.noKTP.includes(searchQuery) ||
      jamaah.noPendaftaran.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "semua") return matchSearch;

    const stats = getDokumenStats(jamaah);
    switch (filterStatus) {
      case "lengkap":
        return matchSearch && stats.diverifikasi === stats.total;
      case "menunggu":
        return matchSearch && stats.menunggu > 0;
      case "ditolak":
        return matchSearch && stats.ditolak > 0;
      case "belum-lengkap":
        return matchSearch && stats.diverifikasi < stats.total;
      default:
        return matchSearch;
    }
  });

  // Calculate statistics
  const totalJamaah = jamaahList.length;
  const jamaahLengkap = jamaahList.filter(
    (j) => getDokumenStats(j).diverifikasi === getDokumenStats(j).total
  ).length;
  const totalMenunggu = jamaahList.reduce((sum, j) => sum + getDokumenStats(j).menunggu, 0);
  const totalDitolak = jamaahList.reduce((sum, j) => sum + getDokumenStats(j).ditolak, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Verifikasi Dokumen</h1>
        <p className="text-gray-400">Kelola dan verifikasi dokumen administrasi jamaah</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-black/50 via-black to-black/80 border-[#f4c430]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm mb-1">Total Jamaah</p>
                <p className="text-3xl font-bold text-white">{totalJamaah}</p>
              </div>
              <div className="w-12 h-12 bg-[#f4c430]/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#f4c430]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black/50 via-black to-black/80 border-[#f4c430]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm mb-1">Dokumen Lengkap</p>
                <p className="text-3xl font-bold text-white">{jamaahLengkap}</p>
              </div>
              <div className="w-12 h-12 bg-[#f4c430]/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#f4c430]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black/50 via-black to-black/80 border-[#f4c430]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm mb-1">Menunggu Verifikasi</p>
                <p className="text-3xl font-bold text-white">{totalMenunggu}</p>
              </div>
              <div className="w-12 h-12 bg-[#f4c430]/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#f4c430]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-black/50 via-black to-black/80 border-[#f4c430]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 text-sm mb-1">Ditolak</p>
                <p className="text-3xl font-bold text-white">{totalDitolak}</p>
              </div>
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
              <Input
                placeholder="Cari jamaah (nama, KTP, no. pendaftaran)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-[#f4c430]/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="lengkap">Dokumen Lengkap</SelectItem>
                  <SelectItem value="menunggu">Menunggu Verifikasi</SelectItem>
                  <SelectItem value="ditolak">Ada yang Ditolak</SelectItem>
                  <SelectItem value="belum-lengkap">Belum Lengkap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jamaah List */}
      <div className="grid gap-4">
        {filteredJamaah.map((jamaah, index) => {
          const stats = getDokumenStats(jamaah);
          const progress = (stats.diverifikasi / stats.total) * 100;

          return (
            <motion.div
              key={jamaah.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 hover:border-[#f4c430]/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-white">{jamaah.namaLengkap}</CardTitle>
                        {stats.diverifikasi === stats.total ? (
                          <Badge className="bg-[#f4c430] text-black">Lengkap</Badge>
                        ) : stats.menunggu > 0 ? (
                          <Badge className="bg-[#f4c430]/80 text-black">{stats.menunggu} Menunggu</Badge>
                        ) : stats.ditolak > 0 ? (
                          <Badge className="bg-red-600">{stats.ditolak} Ditolak</Badge>
                        ) : (
                          <Badge className="bg-white/10 text-gray-200">Belum Lengkap</Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-4 flex-wrap text-gray-200">
                        <span>No. {jamaah.noPendaftaran}</span>
                        <span>• KTP: {jamaah.noKTP}</span>
                        <span className="flex items-center gap-1">
                          • <Calendar className="w-3 h-3" />
                          {jamaah.tanggalKeberangkatan}
                        </span>
                      </CardDescription>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-200">Progress Verifikasi</span>
                      <span className="text-white font-medium">
                        {stats.diverifikasi}/{stats.total} • {progress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {Object.entries(jamaah.dokumen).map(([key, dokumen]) => (
                      <Card
                        key={key}
                        className={`bg-black/30 border transition-all cursor-pointer ${
                          dokumen.status === "diverifikasi"
                            ? "border-green-600/50 hover:border-green-600"
                            : dokumen.status === "menunggu-verifikasi"
                            ? "border-blue-600/50 hover:border-blue-600"
                            : dokumen.status === "ditolak"
                            ? "border-red-600/50 hover:border-red-600"
                            : "border-gray-600/50 hover:border-gray-600"
                        }`}
                        onClick={() => {
                          if (dokumen.status !== "belum-upload") {
                            setSelectedJamaah(jamaah);
                            setSelectedDokumen({ jenis: key, data: dokumen });
                            setShowDetailDialog(true);
                          }
                        }}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="mb-2 flex justify-center">
                            {dokumen.status === "diverifikasi" ? (
                              <CheckCircle2 className="w-8 h-8 text-[#f4c430]" />
                            ) : dokumen.status === "menunggu-verifikasi" ? (
                              <Clock className="w-8 h-8 text-[#f4c430]" />
                            ) : dokumen.status === "ditolak" ? (
                              <XCircle className="w-8 h-8 text-red-500" />
                            ) : (
                              <FileText className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <p className="text-xs text-white font-medium mb-1">{dokumen.jenis}</p>
                          <p className="text-xs text-gray-200">
                            {dokumen.status === "diverifikasi"
                              ? "Verified"
                              : dokumen.status === "menunggu-verifikasi"
                              ? "Pending"
                              : dokumen.status === "ditolak"
                              ? "Rejected"
                              : "Not uploaded"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Dokumen Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5 text-[#f4c430]" />
              Detail Dokumen
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Informasi lengkap dokumen dan status verifikasi
            </DialogDescription>
          </DialogHeader>

          {selectedJamaah && selectedDokumen && (
            <div className="space-y-4 py-4">
              {/* Jamaah Info */}
              <div className="p-4 bg-gradient-to-br from-[#f4c430]/10 to-[#ffd700]/10 rounded-lg border border-[#f4c430]/30">
                <h4 className="font-semibold text-white mb-2">{selectedJamaah.namaLengkap}</h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>No. Pendaftaran: {selectedJamaah.noPendaftaran}</p>
                  <p>KTP: {selectedJamaah.noKTP}</p>
                  <p>Paket: {selectedJamaah.paket}</p>
                </div>
              </div>

              {/* Dokumen Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Jenis Dokumen</Label>
                  <span className="font-semibold">{selectedDokumen.data.jenis}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-base">Status</Label>
                  {getStatusBadge(selectedDokumen.data.status)}
                </div>

                {selectedDokumen.data.file && (
                  <div className="flex items-center justify-between">
                    <Label className="text-base">File</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#f4c430]/50 text-[#f4c430] hover:bg-[#f4c430]/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {selectedDokumen.data.file}
                    </Button>
                  </div>
                )}

                {selectedDokumen.data.tanggalUpload && (
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Tanggal Upload</Label>
                    <span className="text-gray-400">{selectedDokumen.data.tanggalUpload}</span>
                  </div>
                )}

                {selectedDokumen.data.tanggalVerifikasi && (
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Tanggal Verifikasi</Label>
                    <span className="text-gray-400">{selectedDokumen.data.tanggalVerifikasi}</span>
                  </div>
                )}

                {selectedDokumen.data.keterangan && (
                  <div>
                    <Label className="text-base mb-2 block">Keterangan</Label>
                    <div className="p-3 bg-black/50 border border-[#f4c430]/20 rounded text-sm text-gray-300">
                      {selectedDokumen.data.keterangan}
                    </div>
                  </div>
                )}
              </div>

              {/* Preview (Mock) */}
              {selectedDokumen.data.file && (
                <div className="space-y-2">
                  <Label className="text-base">Preview Dokumen</Label>
                  <div className="h-64 bg-black/50 border border-[#f4c430]/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm">Preview dokumen akan muncul di sini</p>
                      <p className="text-xs mt-1">(Integrasi dengan storage diperlukan)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailDialog(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Tutup
            </Button>
            {selectedDokumen?.data.status === "menunggu-verifikasi" && (
              <Button
                onClick={() => {
                  setShowDetailDialog(false);
                  setShowVerifikasiDialog(true);
                }}
                className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
              >
                <Eye className="w-4 h-4 mr-2" />
                Verifikasi Sekarang
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verifikasi Dialog */}
      <Dialog open={showVerifikasiDialog} onOpenChange={setShowVerifikasiDialog}>
        <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="w-5 h-5 text-[#f4c430]" />
              Verifikasi Dokumen
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Setujui atau tolak dokumen yang diupload jamaah
            </DialogDescription>
          </DialogHeader>

          {selectedJamaah && selectedDokumen && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-blue-900/10 border border-blue-600/20 rounded text-sm">
                <p className="text-blue-400 font-medium mb-1">
                  {selectedJamaah.namaLengkap} - {selectedDokumen.data.jenis}
                </p>
                <p className="text-gray-400">{selectedDokumen.data.file}</p>
              </div>

              <div className="space-y-2">
                <Label>Status Verifikasi *</Label>
                <Select
                  value={verifikasiStatus}
                  onValueChange={(value: "diverifikasi" | "ditolak") => setVerifikasiStatus(value)}
                >
                  <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                    <SelectItem value="diverifikasi">✓ Diverifikasi (Diterima)</SelectItem>
                    <SelectItem value="ditolak">✗ Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keterangan">
                  Keterangan {verifikasiStatus === "ditolak" && "*"}
                </Label>
                <Textarea
                  id="keterangan"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder={
                    verifikasiStatus === "ditolak"
                      ? "Jelaskan alasan penolakan dan apa yang perlu diperbaiki..."
                      : "Keterangan tambahan (opsional)"
                  }
                  className="bg-black/50 border-[#f4c430]/20 text-white min-h-[100px]"
                />
              </div>

              {verifikasiStatus === "ditolak" && (
                <div className="p-3 bg-red-900/10 border border-red-600/20 rounded text-sm flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400">
                    Dokumen yang ditolak akan meminta jamaah untuk upload ulang dengan perbaikan.
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowVerifikasiDialog(false);
                setKeterangan("");
                setVerifikasiStatus("diverifikasi");
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Batal
            </Button>
            <Button
              onClick={handleVerifikasi}
              disabled={verifikasiStatus === "ditolak" && !keterangan.trim()}
              className={
                verifikasiStatus === "diverifikasi"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }
            >
              {verifikasiStatus === "diverifikasi" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Verifikasi Dokumen
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak Dokumen
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
