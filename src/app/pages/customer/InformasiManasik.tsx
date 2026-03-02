import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  BookOpen, 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Phone,
  Mail,
  Info,
  CheckCircle2,
  AlertTriangle,
  Hotel,
  Utensils,
  FileText,
  Download,
  Video
} from "lucide-react";

export default function InformasiManasik() {
  // Mock data
  const keberangkatan = {
    tanggalKeberangkatan: "15 Maret 2026",
    tanggalKepulangan: "24 Maret 2026",
    bandara: "Soekarno-Hatta International Airport",
    terminalGate: "Terminal 3, Gate 5",
    waktuKumpul: "08:00 WIB",
    waktuTakeOff: "11:00 WIB",
    maskapai: "Garuda Indonesia",
    nomorPenerbangan: "GA-9876",
  };

  const hotel = {
    makkah: {
      nama: "Makkah Hotel Millennium",
      alamat: "Ibrahim Al Khalil St, Makkah 24231, Saudi Arabia",
      jarak: "500m dari Masjidil Haram (walking distance)",
      bintang: 4,
      checkin: "16 Maret 2026",
      checkout: "20 Maret 2026",
    },
    madinah: {
      nama: "Madinah Hilton Hotel",
      alamat: "King Faisal Rd, Madinah 42311, Saudi Arabia",
      jarak: "300m dari Masjid Nabawi (walking distance)",
      bintang: 4,
      checkin: "20 Maret 2026",
      checkout: "23 Maret 2026",
    },
  };

  const tourLeader = {
    nama: "Ustadz Ahmad Fauzi, Lc",
    telp: "+62 812-3456-7890",
    email: "ahmad.fauzi@ardayatravel.com",
    pengalaman: "15 tahun membimbing jamaah umrah",
  };

  const materiManasik = [
    {
      judul: "Niat dan Tata Cara Ihram",
      durasi: "30 menit",
      deskripsi: "Pelajari cara berniat ihram dan hal-hal yang dilarang saat berihram",
    },
    {
      judul: "Tawaf dan Sunnah-sunnahnya",
      durasi: "45 menit",
      deskripsi: "Tata cara melakukan tawaf 7 putaran mengelilingi Ka'bah",
    },
    {
      judul: "Sa'i antara Safa dan Marwah",
      durasi: "30 menit",
      deskripsi: "Cara melakukan sa'i 7 kali bolak-balik antara bukit Safa dan Marwah",
    },
    {
      judul: "Tahallul dan Tahallul Akhir",
      durasi: "20 menit",
      deskripsi: "Tata cara tahallul (potong/cukur rambut) dan mengakhiri ibadah umrah",
    },
    {
      judul: "Ziarah dan Adab di Tanah Suci",
      durasi: "40 menit",
      deskripsi: "Tempat-tempat ziarah dan adab saat berada di Makkah dan Madinah",
    },
  ];

  const jadwalManasik = [
    { tanggal: "1 Maret 2026", waktu: "09:00 - 12:00", materi: "Sesi 1: Persiapan & Niat Umrah", lokasi: "Kantor Ardaya Travel" },
    { tanggal: "5 Maret 2026", waktu: "09:00 - 12:00", materi: "Sesi 2: Tawaf & Sa'i", lokasi: "Kantor Ardaya Travel" },
    { tanggal: "10 Maret 2026", waktu: "09:00 - 11:00", materi: "Sesi 3: Ziarah & Tips Perjalanan", lokasi: "Kantor Ardaya Travel" },
  ];

  const perlengkapan = [
    { item: "Paspor dan visa umrah", wajib: true },
    { item: "Tiket pesawat PP", wajib: true },
    { item: "Pakaian ihram (laki-laki: 2 lembar kain putih)", wajib: true },
    { item: "Mukena dan jilbab (perempuan)", wajib: true },
    { item: "Sandal jepit", wajib: true },
    { item: "Obat-obatan pribadi", wajib: true },
    { item: "Sabuk ihram dan tas umrah", wajib: false },
    { item: "Power bank dan charger", wajib: false },
    { item: "Buku panduan umrah", wajib: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Informasi Manasik & Keberangkatan
          </h1>
          <p className="text-gray-600">
            Panduan lengkap persiapan dan jadwal keberangkatan umrah Anda
          </p>
        </div>

        <Tabs defaultValue="keberangkatan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="keberangkatan">
              <Plane className="w-4 h-4 mr-2" />
              Keberangkatan
            </TabsTrigger>
            <TabsTrigger value="manasik">
              <BookOpen className="w-4 h-4 mr-2" />
              Manasik
            </TabsTrigger>
          </TabsList>

          {/* Tab Keberangkatan */}
          <TabsContent value="keberangkatan" className="space-y-6">
            {/* Info Penerbangan */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Informasi Penerbangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Tanggal Keberangkatan</span>
                    </div>
                    <div className="font-bold text-lg">{keberangkatan.tanggalKeberangkatan}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Tanggal Kepulangan</span>
                    </div>
                    <div className="font-bold text-lg">{keberangkatan.tanggalKepulangan}</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#f4c430]" />
                    Detail Keberangkatan
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bandara:</span>
                      <span className="font-medium">{keberangkatan.bandara}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Terminal & Gate:</span>
                      <span className="font-medium">{keberangkatan.terminalGate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waktu Kumpul:</span>
                      <span className="font-medium text-red-600">{keberangkatan.waktuKumpul}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waktu Take Off:</span>
                      <span className="font-medium">{keberangkatan.waktuTakeOff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maskapai:</span>
                      <span className="font-medium">{keberangkatan.maskapai}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nomor Penerbangan:</span>
                      <span className="font-medium">{keberangkatan.nomorPenerbangan}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">Perhatian Penting!</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Harap tiba di bandara minimal 3 jam sebelum keberangkatan</li>
                        <li>• Pastikan semua dokumen (paspor, visa, tiket) sudah siap</li>
                        <li>• Bagasi maksimal 30kg, cabin bag 7kg</li>
                        <li>• Jangan membawa makanan/minuman cair di cabin</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Hotel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="w-5 h-5" />
                    Hotel Makkah
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold text-lg">{hotel.makkah.nama}</div>
                    <div className="flex items-center gap-1 text-[#f4c430] mt-1">
                      {Array.from({ length: hotel.makkah.bintang }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {hotel.makkah.alamat}
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800">
                      📍 {hotel.makkah.jarak}
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{hotel.makkah.checkin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{hotel.makkah.checkout}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hotel className="w-5 h-5" />
                    Hotel Madinah
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold text-lg">{hotel.madinah.nama}</div>
                    <div className="flex items-center gap-1 text-[#f4c430] mt-1">
                      {Array.from({ length: hotel.madinah.bintang }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {hotel.madinah.alamat}
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800">
                      📍 {hotel.madinah.jarak}
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Check-in:</span>
                      <span className="font-medium">{hotel.madinah.checkin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out:</span>
                      <span className="font-medium">{hotel.madinah.checkout}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Manasik */}
          <TabsContent value="manasik" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Materi Manasik Haji & Umrah
                </CardTitle>
                <CardDescription>
                  Pelajari tata cara ibadah umrah sebelum keberangkatan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {materiManasik.map((materi, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:border-[#f4c430] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
                            Sesi {index + 1}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {materi.durasi}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{materi.judul}</h3>
                        <p className="text-sm text-gray-600">{materi.deskripsi}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Tonton
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Jadwal Manasik Offline
                </CardTitle>
                <CardDescription>
                  Hadir di lokasi untuk mendapatkan bimbingan langsung
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jadwalManasik.map((jadwal, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#f4c430] rounded-lg flex items-center justify-center text-black font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{jadwal.materi}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            📅 {jadwal.tanggal} • ⏰ {jadwal.waktu}
                          </div>
                          <div className="text-sm text-gray-600">
                            📍 {jadwal.lokasi}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Buku Panduan Umrah (PDF)
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}