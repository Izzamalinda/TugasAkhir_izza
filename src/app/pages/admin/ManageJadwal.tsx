import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Plus, Edit, MapPin, Calendar, Clock } from "lucide-react";
import { paketUmrahList } from "../../data/mockData";

interface Jadwal {
  id: string;
  paketId: string;
  namaPaket: string;
  tanggal: string;
  waktu: string;
  aktivitas: string;
  lokasi: string;
  keterangan: string;
}

const mockJadwal: Jadwal[] = [
  {
    id: "1",
    paketId: "1",
    namaPaket: "Paket Umrah Reguler",
    tanggal: "2026-03-15",
    waktu: "08:00",
    aktivitas: "Keberangkatan dari Jakarta",
    lokasi: "Bandara Soekarno-Hatta",
    keterangan: "Check-in 3 jam sebelum keberangkatan",
  },
  {
    id: "2",
    paketId: "1",
    namaPaket: "Paket Umrah Reguler",
    tanggal: "2026-03-15",
    waktu: "20:00",
    aktivitas: "Tiba di Jeddah",
    lokasi: "King Abdulaziz International Airport",
    keterangan: "Perjalanan menuju Makkah",
  },
  {
    id: "3",
    paketId: "1",
    namaPaket: "Paket Umrah Reguler",
    tanggal: "2026-03-16",
    waktu: "09:00",
    aktivitas: "Umrah & Thawaf",
    lokasi: "Masjidil Haram",
    keterangan: "Pelaksanaan ibadah umrah pertama",
  },
];

export default function ManageJadwal() {
  const [jadwalList, setJadwalList] = useState<Jadwal[]>(mockJadwal);
  const [selectedPaket, setSelectedPaket] = useState<string>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<Jadwal | null>(null);

  const [formData, setFormData] = useState({
    paketId: "",
    tanggal: "",
    waktu: "",
    aktivitas: "",
    lokasi: "",
    keterangan: "",
  });

  const resetForm = () => {
    setFormData({
      paketId: "",
      tanggal: "",
      waktu: "",
      aktivitas: "",
      lokasi: "",
      keterangan: "",
    });
    setEditingJadwal(null);
  };

  const handleEdit = (jadwal: Jadwal) => {
    setEditingJadwal(jadwal);
    setFormData({
      paketId: jadwal.paketId,
      tanggal: jadwal.tanggal,
      waktu: jadwal.waktu,
      aktivitas: jadwal.aktivitas,
      lokasi: jadwal.lokasi,
      keterangan: jadwal.keterangan,
    });
    setIsAddOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paket = paketUmrahList.find((p) => p.id === formData.paketId);
    if (!paket) return;

    if (editingJadwal) {
      setJadwalList(
        jadwalList.map((j) =>
          j.id === editingJadwal.id
            ? { ...editingJadwal, ...formData, namaPaket: paket.nama }
            : j
        )
      );
    } else {
      const newJadwal: Jadwal = {
        id: String(Date.now()),
        ...formData,
        namaPaket: paket.nama,
      };
      setJadwalList([...jadwalList, newJadwal]);
    }

    setIsAddOpen(false);
    resetForm();
  };

  const filteredJadwal =
    selectedPaket === "all"
      ? jadwalList
      : jadwalList.filter((j) => j.paketId === selectedPaket);

  // Group by paket
  const jadwalByPaket = filteredJadwal.reduce((acc, jadwal) => {
    if (!acc[jadwal.namaPaket]) {
      acc[jadwal.namaPaket] = [];
    }
    acc[jadwal.namaPaket].push(jadwal);
    return acc;
  }, {} as Record<string, Jadwal[]>);

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Kelola Jadwal Perjalanan
            </h1>
            <p className="text-gray-200">
              Atur itinerary dan jadwal keberangkatan untuk setiap paket
            </p>
          </div>

          <Dialog
            open={isAddOpen}
            onOpenChange={(open) => {
              setIsAddOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Jadwal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingJadwal ? "Edit Jadwal" : "Tambah Jadwal Baru"}
                </DialogTitle>
                <DialogDescription>
                  Isi detail jadwal perjalanan
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paket">Paket Umrah *</Label>
                  <Select
                    value={formData.paketId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paketId: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih paket" />
                    </SelectTrigger>
                    <SelectContent>
                      {paketUmrahList.map((paket) => (
                        <SelectItem key={paket.id} value={paket.id}>
                          {paket.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tanggal">Tanggal *</Label>
                    <Input
                      id="tanggal"
                      type="date"
                      value={formData.tanggal}
                      onChange={(e) =>
                        setFormData({ ...formData, tanggal: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waktu">Waktu *</Label>
                    <Input
                      id="waktu"
                      type="time"
                      value={formData.waktu}
                      onChange={(e) =>
                        setFormData({ ...formData, waktu: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aktivitas">Aktivitas *</Label>
                  <Input
                    id="aktivitas"
                    placeholder="Contoh: Keberangkatan dari Jakarta"
                    value={formData.aktivitas}
                    onChange={(e) =>
                      setFormData({ ...formData, aktivitas: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lokasi">Lokasi *</Label>
                  <Input
                    id="lokasi"
                    placeholder="Contoh: Bandara Soekarno-Hatta"
                    value={formData.lokasi}
                    onChange={(e) =>
                      setFormData({ ...formData, lokasi: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keterangan">Keterangan</Label>
                  <Textarea
                    id="keterangan"
                    placeholder="Informasi tambahan..."
                    value={formData.keterangan}
                    onChange={(e) =>
                      setFormData({ ...formData, keterangan: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1 border-2 border-[#f4c430] text-[#f4c430] hover:bg-[#f4c430] hover:text-black"
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold">
                    {editingJadwal ? "Update" : "Simpan"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label>Filter Paket:</Label>
              <Select value={selectedPaket} onValueChange={setSelectedPaket}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Paket</SelectItem>
                  {paketUmrahList.map((paket) => (
                    <SelectItem key={paket.id} value={paket.id}>
                      {paket.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jadwal List */}
        <div className="space-y-6">
          {Object.entries(jadwalByPaket).map(([namaPaket, jadwalItems]) => (
            <Card key={namaPaket}>
              <CardHeader>
                <CardTitle>{namaPaket}</CardTitle>
                <CardDescription>
                  Itinerary perjalanan untuk paket ini
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jadwalItems
                    .sort(
                      (a, b) =>
                        new Date(a.tanggal + " " + a.waktu).getTime() -
                        new Date(b.tanggal + " " + b.waktu).getTime()
                    )
                    .map((jadwal, index) => (
                      <div key={jadwal.id} className="flex gap-4">
                        {/* Timeline */}
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">
                            {index + 1}
                          </div>
                          {index < jadwalItems.length - 1 && (
                            <div className="w-0.5 h-full bg-[#f4c430]/30 my-2" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="bg-black/30 border border-[#f4c430]/20 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-lg mb-1">
                                  {jadwal.aktivitas}
                                </h4>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-200">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(jadwal.tanggal).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      }
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {jadwal.waktu}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {jadwal.lokasi}
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(jadwal)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                            {jadwal.keterangan && (
                              <p className="text-sm text-gray-200 mt-2">
                                {jadwal.keterangan}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {Object.keys(jadwalByPaket).length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-[#f4c430] mx-auto mb-4" />
                <p className="text-gray-200">
                  Belum ada jadwal untuk paket yang dipilih
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}