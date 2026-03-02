import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { paketUmrahList } from "../../data/mockData";
import { UserPlus, AlertCircle, Users, Trash2, Plus, CreditCard, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";

interface JamaahData {
  id: string;
  namaLengkap: string;
  nik: string; // sesuai ERD: nik varchar(30)
  noPaspor: string; // sesuai ERD: no_paspor varchar(30)
  tempatLahir: string; // sesuai ERD: tempat_lahir varchar(50)
  tanggalLahir: string; // sesuai ERD: tanggal_lahir date
  jenisKelamin: string; // sesuai ERD: jenis_kelamin varchar(10)
  alamat: string; // sesuai ERD: alamat varchar(200)
  noTelepon: string; // sesuai ERD: no_telepon varchar(20)
  email: string; // sesuai ERD: email varchar(100)
  namaDarurat: string; // sesuai ERD: nama_darurat varchar(100)
  noHpDarurat: string; // sesuai ERD: no_hp_darurat varchar(20)
  tipeJamaah: string; // dewasa/anak/bayi - untuk AnggotaPendaftaranJamaah.tipe_jamaah_id
}

export default function Pendaftaran() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paketId = searchParams.get("paket") || "";

  const [paketSelected, setPaketSelected] = useState(paketId);
  const [setujuSyarat, setSetujuSyarat] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Array of jamaah
  const [jamaahList, setJamaahList] = useState<JamaahData[]>([
    {
      id: "1",
      namaLengkap: "",
      nik: "",
      noPaspor: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      noTelepon: "",
      email: "",
      namaDarurat: "",
      noHpDarurat: "",
      tipeJamaah: "dewasa",
    },
  ]);

  const selectedPaket = paketUmrahList.find((p) => p.id === paketSelected);

  const handleAddJamaah = () => {
    const newJamaah: JamaahData = {
      id: Date.now().toString(),
      namaLengkap: "",
      nik: "",
      noPaspor: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      noTelepon: "",
      email: "",
      namaDarurat: "",
      noHpDarurat: "",
      tipeJamaah: "dewasa",
    };
    setJamaahList([...jamaahList, newJamaah]);
  };

  const handleRemoveJamaah = (id: string) => {
    if (jamaahList.length === 1) {
      alert("Minimal harus ada 1 jamaah");
      return;
    }
    setJamaahList(jamaahList.filter((j) => j.id !== id));
  };

  const handleJamaahChange = (id: string, field: keyof JamaahData, value: string) => {
    setJamaahList(
      jamaahList.map((j) =>
        j.id === id ? { ...j, [field]: value } : j
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paketSelected) {
      alert("Pilih paket umrah terlebih dahulu");
      return;
    }

    if (!setujuSyarat) {
      alert("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    // Validasi semua jamaah
    for (let i = 0; i < jamaahList.length; i++) {
      const jamaah = jamaahList[i];
      if (
        !jamaah.namaLengkap ||
        !jamaah.nik ||
        !jamaah.noPaspor ||
        !jamaah.tempatLahir ||
        !jamaah.tanggalLahir ||
        !jamaah.jenisKelamin ||
        !jamaah.alamat ||
        !jamaah.noTelepon ||
        !jamaah.email ||
        !jamaah.namaDarurat ||
        !jamaah.noHpDarurat ||
        !jamaah.tipeJamaah
      ) {
        alert(`Data jamaah ${i + 1} belum lengkap`);
        return;
      }
    }

    // Simulasi submit - dalam aplikasi nyata akan memanggil API
    console.log("Submit data:", {
      paketId: paketSelected,
      jamaahList,
    });

    // Show payment dialog instead of redirect
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);

    // Simulasi proses pembayaran (3 detik)
    setTimeout(() => {
      setPaymentProcessing(false);
      setShowPaymentDialog(false);
      setSubmitted(true);

      // Redirect ke status setelah 2 detik
      setTimeout(() => {
        navigate("/customer/status");
      }, 2000);
    }, 3000);
  };

  const totalBiaya = selectedPaket ? selectedPaket.harga * jamaahList.length : 0;
  const dpAmount = totalBiaya * 0.3; // DP 30%
  const sisaPembayaran = totalBiaya - dpAmount;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
              <p className="text-gray-600 mb-4">
                Terima kasih telah mendaftar {jamaahList.length} jamaah untuk paket{" "}
                <strong>{selectedPaket?.nama}</strong>. Kami akan memverifikasi data Anda dan menghubungi Anda segera.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  <strong>{jamaahList.length} Jamaah</strong> terdaftar:
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  {jamaahList.map((jamaah, idx) => (
                    <li key={jamaah.id}>
                      {idx + 1}. {jamaah.namaLengkap}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-500">Redirecting ke halaman status...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulir Pendaftaran Umrah
          </h1>
          <p className="text-gray-600">
            Anda dapat mendaftarkan beberapa jamaah sekaligus dalam 1 paket umrah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="w-5 h-5" />
                  Ringkasan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Paket Dipilih:</p>
                  {selectedPaket ? (
                    <div className="p-3 bg-gradient-to-br from-[#f4c430]/10 to-[#ffd700]/10 rounded-lg border border-[#f4c430]/30">
                      <p className="font-semibold text-sm">{selectedPaket.nama}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Rp {selectedPaket.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Belum dipilih</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Jumlah Jamaah:</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#f4c430] text-black text-lg px-3 py-1">
                      {jamaahList.length}
                    </Badge>
                    <span className="text-sm text-gray-600">jamaah</span>
                  </div>
                </div>

                {selectedPaket && (
                  <div className="pt-4 border-t">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Harga/jamaah:</span>
                        <span className="font-medium">
                          Rp {(selectedPaket.harga / 1000000).toFixed(1)} Jt
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah jamaah:</span>
                        <span className="font-medium">{jamaahList.length}x</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold text-base">
                        <span>Total Estimasi:</span>
                        <span className="text-[#f4c430]">
                          Rp {((selectedPaket.harga * jamaahList.length) / 1000000).toFixed(1)} Jt
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    Semua jamaah akan terdaftar dalam 1 grup keberangkatan yang sama
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pilih Paket */}
              <Card>
                <CardHeader>
                  <CardTitle>Pilih Paket Umrah</CardTitle>
                  <CardDescription>
                    Pilih paket yang sesuai untuk seluruh jamaah
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="paket">Paket Umrah *</Label>
                    <Select
                      value={paketSelected}
                      onValueChange={(value) => setPaketSelected(value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih paket" />
                      </SelectTrigger>
                      <SelectContent>
                        {paketUmrahList.map((paket) => (
                          <SelectItem
                            key={paket.id}
                            value={paket.id}
                            disabled={paket.tersedia === 0}
                          >
                            {paket.nama} - Rp {(paket.harga / 1000000).toFixed(1)} Jt
                            {paket.tersedia === 0 && " (Penuh)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Data Jamaah */}
              <div className="space-y-4">
                {jamaahList.map((jamaah, index) => (
                  <Card
                    key={jamaah.id}
                    className="border-l-4 border-l-[#f4c430]"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              Data Jamaah {index + 1}
                            </CardTitle>
                            <CardDescription className="text-xs">
                              {jamaah.namaLengkap || "Belum diisi"}
                            </CardDescription>
                          </div>
                        </div>
                        {jamaahList.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveJamaah(jamaah.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Data Pribadi */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`nama-${jamaah.id}`}>
                            Nama Lengkap *
                          </Label>
                          <Input
                            id={`nama-${jamaah.id}`}
                            placeholder="Sesuai KTP/Passport"
                            value={jamaah.namaLengkap}
                            onChange={(e) =>
                              handleJamaahChange(
                                jamaah.id,
                                "namaLengkap",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`tipeJamaah-${jamaah.id}`}>
                              Tipe Jamaah *
                            </Label>
                            <Select
                              value={jamaah.tipeJamaah}
                              onValueChange={(value) =>
                                handleJamaahChange(jamaah.id, "tipeJamaah", value)
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dewasa">Dewasa</SelectItem>
                                <SelectItem value="anak">Anak (2-12 tahun)</SelectItem>
                                <SelectItem value="bayi">Bayi (&lt;2 tahun)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`gender-${jamaah.id}`}>
                              Jenis Kelamin *
                            </Label>
                            <Select
                              value={jamaah.jenisKelamin}
                              onValueChange={(value) =>
                                handleJamaahChange(jamaah.id, "jenisKelamin", value)
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="L">Laki-laki</SelectItem>
                                <SelectItem value="P">Perempuan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`ktp-${jamaah.id}`}>No. NIK/KTP *</Label>
                            <Input
                              id={`ktp-${jamaah.id}`}
                              placeholder="16 digit"
                              value={jamaah.nik}
                              maxLength={16}
                              onChange={(e) =>
                                handleJamaahChange(jamaah.id, "nik", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`tempatLahir-${jamaah.id}`}>
                              Tempat Lahir *
                            </Label>
                            <Input
                              id={`tempatLahir-${jamaah.id}`}
                              placeholder="Kota tempat lahir"
                              value={jamaah.tempatLahir}
                              onChange={(e) =>
                                handleJamaahChange(jamaah.id, "tempatLahir", e.target.value)
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`tglLahir-${jamaah.id}`}>
                              Tanggal Lahir *
                            </Label>
                            <Input
                              id={`tglLahir-${jamaah.id}`}
                              type="date"
                              value={jamaah.tanggalLahir}
                              onChange={(e) =>
                                handleJamaahChange(
                                  jamaah.id,
                                  "tanggalLahir",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`email-${jamaah.id}`}>Email *</Label>
                            <Input
                              id={`email-${jamaah.id}`}
                              type="email"
                              placeholder="nama@email.com"
                              value={jamaah.email}
                              onChange={(e) =>
                                handleJamaahChange(jamaah.id, "email", e.target.value)
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`telp-${jamaah.id}`}>
                              No. Telepon/WA *
                            </Label>
                            <Input
                              id={`telp-${jamaah.id}`}
                              placeholder="08123456789"
                              value={jamaah.noTelepon}
                              onChange={(e) =>
                                handleJamaahChange(jamaah.id, "noTelepon", e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`alamat-${jamaah.id}`}>
                            Alamat Lengkap *
                          </Label>
                          <Textarea
                            id={`alamat-${jamaah.id}`}
                            placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi, Kode Pos"
                            value={jamaah.alamat}
                            rows={3}
                            onChange={(e) =>
                              handleJamaahChange(jamaah.id, "alamat", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      {/* Dokumen */}
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-semibold text-sm">Dokumen</h4>
                        <div className="space-y-2">
                          <Label htmlFor={`passport-${jamaah.id}`}>
                            No. Paspor
                          </Label>
                          <Input
                            id={`passport-${jamaah.id}`}
                            placeholder="Jika sudah memiliki (opsional)"
                            value={jamaah.noPaspor}
                            onChange={(e) =>
                              handleJamaahChange(
                                jamaah.id,
                                "noPaspor",
                                e.target.value
                              )
                            }
                          />
                          <p className="text-xs text-gray-500">
                            *Paspor wajib diupload nanti jika sudah memiliki
                          </p>
                        </div>
                      </div>

                      {/* Kontak Darurat */}
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Kontak Darurat
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`namaDarurat-${jamaah.id}`}>
                              Nama Kontak Darurat *
                            </Label>
                            <Input
                              id={`namaDarurat-${jamaah.id}`}
                              placeholder="Nama keluarga yang dapat dihubungi"
                              value={jamaah.namaDarurat}
                              onChange={(e) =>
                                handleJamaahChange(
                                  jamaah.id,
                                  "namaDarurat",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`hpDarurat-${jamaah.id}`}>
                              No. HP Kontak Darurat *
                            </Label>
                            <Input
                              id={`hpDarurat-${jamaah.id}`}
                              placeholder="08123456789"
                              value={jamaah.noHpDarurat}
                              onChange={(e) =>
                                handleJamaahChange(
                                  jamaah.id,
                                  "noHpDarurat",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          *Kontak darurat akan dihubungi jika terjadi hal mendesak selama perjalanan
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Button Tambah Jamaah */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddJamaah}
                  className="w-full border-2 border-dashed border-[#f4c430] text-[#f4c430] hover:bg-[#f4c430]/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Jamaah Lainnya
                </Button>
              </div>

              {/* Info Alert */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Setelah pendaftaran, Anda akan diminta untuk mengupload scan
                  dokumen untuk <strong>setiap jamaah</strong>: KTP, KK, Passport
                  (jika ada), Foto 4x6, dan Buku Vaksin.
                </AlertDescription>
              </Alert>

              {/* Syarat & Ketentuan */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="syarat"
                      checked={setujuSyarat}
                      onCheckedChange={(checked) =>
                        setSetujuSyarat(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="syarat"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Saya menyetujui{" "}
                      <span className="text-[#f4c430] font-medium">
                        syarat dan ketentuan
                      </span>{" "}
                      yang berlaku dan data yang saya berikan adalah benar untuk
                      semua jamaah
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/customer/paket")}
                  className="flex-1 border-2 border-[#f4c430] text-[#f4c430] hover:bg-[#f4c430] hover:text-black"
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Daftar {jamaahList.length} Jamaah
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-black via-gray-900 to-black border-[#f4c430]/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#f4c430]" />
              Pembayaran Down Payment (DP)
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Untuk mengkonfirmasi pendaftaran, silakan lakukan pembayaran DP terlebih dahulu
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Ringkasan Pembayaran */}
            <div className="bg-gradient-to-br from-[#f4c430]/10 to-gray-800 rounded-lg p-4 border border-[#f4c430]/30">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Ringkasan Pendaftaran</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Paket:</span>
                  <span className="text-white font-medium">{selectedPaket?.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jumlah Jamaah:</span>
                  <span className="text-white font-medium">{jamaahList.length} orang</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-400">Total Biaya:</span>
                  <span className="text-white font-semibold">
                    Rp {totalBiaya.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Detail Pembayaran */}
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  DP sebesar <strong className="text-[#f4c430]">30%</strong> dari total biaya harus dibayarkan untuk mengkonfirmasi pendaftaran
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] rounded-lg p-4">
                <div className="text-center">
                  <p className="text-xs text-black/70 mb-1">Jumlah DP yang harus dibayar:</p>
                  <p className="text-3xl font-bold text-black">
                    Rp {dpAmount.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-black/70 mt-2">
                    Sisa: Rp {sisaPembayaran.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods Info */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Metode Pembayaran</h4>
              <div className="space-y-1 text-xs text-gray-400">
                <p>• Transfer Bank (BCA, Mandiri, BNI)</p>
                <p>• E-Wallet (GoPay, OVO, DANA)</p>
                <p>• Kartu Kredit/Debit</p>
                <p>• Virtual Account</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                disabled={paymentProcessing}
              >
                Batal
              </Button>
              <Button
                onClick={handlePayment}
                disabled={paymentProcessing}
                className="flex-1 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 font-bold"
              >
                {paymentProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Bayar Sekarang
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}