import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck,
  Shield,
  UserPlus,
  Users,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface DokumenStatus {
  ktp: { uploaded: boolean; file: string | null };
  kk: { uploaded: boolean; file: string | null };
  passport: { uploaded: boolean; file: string | null };
  foto: { uploaded: boolean; file: string | null };
  bukuVaksin: { uploaded: boolean; file: string | null };
}

interface JamaahPengganti {
  id: string;
  nama: string;
  hubungan: string;
  dokumen: DokumenStatus;
}

export default function UploadDokumen() {
  const [activeTab, setActiveTab] = useState<string>("pribadi");
  
  const [dokumen, setDokumen] = useState<DokumenStatus>({
    ktp: { uploaded: false, file: null },
    kk: { uploaded: false, file: null },
    passport: { uploaded: false, file: null },
    foto: { uploaded: false, file: null },
    bukuVaksin: { uploaded: false, file: null },
  });

  // State untuk jamaah pengganti
  const [jamaahPengganti, setJamaahPengganti] = useState<JamaahPengganti[]>([]);
  const [showAddJamaahDialog, setShowAddJamaahDialog] = useState(false);
  const [newJamaahNama, setNewJamaahNama] = useState("");
  const [newJamaahHubungan, setNewJamaahHubungan] = useState("");

  // Mock data pendaftaran
  const pendaftaran = {
    noPendaftaran: "UM2026001",
    namaPaket: "Paket Umrah Reguler",
    totalBayar: 25000000,
    dp: 5000000,
    sudahBayar: 5000000, // DP sudah dibayar saat pendaftaran
  };

  const handleFileUpload = (dokumenType: keyof DokumenStatus, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDokumen((prev) => ({
        ...prev,
        [dokumenType]: {
          uploaded: true,
          file: file.name,
        },
      }));
    }
  };

  const handleFileUploadJamaahPengganti = (
    jamaahId: string,
    dokumenType: keyof DokumenStatus,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setJamaahPengganti((prev) =>
        prev.map((jamaah) =>
          jamaah.id === jamaahId
            ? {
                ...jamaah,
                dokumen: {
                  ...jamaah.dokumen,
                  [dokumenType]: {
                    uploaded: true,
                    file: file.name,
                  },
                },
              }
            : jamaah
        )
      );
    }
  };

  const handleAddJamaahPengganti = () => {
    if (!newJamaahNama || !newJamaahHubungan) {
      alert("Mohon lengkapi nama dan hubungan keluarga");
      return;
    }

    const newJamaah: JamaahPengganti = {
      id: `JP${Date.now()}`,
      nama: newJamaahNama,
      hubungan: newJamaahHubungan,
      dokumen: {
        ktp: { uploaded: false, file: null },
        kk: { uploaded: false, file: null },
        passport: { uploaded: false, file: null },
        foto: { uploaded: false, file: null },
        bukuVaksin: { uploaded: false, file: null },
      },
    };

    setJamaahPengganti([...jamaahPengganti, newJamaah]);
    setShowAddJamaahDialog(false);
    setNewJamaahNama("");
    setNewJamaahHubungan("");
    setActiveTab(newJamaah.id);
  };

  const handleRemoveJamaahPengganti = (jamaahId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data jamaah pengganti ini?")) {
      setJamaahPengganti((prev) => prev.filter((jamaah) => jamaah.id !== jamaahId));
      setActiveTab("pribadi");
    }
  };

  const allDokumenUploaded = Object.values(dokumen).every((d) => d.uploaded);
  const canUploadDokumen = pendaftaran.sudahBayar >= pendaftaran.dp;

  const dokumenList = [
    { key: "ktp" as keyof DokumenStatus, label: "KTP", description: "Scan KTP asli dan masih berlaku" },
    { key: "kk" as keyof DokumenStatus, label: "Kartu Keluarga", description: "Scan KK asli" },
    { key: "passport" as keyof DokumenStatus, label: "Passport", description: "Scan passport (minimal berlaku 6 bulan)" },
    { key: "foto" as keyof DokumenStatus, label: "Pas Foto", description: "Foto 4x6 background putih" },
    { key: "bukuVaksin" as keyof DokumenStatus, label: "Buku Vaksin", description: "Scan buku vaksin meningitis" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Dokumen
          </h1>
          <p className="text-gray-600">
            Lengkapi pembayaran DP dan upload dokumen persyaratan umrah
          </p>
        </div>

        {/* Pendaftaran Info */}
        <Card className="mb-6 border-l-4 border-l-[#f4c430]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Informasi Pendaftaran</CardTitle>
                <CardDescription className="mt-1">
                  No. Pendaftaran: <span className="font-semibold text-gray-900">{pendaftaran.noPendaftaran}</span>
                </CardDescription>
              </div>
              <Badge className="bg-[#f4c430] text-black">
                {pendaftaran.namaPaket}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total Biaya</div>
                <div className="text-xl font-bold text-gray-900">
                  Rp {pendaftaran.totalBayar.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">DP yang harus dibayar</div>
                <div className="text-xl font-bold text-[#f4c430]">
                  Rp {pendaftaran.dp.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Status Pembayaran</div>
                <div className="flex items-center gap-2">
                  {pendaftaran.sudahBayar >= pendaftaran.dp ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-600">Lunas</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-600">Belum Bayar</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Dokumen Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Upload Dokumen Persyaratan
                </CardTitle>
                <CardDescription>
                  Upload semua dokumen yang diperlukan untuk proses umrah
                </CardDescription>
              </div>
              {canUploadDokumen && (
                <Dialog open={showAddJamaahDialog} onOpenChange={setShowAddJamaahDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#f4c430]/50 text-[#f4c430] hover:bg-[#f4c430]/10"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Tambah Jamaah Pengganti
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Tambah Jamaah Pengganti</DialogTitle>
                      <DialogDescription>
                        Masukkan informasi jamaah pengganti yang akan menggantikan Anda
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama-jamaah">Nama Lengkap *</Label>
                        <Input
                          id="nama-jamaah"
                          value={newJamaahNama}
                          onChange={(e) => setNewJamaahNama(e.target.value)}
                          placeholder="Masukkan nama lengkap"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hubungan-jamaah">Hubungan Keluarga *</Label>
                        <Select value={newJamaahHubungan} onValueChange={setNewJamaahHubungan}>
                          <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Pilih hubungan keluarga" />
                          </SelectTrigger>
                          <SelectContent>
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
                    <div className="flex justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddJamaahDialog(false);
                          setNewJamaahNama("");
                          setNewJamaahHubungan("");
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        onClick={handleAddJamaahPengganti}
                        className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Tambah
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!canUploadDokumen && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Pembayaran DP Diperlukan</h4>
                  <p className="text-sm text-amber-800">
                    Anda perlu menyelesaikan pembayaran DP terlebih dahulu sebelum dapat mengupload dokumen.
                  </p>
                </div>
              </div>
            )}

            {canUploadDokumen && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full mb-6" style={{ gridTemplateColumns: `repeat(${jamaahPengganti.length + 1}, minmax(0, 1fr))` }}>
                  <TabsTrigger value="pribadi" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Dokumen Saya
                  </TabsTrigger>
                  {jamaahPengganti.map((jamaah) => (
                    <TabsTrigger key={jamaah.id} value={jamaah.id} className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      {jamaah.nama}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Dokumen Pribadi */}
                <TabsContent value="pribadi" className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <div className="flex items-start gap-2">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Dokumen Pribadi</h4>
                        <p className="text-sm text-blue-800">
                          Upload dokumen persyaratan untuk diri Anda sendiri
                        </p>
                      </div>
                    </div>
                  </div>

                  {dokumenList.map((dok) => (
                    <div
                      key={dok.key}
                      className={`p-4 border rounded-lg transition-all ${
                        dokumen[dok.key].uploaded
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200 hover:border-[#f4c430]/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              dokumen[dok.key].uploaded ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {dokumen[dok.key].uploaded ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Label className="font-semibold text-gray-900">{dok.label}</Label>
                            <p className="text-sm text-gray-600 mt-1">{dok.description}</p>
                            {dokumen[dok.key].uploaded && (
                              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                <FileCheck className="w-4 h-4" />
                                {dokumen[dok.key].file}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Input
                            type="file"
                            id={`file-pribadi-${dok.key}`}
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(dok.key, e)}
                          />
                          <Label htmlFor={`file-pribadi-${dok.key}`}>
                            <Button
                              variant={dokumen[dok.key].uploaded ? "outline" : "default"}
                              size="sm"
                              className={
                                dokumen[dok.key].uploaded
                                  ? ""
                                  : "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                              }
                              asChild
                            >
                              <span className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                {dokumen[dok.key].uploaded ? "Ganti" : "Upload"}
                              </span>
                            </Button>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Progress Summary */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress Upload</span>
                      <span className="text-sm font-bold text-[#f4c430]">
                        {Object.values(dokumen).filter((d) => d.uploaded).length} /{" "}
                        {dokumenList.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-[#f4c430] to-[#ffd700] h-3 rounded-full transition-all"
                        style={{
                          width: `${
                            (Object.values(dokumen).filter((d) => d.uploaded).length /
                              dokumenList.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                    disabled={!allDokumenUploaded}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    {allDokumenUploaded
                      ? "Kirim Dokumen untuk Verifikasi"
                      : "Upload Semua Dokumen Dulu"}
                  </Button>
                </TabsContent>

                {/* Dokumen Jamaah Pengganti */}
                {jamaahPengganti.map((jamaah) => {
                  const allDokumenJamaahUploaded = Object.values(jamaah.dokumen).every(
                    (d) => d.uploaded
                  );

                  return (
                    <TabsContent key={jamaah.id} value={jamaah.id} className="space-y-4">
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-2 flex-1">
                            <UserPlus className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-amber-900 mb-1">
                                Jamaah Pengganti: {jamaah.nama}
                              </h4>
                              <p className="text-sm text-amber-800">
                                Hubungan: {jamaah.hubungan}
                              </p>
                              <p className="text-xs text-amber-700 mt-1">
                                Upload dokumen persyaratan untuk jamaah pengganti ini
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveJamaahPengganti(jamaah.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {dokumenList.map((dok) => (
                        <div
                          key={dok.key}
                          className={`p-4 border rounded-lg transition-all ${
                            jamaah.dokumen[dok.key].uploaded
                              ? "bg-green-50 border-green-200"
                              : "bg-white border-gray-200 hover:border-[#f4c430]/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  jamaah.dokumen[dok.key].uploaded
                                    ? "bg-green-100"
                                    : "bg-gray-100"
                                }`}
                              >
                                {jamaah.dokumen[dok.key].uploaded ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : (
                                  <FileText className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <Label className="font-semibold text-gray-900">{dok.label}</Label>
                                <p className="text-sm text-gray-600 mt-1">{dok.description}</p>
                                {jamaah.dokumen[dok.key].uploaded && (
                                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                    <FileCheck className="w-4 h-4" />
                                    {jamaah.dokumen[dok.key].file}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div>
                              <Input
                                type="file"
                                id={`file-${jamaah.id}-${dok.key}`}
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={(e) =>
                                  handleFileUploadJamaahPengganti(jamaah.id, dok.key, e)
                                }
                              />
                              <Label htmlFor={`file-${jamaah.id}-${dok.key}`}>
                                <Button
                                  variant={
                                    jamaah.dokumen[dok.key].uploaded ? "outline" : "default"
                                  }
                                  size="sm"
                                  className={
                                    jamaah.dokumen[dok.key].uploaded
                                      ? ""
                                      : "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                                  }
                                  asChild
                                >
                                  <span className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" />
                                    {jamaah.dokumen[dok.key].uploaded ? "Ganti" : "Upload"}
                                  </span>
                                </Button>
                              </Label>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Progress Summary */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Progress Upload
                          </span>
                          <span className="text-sm font-bold text-[#f4c430]">
                            {Object.values(jamaah.dokumen).filter((d) => d.uploaded).length} /{" "}
                            {dokumenList.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-[#f4c430] to-[#ffd700] h-3 rounded-full transition-all"
                            style={{
                              width: `${
                                (Object.values(jamaah.dokumen).filter((d) => d.uploaded).length /
                                  dokumenList.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full mt-6 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                        disabled={!allDokumenJamaahUploaded}
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        {allDokumenJamaahUploaded
                          ? "Kirim Dokumen untuk Verifikasi"
                          : "Upload Semua Dokumen Dulu"}
                      </Button>
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}

            {!canUploadDokumen && (
              <div className="space-y-4">
                {dokumenList.map((dok) => (
                  <div
                    key={dok.key}
                    className="p-4 border rounded-lg bg-gray-50 border-gray-200 opacity-60"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-100">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <Label className="font-semibold text-gray-900">{dok.label}</Label>
                          <p className="text-sm text-gray-600 mt-1">{dok.description}</p>
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="default"
                          size="sm"
                          disabled
                          className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}