import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Plus, Edit, Trash2, Calendar, Hotel, Plane, Users } from "lucide-react";
import { paketUmrahList, PaketUmrah } from "../../data/mockData";

export default function ManagePaket() {
  const [paketList, setPaketList] = useState<PaketUmrah[]>(paketUmrahList);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPaket, setEditingPaket] = useState<PaketUmrah | null>(null);

  const [formData, setFormData] = useState({
    nama: "",
    durasi: "",
    harga: 0,
    keberangkatan: "",
    hotel: "",
    pesawat: "",
    kuota: 0,
    tersedia: 0,
  });

  const resetForm = () => {
    setFormData({
      nama: "",
      durasi: "",
      harga: 0,
      keberangkatan: "",
      hotel: "",
      pesawat: "",
      kuota: 0,
      tersedia: 0,
    });
    setEditingPaket(null);
  };

  const handleEdit = (paket: PaketUmrah) => {
    setEditingPaket(paket);
    setFormData({
      nama: paket.nama,
      durasi: paket.durasi,
      harga: paket.harga,
      keberangkatan: paket.keberangkatan,
      hotel: paket.hotel,
      pesawat: paket.pesawat,
      kuota: paket.kuota,
      tersedia: paket.tersedia,
    });
    setIsAddOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      setPaketList(paketList.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPaket) {
      // Update existing
      setPaketList(
        paketList.map((p) =>
          p.id === editingPaket.id
            ? { ...editingPaket, ...formData }
            : p
        )
      );
    } else {
      // Add new
      const newPaket: PaketUmrah = {
        id: String(Date.now()),
        ...formData,
        fasilitas: [
          "Tiket pesawat PP",
          "Hotel",
          "Makan",
          "Tour guide",
          "Visa umrah",
        ],
      };
      setPaketList([...paketList, newPaket]);
    }

    setIsAddOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kelola Paket Umrah
            </h1>
            <p className="text-gray-600">
              Tambah, edit, dan hapus paket umrah yang tersedia
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={(open) => {
            setIsAddOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPaket ? "Edit Paket" : "Tambah Paket Baru"}
                </DialogTitle>
                <DialogDescription>
                  Isi informasi paket umrah dengan lengkap
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="nama">Nama Paket *</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({ ...formData, nama: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="durasi">Durasi *</Label>
                    <Input
                      id="durasi"
                      placeholder="9 Hari 7 Malam"
                      value={formData.durasi}
                      onChange={(e) =>
                        setFormData({ ...formData, durasi: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="harga">Harga (Rp) *</Label>
                    <Input
                      id="harga"
                      type="number"
                      value={formData.harga}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          harga: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keberangkatan">Tanggal Keberangkatan *</Label>
                    <Input
                      id="keberangkatan"
                      placeholder="15 Maret 2026"
                      value={formData.keberangkatan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          keberangkatan: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hotel">Hotel *</Label>
                    <Input
                      id="hotel"
                      value={formData.hotel}
                      onChange={(e) =>
                        setFormData({ ...formData, hotel: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pesawat">Maskapai *</Label>
                    <Input
                      id="pesawat"
                      value={formData.pesawat}
                      onChange={(e) =>
                        setFormData({ ...formData, pesawat: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kuota">Kuota *</Label>
                    <Input
                      id="kuota"
                      type="number"
                      value={formData.kuota}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kuota: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tersedia">Seat Tersedia *</Label>
                    <Input
                      id="tersedia"
                      type="number"
                      value={formData.tersedia}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tersedia: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
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
                    {editingPaket ? "Update" : "Simpan"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Paket
              </CardTitle>
              <Plus className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paketList.length}</div>
              <p className="text-xs text-gray-500 mt-1">Paket aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Kuota
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {paketList.reduce((acc, curr) => acc + curr.kuota, 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Jamaah</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Seat Tersedia
              </CardTitle>
              <Users className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {paketList.reduce((acc, curr) => acc + curr.tersedia, 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Tersedia</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Seat Terisi
              </CardTitle>
              <Users className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {paketList.reduce(
                  (acc, curr) => acc + (curr.kuota - curr.tersedia),
                  0
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Terdaftar</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Paket Umrah</CardTitle>
            <CardDescription>
              Kelola semua paket umrah yang tersedia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Paket</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Keberangkatan</TableHead>
                  <TableHead>Kuota</TableHead>
                  <TableHead>Tersedia</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paketList.map((paket) => (
                  <TableRow key={paket.id}>
                    <TableCell className="font-medium">{paket.nama}</TableCell>
                    <TableCell>{paket.durasi}</TableCell>
                    <TableCell>
                      Rp {(paket.harga / 1000000).toFixed(1)} Jt
                    </TableCell>
                    <TableCell>{paket.keberangkatan}</TableCell>
                    <TableCell>{paket.kuota}</TableCell>
                    <TableCell>
                      <Badge
                        variant={paket.tersedia > 10 ? "default" : "destructive"}
                      >
                        {paket.tersedia}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(paket)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(paket.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}