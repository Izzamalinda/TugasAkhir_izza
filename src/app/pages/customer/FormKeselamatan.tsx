import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Checkbox } from "../../components/ui/checkbox";
import { Badge } from "../../components/ui/badge";
import { 
  Shield, 
  AlertCircle, 
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Info
} from "lucide-react";
import { useState } from "react";

export default function FormKeselamatan() {
  const userName = localStorage.getItem("userName") || "Customer";
  
  // Mock data - dalam aplikasi nyata diambil dari API berdasarkan pendaftaran user
  const jamaahData = {
    nama: "Ahmad Fauzi",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "15 Januari 1985",
    alamat: "Jl. Merdeka No. 123, Jakarta Pusat"
  };

  const transportasiData = {
    namaPenyedia: "Blue Bird Transport",
    tipe: "Bus Pariwisata",
    jaluRute: "Jakarta - Bandara Soekarno Hatta",
    nomorPolisi: "B 1234 XYZ"
  };

  const penerbanganData = {
    maskapai: "Garuda Indonesia",
    nomorPenerbangan: "GA-9876",
    tanggalWaktuKeberangkatan: "15 Maret 2026, 11:00 WIB",
    tanggalWaktuKedatangan: "15 Maret 2026, 21:00 WAS (Saudi Arabia)"
  };

  const kesehatanData = {
    riwayatAlergi: "Tidak ada",
    riwayatPenyakit: "Hipertensi terkontrol",
    obatDikonsumsi: "Amlodipin 5mg (1x sehari)"
  };

  const akomodasiMakkah = {
    namaHotel: "Makkah Hotel Millennium",
    alamat: "Ibrahim Al Khalil St, Makkah 24231, Saudi Arabia",
    nomorKamar: "Akan diinformasikan saat check-in"
  };

  const akomodasiMadinah = {
    namaHotel: "Madinah Hilton Hotel",
    alamat: "King Faisal Rd, Madinah 42311, Saudi Arabia",
    nomorKamar: "Akan diinformasikan saat check-in"
  };

  const [formData, setFormData] = useState({
    // Pencegahan dan Prosedur
    aspekMemilikiMenerapkan: "",
    aspekMencegahMemantau: "",
    aspekMemilikiPertanyaan: "",
    
    // Persetujuan
    persetujuanKeselamatan: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.persetujuanKeselamatan) {
      alert("Mohon centang persetujuan");
      return;
    }
    
    if (!formData.aspekMemilikiMenerapkan || 
        !formData.aspekMencegahMemantau) {
      alert("Mohon jawab pertanyaan 1 dan 2 pada bagian Pencegahan dan Prosedur Keamanan");
      return;
    }
    
    console.log("Form submitted:", formData);
    alert("Form keselamatan berhasil disimpan!");
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Form Keselamatan dan Keamanan Jamaah Umrah dan Haji
          </h1>
          <p className="text-gray-600">
            Data keselamatan untuk perjalanan umrah Anda
          </p>
        </div>

        {/* Alert Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Informasi</h4>
            <p className="text-sm text-blue-800">
              Data jamaah, transportasi, penerbangan, kesehatan, dan akomodasi sudah diambil dari data paket umrah yang Anda daftarkan. 
              Silakan isi bagian Pencegahan dan Prosedur Keamanan di bawah ini.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Data Jamaah - Read Only */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4" />
                    Data Jamaah
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Nama Lengkap:</span>
                    <span className="font-medium">{jamaahData.nama}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Jenis Kelamin:</span>
                    <span className="font-medium">{jamaahData.jenisKelamin}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Tanggal Lahir:</span>
                    <span className="font-medium">{jamaahData.tanggalLahir}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Alamat Lengkap:</span>
                    <span className="font-medium">{jamaahData.alamat}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Data Penerbangan - Read Only */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4" />
                    Data Penerbangan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Nama Maskapai:</span>
                    <span className="font-medium">{penerbanganData.maskapai}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Nomor Penerbangan:</span>
                    <span className="font-medium">{penerbanganData.nomorPenerbangan}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Waktu Keberangkatan:</span>
                    <span className="font-medium">{penerbanganData.tanggalWaktuKeberangkatan}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Waktu Kedatangan:</span>
                    <span className="font-medium">{penerbanganData.tanggalWaktuKedatangan}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Data Akomodasi - Read Only */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4" />
                    Data Akomodasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <Badge className="mb-2 bg-green-500/20 text-green-700 border-green-500/30">
                      Hotel Makkah
                    </Badge>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Nama Hotel:</span>
                        <span className="font-medium">{akomodasiMakkah.namaHotel}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Alamat:</span>
                        <span className="font-medium text-xs">{akomodasiMakkah.alamat}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Nomor Kamar:</span>
                        <span className="font-medium">{akomodasiMakkah.nomorKamar}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <Badge className="mb-2 bg-blue-500/20 text-blue-700 border-blue-500/30">
                      Hotel Madinah
                    </Badge>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Nama Hotel:</span>
                        <span className="font-medium">{akomodasiMadinah.namaHotel}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Alamat:</span>
                        <span className="font-medium text-xs">{akomodasiMadinah.alamat}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">Nomor Kamar:</span>
                        <span className="font-medium">{akomodasiMadinah.nomorKamar}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Data Transportasi Darat - Read Only */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4" />
                    Data Transportasi Darat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Nama Penyedia:</span>
                    <span className="font-medium">{transportasiData.namaPenyedia}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Tipe Transportasi:</span>
                    <span className="font-medium">{transportasiData.tipe}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Jalur/Rute:</span>
                    <span className="font-medium">{transportasiData.jaluRute}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Nomor Polisi:</span>
                    <span className="font-medium">{transportasiData.nomorPolisi}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Data Kesehatan - Read Only */}
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4" />
                    Data Kesehatan
                  </CardTitle>
                  <CardDescription className="text-xs">
                    (Berdasarkan tes genting untuk kesehatan)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Riwayat Alergi:</span>
                    <span className="font-medium">{kesehatanData.riwayatAlergi}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Riwayat Penyakit:</span>
                    <span className="font-medium">{kesehatanData.riwayatPenyakit}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Obat Dikonsumsi:</span>
                    <span className="font-medium">{kesehatanData.obatDikonsumsi}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pencegahan dan Prosedur - EDITABLE */}
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShieldCheck className="w-4 h-4" />
                    Pencegahan dan Prosedur Keamanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pertanyaan 1 - Radio Button */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      1. Apakah Anda sudah memiliki dan menerapkan salinan dokumen penting (seperti paspor, visa, dan tiket) dalam bentuk digital dan fisik serta menyimpannya di tempat yang aman? *
                    </Label>
                    <RadioGroup
                      value={formData.aspekMemilikiMenerapkan}
                      onValueChange={(value) => handleChange("aspekMemilikiMenerapkan", value)}
                      required
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="ya" id="q1-ya" />
                        <Label htmlFor="q1-ya" className="cursor-pointer flex-1">
                          Ya
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="tidak" id="q1-tidak" />
                        <Label htmlFor="q1-tidak" className="cursor-pointer flex-1">
                          Tidak
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Pertanyaan 2 - Radio Button */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      2. Apakah Anda sudah mencegah dan memantau barang berharga serta tidak meninggalkan barang-barang berharga di tempat umum? *
                    </Label>
                    <RadioGroup
                      value={formData.aspekMencegahMemantau}
                      onValueChange={(value) => handleChange("aspekMencegahMemantau", value)}
                      required
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="ya" id="q2-ya" />
                        <Label htmlFor="q2-ya" className="cursor-pointer flex-1">
                          Ya
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="tidak" id="q2-tidak" />
                        <Label htmlFor="q2-tidak" className="cursor-pointer flex-1">
                          Tidak
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Pertanyaan 3 - Textarea */}
                  <div className="space-y-2">
                    <Label htmlFor="aspek3" className="text-sm font-medium">
                      3. Apakah Anda memiliki pertanyaan atau hal-hal khusus terkait keamanan dan keselamatan yang perlu disampaikan kepada tim kami sebelum atau selama perjalanan?
                    </Label>
                    <Textarea
                      id="aspek3"
                      placeholder="Tuliskan pertanyaan atau hal-hal khusus terkait keamanan (Contoh: Saya memiliki alergi obat tertentu, butuh bantuan kursi roda, dll)"
                      value={formData.aspekMemilikiPertanyaan}
                      onChange={(e) => handleChange("aspekMemilikiPertanyaan", e.target.value)}
                      rows={4}
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      *Opsional - Isi jika ada hal khusus yang perlu disampaikan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Persetujuan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Persetujuan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-medium mb-2">Pernyataan Penting:</p>
                    <p className="leading-relaxed">
                      Data yang saya isi adalah valid dan akan dipakai untuk kebutuhan keselamatan dan keamanan bersama serta 
                      informasi yang saya berikan adalah data lengkap dan akurat. Saya telah membaca dan menyetujui persyaratan 
                      keselamatan yang telah ditetapkan oleh Ardaya Travel. Jika menemukan hal-hal yang tidak sesuai dalam data 
                      yang saya isi, maka Ardaya Travel berhak untuk melakukan update dan berkoordinasi dengan pihak terkait 
                      untuk penanganan dan keselamatan jamaah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white border rounded-lg">
                  <Checkbox
                    id="persetujuanKeselamatan"
                    checked={formData.persetujuanKeselamatan}
                    onCheckedChange={(checked) =>
                      handleChange("persetujuanKeselamatan", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="persetujuanKeselamatan"
                    className="text-sm cursor-pointer leading-relaxed font-medium"
                  >
                    Saya menyetujui dan memahami pernyataan di atas
                  </Label>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <div className="flex-1 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Tanda Tangan:</span>
                    <div className="mt-2 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                      (Akan ditandatangani secara digital)
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Tanggal:</span>
                    <div className="mt-2 p-3 bg-gray-50 border rounded-lg font-medium">
                      {new Date().toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-32"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="w-64 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Kirim Form Keselamatan
            </Button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            <strong>Catatan:</strong> Form ini hanya contoh untuk keperluan demo. Dalam aplikasi sesungguhnya, 
            data akan diintegrasikan dengan sistem manajemen travel dan database.
          </p>
        </div>
      </div>
    </div>
  );
}