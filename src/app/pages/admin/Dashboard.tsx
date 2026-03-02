import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
import {
  Package,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  FileCheck,
  DollarSign,
  Send,
  AlertCircle,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { paketUmrahList, pendaftaranList } from "../../data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useNavigate } from "react-router-dom";

interface PendaftaranWithStatus {
  id: string;
  noPendaftaran: string;
  namaCustomer: string;
  namaPaket: string;
  tanggalDaftar: string;
  status: string;
  totalBayar: number;
  sudahBayar: number;
  sisaPembayaran: number;
}

export default function AdminDashboard() {
  const [selectedPendaftaran, setSelectedPendaftaran] = useState<PendaftaranWithStatus | null>(
    null
  );
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const [keterangan, setKeterangan] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const navigate = useNavigate();

  // Mock data with payment info
  const pendaftaranData: PendaftaranWithStatus[] = pendaftaranList.map((p) => ({
    ...p,
    sisaPembayaran: p.totalBayar - p.sudahBayar,
  }));

  const totalPendaftaran = pendaftaranData.length;
  const pendingVerifikasi = pendaftaranData.filter(
    (p) => p.status === "pending" || p.status === "verifikasi"
  ).length;
  const disetujui = pendaftaranData.filter((p) => p.status === "disetujui").length;
  const belumLunas = pendaftaranData.filter((p) => p.sudahBayar < p.totalBayar).length;
  const totalPaket = paketUmrahList.length;

  const handleUpdateStatus = () => {
    if (!selectedPendaftaran || !newStatus) return;

    // Simulate update - in real app, call API
    console.log("Update status:", {
      pendaftaran: selectedPendaftaran.noPendaftaran,
      newStatus,
      keterangan,
    });

    alert(
      `Status administrasi ${selectedPendaftaran.noPendaftaran} berhasil diubah menjadi "${newStatus}"`
    );

    setShowStatusDialog(false);
    setSelectedPendaftaran(null);
    setNewStatus("");
    setKeterangan("");
  };

  const handleSendReminder = () => {
    if (!selectedPendaftaran) return;

    // Simulate send reminder - in real app, call API to send notification/email/whatsapp
    console.log("Send reminder:", {
      pendaftaran: selectedPendaftaran.noPendaftaran,
      customer: selectedPendaftaran.namaCustomer,
      message: reminderMessage,
    });

    alert(
      `Reminder pelunasan berhasil dikirim ke ${selectedPendaftaran.namaCustomer} (${selectedPendaftaran.noPendaftaran})`
    );

    setShowReminderDialog(false);
    setSelectedPendaftaran(null);
    setReminderMessage("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "disetujui":
        return <Badge className="bg-green-100 text-green-700">Disetujui</Badge>;
      case "verifikasi":
        return <Badge className="bg-blue-100 text-blue-700">Verifikasi</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "ditolak":
        return <Badge className="bg-red-100 text-red-700">Ditolak</Badge>;
      case "lunas":
        return <Badge className="bg-emerald-100 text-emerald-700">Lunas</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">
            Kelola paket umrah, status administrasi, dan reminder pelunasan
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Paket</CardTitle>
              <Package className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paketUmrahList.length}</div>
              <p className="text-xs text-gray-500 mt-1">Paket aktif</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Pendaftaran
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPendaftaran}</div>
              <p className="text-xs text-gray-500 mt-1">Jamaah terdaftar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Verifikasi
              </CardTitle>
              <Clock className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingVerifikasi}</div>
              <p className="text-xs text-gray-500 mt-1">Perlu ditindaklanjuti</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Belum Lunas</CardTitle>
              <DollarSign className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{belumLunas}</div>
              <p className="text-xs text-gray-500 mt-1">Perlu reminder</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin/kelola-paket")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="w-5 h-5 text-[#f4c430]" />
                Kelola Paket
              </CardTitle>
              <CardDescription>
                Kelola paket umrah dengan detail lengkap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#f4c430]">{totalPaket}</div>
              <p className="text-sm text-gray-500 mt-1">Total paket tersedia</p>
            </CardContent>
          </Card>

          <Link to="/admin/jadwal">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-l-4 border-l-blue-500">
              <CardHeader>
                <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Kelola Jadwal</CardTitle>
                <CardDescription>
                  Atur jadwal keberangkatan dan itinerary perjalanan
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/admin/verifikasi-dokumen">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-l-4 border-l-purple-500">
              <CardHeader>
                <FileCheck className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Verifikasi Dokumen</CardTitle>
                <CardDescription>
                  Review dan verifikasi dokumen administrasi jamaah
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kelola Status Administrasi */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                    Kelola Status Administrasi
                  </CardTitle>
                  <CardDescription>
                    Ubah status pendaftaran: Verifikasi, Disetujui, atau Ditolak
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendaftaranData.slice(0, 5).map((daftar) => (
                  <Card
                    key={daftar.id}
                    className="bg-gray-50 hover:bg-gray-100 transition-colors border-l-4 border-l-[#f4c430]"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {daftar.namaCustomer}
                            </span>
                            {getStatusBadge(daftar.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {daftar.namaPaket} • No. {daftar.noPendaftaran}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Terdaftar: {daftar.tanggalDaftar}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-[#f4c430]/50 text-[#f4c430] hover:bg-[#f4c430]/10"
                          onClick={() => {
                            setSelectedPendaftaran(daftar);
                            setNewStatus(daftar.status);
                            setShowStatusDialog(true);
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Kelola Status
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {pendaftaranData.length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    Lihat Semua ({pendaftaranData.length})
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reminder Pelunasan */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-[#f4c430]" />
                    Reminder Pelunasan
                  </CardTitle>
                  <CardDescription>
                    Kirim notifikasi reminder ke jamaah yang belum lunas
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendaftaranData
                  .filter((p) => p.sudahBayar < p.totalBayar)
                  .slice(0, 5)
                  .map((daftar) => {
                    const progressPembayaran = (daftar.sudahBayar / daftar.totalBayar) * 100;

                    return (
                      <Card
                        key={daftar.id}
                        className="bg-gray-50 hover:bg-gray-100 transition-colors border-l-4 border-l-red-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">
                                  {daftar.namaCustomer}
                                </span>
                                <Badge className="bg-red-100 text-red-700 text-xs">
                                  Belum Lunas
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {daftar.namaPaket} • No. {daftar.noPendaftaran}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Progress Pembayaran</span>
                              <span className="font-medium text-gray-900">
                                {progressPembayaran.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                                style={{ width: `${progressPembayaran}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Sudah Bayar:</span>
                              <span className="font-medium text-green-600">
                                Rp {daftar.sudahBayar.toLocaleString("id-ID")}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Sisa:</span>
                              <span className="font-bold text-red-600">
                                Rp {daftar.sisaPembayaran.toLocaleString("id-ID")}
                              </span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
                            onClick={() => {
                              setSelectedPendaftaran(daftar);
                              setReminderMessage(
                                `Yth. ${daftar.namaCustomer},\n\nKami ingatkan bahwa pembayaran untuk paket ${daftar.namaPaket} (${daftar.noPendaftaran}) masih memiliki sisa sebesar Rp ${daftar.sisaPembayaran.toLocaleString("id-ID")}.\n\nMohon segera melakukan pelunasan agar proses administrasi dapat berjalan lancar.\n\nTerima kasih.`
                              );
                              setShowReminderDialog(true);
                            }}
                          >
                            <Send className="w-4 h-4 mr-1" />
                            Kirim Reminder
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>

              {pendaftaranData.filter((p) => p.sudahBayar < p.totalBayar).length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    Lihat Semua (
                    {pendaftaranData.filter((p) => p.sudahBayar < p.totalBayar).length})
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dialog Kelola Status */}
        <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                Kelola Status Administrasi
              </DialogTitle>
              <DialogDescription>
                Ubah status pendaftaran jamaah berdasarkan verifikasi administrasi
              </DialogDescription>
            </DialogHeader>

            {selectedPendaftaran && (
              <div className="space-y-4 py-4">
                {/* Pendaftaran Info */}
                <div className="p-3 bg-gradient-to-br from-[#f4c430]/10 to-[#ffd700]/10 rounded-lg border border-[#f4c430]/30">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {selectedPendaftaran.namaCustomer}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedPendaftaran.namaPaket} • No. {selectedPendaftaran.noPendaftaran}
                  </p>
                  <div className="mt-2">{getStatusBadge(selectedPendaftaran.status)}</div>
                </div>

                {/* Status Selector */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status Administrasi *</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status administrasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verifikasi">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-600" />
                          <span>Verifikasi</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="disetujui">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Disetujui</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ditolak">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Ditolak</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Keterangan */}
                <div className="space-y-2">
                  <Label htmlFor="keterangan">
                    Keterangan {newStatus === "ditolak" && "*"}
                  </Label>
                  <Textarea
                    id="keterangan"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    placeholder={
                      newStatus === "ditolak"
                        ? "Jelaskan alasan penolakan..."
                        : "Keterangan tambahan (opsional)"
                    }
                    className="min-h-[100px]"
                  />
                </div>

                {/* Warning */}
                {newStatus === "ditolak" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800">
                      Pendaftaran yang ditolak akan memberitahu customer dan memerlukan perbaikan
                      data.
                    </p>
                  </div>
                )}

                {newStatus === "disetujui" && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-green-800">
                      Pendaftaran yang disetujui akan mengaktifkan semua fitur untuk customer.
                    </p>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowStatusDialog(false);
                  setSelectedPendaftaran(null);
                  setNewStatus("");
                  setKeterangan("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={handleUpdateStatus}
                disabled={!newStatus || (newStatus === "ditolak" && !keterangan.trim())}
                className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog Reminder Pelunasan */}
        <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#f4c430]" />
                Kirim Reminder Pelunasan
              </DialogTitle>
              <DialogDescription>
                Kirim notifikasi reminder ke customer yang belum melakukan pelunasan
              </DialogDescription>
            </DialogHeader>

            {selectedPendaftaran && (
              <div className="space-y-4 py-4">
                {/* Customer Info */}
                <div className="p-3 bg-gradient-to-br from-[#f4c430]/10 to-[#ffd700]/10 rounded-lg border border-[#f4c430]/30">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {selectedPendaftaran.namaCustomer}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedPendaftaran.namaPaket} • No. {selectedPendaftaran.noPendaftaran}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sisa Pembayaran:</span>
                    <span className="font-bold text-red-600">
                      Rp {selectedPendaftaran.sisaPembayaran.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Reminder Message */}
                <div className="space-y-2">
                  <Label htmlFor="reminder-message">Pesan Reminder *</Label>
                  <Textarea
                    id="reminder-message"
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    placeholder="Tulis pesan reminder untuk customer..."
                    className="min-h-[150px]"
                  />
                </div>

                {/* Info */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2 text-sm">
                  <Send className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">
                    Reminder akan dikirim melalui notifikasi dalam aplikasi, email, dan WhatsApp
                    (jika tersedia).
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReminderDialog(false);
                  setSelectedPendaftaran(null);
                  setReminderMessage("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={handleSendReminder}
                disabled={!reminderMessage.trim()}
                className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:opacity-90"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}