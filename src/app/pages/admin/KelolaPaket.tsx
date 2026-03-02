import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Plane, 
  Hotel, 
  Bus,
  Calendar,
  MapPin,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";

interface TransportasiData {
  id: string;
  jenis: "pesawat" | "bus";
  // Pesawat
  maskapai?: string;
  nomorPenerbangan?: string;
  jumlahSeat?: number;
  waktuBerangkat?: string;
  waktuDatang?: string;
  // Bus/Taksi
  penyedia?: string;
  nomorPolisi?: string;
  kapasitas?: number;
}

interface AkomodasiData {
  id: string;
  lokasi: "makkah" | "madinah";
  namaHotel: string;
  alamatHotel: string;
  jumlahKamar: number;
  tipeKamar: string;
}

interface ItenaryData {
  id: string;
  urutan: number;
  tanggalKegiatan: string;
  namaKegiatan: string;
  lokasi: string;
  deskripsi: string;
  waktuMulai: string;
  waktuSelesai: string;
}

interface KeberangkatanData {
  id: string;
  waktuKeberangkatan: string;
  tanggalSelesai: string;
  kuotaTersedia: number;
  kuotaTerisi: number;
  statusKeberangkatan: string;
  biayaJamaah: string;
  biayaJamaahAnak: string;
  transportasi: TransportasiData[];
  akomodasi: AkomodasiData[];
  itenary: ItenaryData[];
}

interface PaketData {
  paket_id: string;
  nama_paket: string;
  deskripsi: string;
  harga: string;
  durasi: string;
  keberangkatan: KeberangkatanData[];
}

export default function KelolaPaket() {
  const [showDialog, setShowDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState<PaketData | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Sections expand state
  const [expandTransportasi, setExpandTransportasi] = useState(true);
  const [expandAkomodasi, setExpandAkomodasi] = useState(true);
  const [expandItenary, setExpandItenary] = useState(true);

  // Mock data
  const [paketList, setPaketList] = useState<PaketData[]>([
    {
      paket_id: "PKT001",
      nama_paket: "Paket Umrah Hemat 9 Hari",
      deskripsi: "Paket umrah ekonomis dengan fasilitas lengkap",
      harga: "25000000",
      durasi: "9 Hari",
      keberangkatan: []
    },
    {
      paket_id: "PKT002",
      nama_paket: "Paket Umrah Premium 12 Hari",
      deskripsi: "Paket umrah premium dengan hotel bintang 5",
      harga: "35000000",
      durasi: "12 Hari",
      keberangkatan: []
    }
  ]);

  // Form state untuk paket dasar
  const [formData, setFormData] = useState({
    nama_paket: "",
    deskripsi: "",
    harga: "",
    durasi: ""
  });

  // Form state untuk keberangkatan detail
  const [keberangkatanData, setKeberangkatanData] = useState<KeberangkatanData>({
    id: "",
    waktuKeberangkatan: "",
    tanggalSelesai: "",
    kuotaTersedia: 40,
    kuotaTerisi: 0,
    statusKeberangkatan: "aktif",
    biayaJamaah: "",
    biayaJamaahAnak: "",
    transportasi: [],
    akomodasi: [],
    itenary: []
  });

  const handleOpenDialog = (paket?: PaketData) => {
    if (paket) {
      setEditMode(true);
      setFormData({
        nama_paket: paket.nama_paket,
        deskripsi: paket.deskripsi,
        harga: paket.harga,
        durasi: paket.durasi
      });
      setSelectedPaket(paket);
    } else {
      setEditMode(false);
      setFormData({
        nama_paket: "",
        deskripsi: "",
        harga: "",
        durasi: ""
      });
      setSelectedPaket(null);
    }
    setShowDialog(true);
  };

  const handleOpenDetailDialog = (paket: PaketData) => {
    setSelectedPaket(paket);
    // Initialize dengan data keberangkatan pertama jika ada
    if (paket.keberangkatan.length > 0) {
      setKeberangkatanData(paket.keberangkatan[0]);
    } else {
      setKeberangkatanData({
        id: Date.now().toString(),
        waktuKeberangkatan: "",
        tanggalSelesai: "",
        kuotaTersedia: 40,
        kuotaTerisi: 0,
        statusKeberangkatan: "aktif",
        biayaJamaah: paket.harga,
        biayaJamaahAnak: (parseInt(paket.harga) * 0.8).toString(),
        transportasi: [],
        akomodasi: [],
        itenary: []
      });
    }
    setShowDetailDialog(true);
  };

  const handleSubmitPaket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode && selectedPaket) {
      setPaketList(paketList.map(p => 
        p.paket_id === selectedPaket.paket_id 
          ? { ...p, ...formData }
          : p
      ));
      alert("Paket berhasil diupdate!");
    } else {
      const newPaket: PaketData = {
        paket_id: `PKT${(paketList.length + 1).toString().padStart(3, '0')}`,
        ...formData,
        keberangkatan: []
      };
      setPaketList([...paketList, newPaket]);
      alert("Paket berhasil ditambahkan!");
    }
    
    setShowDialog(false);
  };

  const handleDeletePaket = (paketId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      setPaketList(paketList.filter(p => p.paket_id !== paketId));
      alert("Paket berhasil dihapus!");
    }
  };

  // Transportasi handlers
  const handleAddTransportasi = () => {
    const newTransportasi: TransportasiData = {
      id: Date.now().toString(),
      jenis: "pesawat",
      maskapai: "",
      nomorPenerbangan: "",
      jumlahSeat: 0,
      waktuBerangkat: "",
      waktuDatang: ""
    };
    setKeberangkatanData({
      ...keberangkatanData,
      transportasi: [...keberangkatanData.transportasi, newTransportasi]
    });
  };

  const handleUpdateTransportasi = (id: string, field: string, value: any) => {
    setKeberangkatanData({
      ...keberangkatanData,
      transportasi: keberangkatanData.transportasi.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const handleDeleteTransportasi = (id: string) => {
    setKeberangkatanData({
      ...keberangkatanData,
      transportasi: keberangkatanData.transportasi.filter(t => t.id !== id)
    });
  };

  // Akomodasi handlers
  const handleAddAkomodasi = () => {
    const newAkomodasi: AkomodasiData = {
      id: Date.now().toString(),
      lokasi: "makkah",
      namaHotel: "",
      alamatHotel: "",
      jumlahKamar: 0,
      tipeKamar: ""
    };
    setKeberangkatanData({
      ...keberangkatanData,
      akomodasi: [...keberangkatanData.akomodasi, newAkomodasi]
    });
  };

  const handleUpdateAkomodasi = (id: string, field: string, value: any) => {
    setKeberangkatanData({
      ...keberangkatanData,
      akomodasi: keberangkatanData.akomodasi.map(a =>
        a.id === id ? { ...a, [field]: value } : a
      )
    });
  };

  const handleDeleteAkomodasi = (id: string) => {
    setKeberangkatanData({
      ...keberangkatanData,
      akomodasi: keberangkatanData.akomodasi.filter(a => a.id !== id)
    });
  };

  // Itenary handlers
  const handleAddItenary = () => {
    const newItenary: ItenaryData = {
      id: Date.now().toString(),
      urutan: keberangkatanData.itenary.length + 1,
      tanggalKegiatan: "",
      namaKegiatan: "",
      lokasi: "",
      deskripsi: "",
      waktuMulai: "",
      waktuSelesai: ""
    };
    setKeberangkatanData({
      ...keberangkatanData,
      itenary: [...keberangkatanData.itenary, newItenary]
    });
  };

  const handleUpdateItenary = (id: string, field: string, value: any) => {
    setKeberangkatanData({
      ...keberangkatanData,
      itenary: keberangkatanData.itenary.map(i =>
        i.id === id ? { ...i, [field]: value } : i
      )
    });
  };

  const handleDeleteItenary = (id: string) => {
    setKeberangkatanData({
      ...keberangkatanData,
      itenary: keberangkatanData.itenary.filter(i => i.id !== id)
    });
  };

  const handleSaveDetail = () => {
    if (!selectedPaket) return;

    // Update paket dengan detail keberangkatan
    setPaketList(paketList.map(p => 
      p.paket_id === selectedPaket.paket_id 
        ? { ...p, keberangkatan: [keberangkatanData] }
        : p
    ));

    alert("Detail paket berhasil disimpan!");
    setShowDetailDialog(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Paket Umrah</h1>
          <p className="text-gray-600 mt-1">
            Kelola paket umrah dengan detail transportasi, akomodasi, dan itinerary
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Paket
        </Button>
      </div>

      {/* Paket List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paketList.map((paket) => (
          <Card key={paket.paket_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{paket.nama_paket}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    ID: {paket.paket_id}
                  </CardDescription>
                </div>
                <Package className="w-5 h-5 text-[#f4c430]" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {paket.deskripsi}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga:</span>
                  <span className="font-bold text-[#f4c430]">
                    Rp {parseInt(paket.harga).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durasi:</span>
                  <span className="font-medium">{paket.durasi}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status Detail:</span>
                  <Badge
                    variant={paket.keberangkatan.length > 0 ? "default" : "secondary"}
                    className={
                      paket.keberangkatan.length > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {paket.keberangkatan.length > 0 ? "Lengkap" : "Belum Diisi"}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(paket)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDetailDialog(paket)}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Package className="w-3 h-3 mr-1" />
                  Detail
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeletePaket(paket.paket_id)}
                className="w-full text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Hapus Paket
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Form Paket Dasar */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Edit Paket Umrah" : "Tambah Paket Umrah Baru"}
            </DialogTitle>
            <DialogDescription>
              Isi data dasar paket umrah. Detail transportasi dan akomodasi dapat diisi setelah paket dibuat.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPaket} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama_paket">Nama Paket *</Label>
              <Input
                id="nama_paket"
                placeholder="Contoh: Paket Umrah Hemat 9 Hari"
                value={formData.nama_paket}
                onChange={(e) => setFormData({ ...formData, nama_paket: e.target.value })}
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi Paket *</Label>
              <Textarea
                id="deskripsi"
                placeholder="Jelaskan keunggulan dan fasilitas paket ini..."
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="harga">Harga (Rp) *</Label>
                <Input
                  id="harga"
                  type="number"
                  placeholder="25000000"
                  value={formData.harga}
                  onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="durasi">Durasi *</Label>
                <Input
                  id="durasi"
                  placeholder="9 Hari"
                  value={formData.durasi}
                  onChange={(e) => setFormData({ ...formData, durasi: e.target.value })}
                  required
                  maxLength={50}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                {editMode ? "Update Paket" : "Simpan Paket"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Detail Paket (Transportasi, Akomodasi, Itenary) */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Detail Paket: {selectedPaket?.nama_paket}
            </DialogTitle>
            <DialogDescription>
              Form Inventaris dan Logistik - Lengkapi data transportasi, akomodasi, dan itinerary
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Data Keberangkatan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f4c430]" />
                  Data Keberangkatan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tanggal Keberangkatan *</Label>
                    <Input
                      type="datetime-local"
                      value={keberangkatanData.waktuKeberangkatan}
                      onChange={(e) =>
                        setKeberangkatanData({
                          ...keberangkatanData,
                          waktuKeberangkatan: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tanggal Selesai *</Label>
                    <Input
                      type="datetime-local"
                      value={keberangkatanData.tanggalSelesai}
                      onChange={(e) =>
                        setKeberangkatanData({
                          ...keberangkatanData,
                          tanggalSelesai: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Kuota Tersedia</Label>
                    <Input
                      type="number"
                      value={keberangkatanData.kuotaTersedia}
                      onChange={(e) =>
                        setKeberangkatanData({
                          ...keberangkatanData,
                          kuotaTersedia: parseInt(e.target.value)
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Biaya Jamaah Dewasa (Rp)</Label>
                    <Input
                      type="number"
                      value={keberangkatanData.biayaJamaah}
                      onChange={(e) =>
                        setKeberangkatanData({
                          ...keberangkatanData,
                          biayaJamaah: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Biaya Jamaah Anak (Rp)</Label>
                    <Input
                      type="number"
                      value={keberangkatanData.biayaJamaahAnak}
                      onChange={(e) =>
                        setKeberangkatanData({
                          ...keberangkatanData,
                          biayaJamaahAnak: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* A. TRANSPORTASI */}
            <Card>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandTransportasi(!expandTransportasi)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#f4c430]" />
                    A. TRANSPORTASI
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    {expandTransportasi ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>
              {expandTransportasi && (
                <CardContent className="space-y-4">
                  {keberangkatanData.transportasi.map((transport, index) => (
                    <Card key={transport.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">
                            {transport.jenis === "pesawat" ? "🛫" : "🚌"} Transportasi {index + 1}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTransportasi(transport.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Jenis Transportasi *</Label>
                          <Select
                            value={transport.jenis}
                            onValueChange={(value) =>
                              handleUpdateTransportasi(transport.id, "jenis", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pesawat">✈️ Pesawat</SelectItem>
                              <SelectItem value="bus">🚌 Bus/Taksi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {transport.jenis === "pesawat" ? (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Nama Maskapai *</Label>
                                <Input
                                  placeholder="Garuda Indonesia"
                                  value={transport.maskapai || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(transport.id, "maskapai", e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Nomor Penerbangan *</Label>
                                <Input
                                  placeholder="GA-123"
                                  value={transport.nomorPenerbangan || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "nomorPenerbangan",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Jumlah Seat *</Label>
                                <Input
                                  type="number"
                                  placeholder="40"
                                  value={transport.jumlahSeat || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "jumlahSeat",
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Waktu Keberangkatan *</Label>
                                <Input
                                  type="datetime-local"
                                  value={transport.waktuBerangkat || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "waktuBerangkat",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Waktu Kedatangan *</Label>
                                <Input
                                  type="datetime-local"
                                  value={transport.waktuDatang || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "waktuDatang",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Penyedia/Perusahaan *</Label>
                                <Input
                                  placeholder="PT. Transport Sejahtera"
                                  value={transport.penyedia || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(transport.id, "penyedia", e.target.value)
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Nomor Polisi *</Label>
                                <Input
                                  placeholder="B 1234 XYZ"
                                  value={transport.nomorPolisi || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "nomorPolisi",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Kapasitas Penumpang *</Label>
                                <Input
                                  type="number"
                                  placeholder="45"
                                  value={transport.kapasitas || ""}
                                  onChange={(e) =>
                                    handleUpdateTransportasi(
                                      transport.id,
                                      "kapasitas",
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={handleAddTransportasi}
                    className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Transportasi
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* B. AKOMODASI */}
            <Card>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandAkomodasi(!expandAkomodasi)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-[#f4c430]" />
                    B. AKOMODASI
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    {expandAkomodasi ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>
              {expandAkomodasi && (
                <CardContent className="space-y-4">
                  {keberangkatanData.akomodasi.map((hotel, index) => (
                    <Card key={hotel.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">
                            🏨 Hotel {index + 1} - {hotel.lokasi === "makkah" ? "Makkah" : "Madinah"}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAkomodasi(hotel.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Lokasi Hotel *</Label>
                          <Select
                            value={hotel.lokasi}
                            onValueChange={(value) =>
                              handleUpdateAkomodasi(hotel.id, "lokasi", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="makkah">🕋 Makkah</SelectItem>
                              <SelectItem value="madinah">🕌 Madinah</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nama Hotel *</Label>
                            <Input
                              placeholder="Hotel Safwah Towers"
                              value={hotel.namaHotel}
                              onChange={(e) =>
                                handleUpdateAkomodasi(hotel.id, "namaHotel", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Alamat Hotel *</Label>
                            <Input
                              placeholder="Dekat Masjidil Haram"
                              value={hotel.alamatHotel}
                              onChange={(e) =>
                                handleUpdateAkomodasi(hotel.id, "alamatHotel", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Jumlah Kamar *</Label>
                            <Input
                              type="number"
                              placeholder="20"
                              value={hotel.jumlahKamar}
                              onChange={(e) =>
                                handleUpdateAkomodasi(
                                  hotel.id,
                                  "jumlahKamar",
                                  parseInt(e.target.value)
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tipe Kamar *</Label>
                            <Select
                              value={hotel.tipeKamar}
                              onValueChange={(value) =>
                                handleUpdateAkomodasi(hotel.id, "tipeKamar", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe kamar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="double">Double (2 orang)</SelectItem>
                                <SelectItem value="triple">Triple (3 orang)</SelectItem>
                                <SelectItem value="quad">Quad (4 orang)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={handleAddAkomodasi}
                    className="w-full border-dashed border-2 border-green-300 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Akomodasi
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* C. ITINERARY */}
            <Card>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandItenary(!expandItenary)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#f4c430]" />
                    C. ITINERARY
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    {expandItenary ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
              </CardHeader>
              {expandItenary && (
                <CardContent className="space-y-4">
                  {keberangkatanData.itenary.map((item, index) => (
                    <Card key={item.id} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">
                            📍 Hari {item.urutan} - {item.namaKegiatan || "Kegiatan"}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItenary(item.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Urutan Hari *</Label>
                            <Input
                              type="number"
                              value={item.urutan}
                              onChange={(e) =>
                                handleUpdateItenary(item.id, "urutan", parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tanggal Kegiatan *</Label>
                            <Input
                              type="date"
                              value={item.tanggalKegiatan}
                              onChange={(e) =>
                                handleUpdateItenary(item.id, "tanggalKegiatan", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Lokasi *</Label>
                            <Input
                              placeholder="Masjidil Haram"
                              value={item.lokasi}
                              onChange={(e) =>
                                handleUpdateItenary(item.id, "lokasi", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Nama Kegiatan *</Label>
                          <Input
                            placeholder="Tawaf dan Sa'i"
                            value={item.namaKegiatan}
                            onChange={(e) =>
                              handleUpdateItenary(item.id, "namaKegiatan", e.target.value)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Waktu Mulai</Label>
                            <Input
                              type="time"
                              value={item.waktuMulai}
                              onChange={(e) =>
                                handleUpdateItenary(item.id, "waktuMulai", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Waktu Selesai</Label>
                            <Input
                              type="time"
                              value={item.waktuSelesai}
                              onChange={(e) =>
                                handleUpdateItenary(item.id, "waktuSelesai", e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Deskripsi Kegiatan</Label>
                          <Textarea
                            placeholder="Detail kegiatan yang akan dilakukan..."
                            value={item.deskripsi}
                            rows={3}
                            onChange={(e) =>
                              handleUpdateItenary(item.id, "deskripsi", e.target.value)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    onClick={handleAddItenary}
                    className="w-full border-dashed border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Itinerary
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* Alert Info */}
            <Alert>
              <AlertDescription className="text-sm">
                💡 <strong>Tips:</strong> Pastikan semua data telah diisi dengan lengkap dan benar. 
                Data ini akan ditampilkan kepada jamaah yang mendaftar.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowDetailDialog(false)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleSaveDetail}
                className="flex-1 bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan Semua Detail
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
