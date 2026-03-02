import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { CheckCircle, Clock, FileText, CreditCard, Users, Calendar, MapPin, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import PaymentGateway, { PaymentResult } from "../../components/PaymentGateway";

export default function StatusPendaftaran() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPendaftaran, setSelectedPendaftaran] = useState<any>(null);

  // Mock data pendaftaran
  const pendaftaranData = {
    id: "1",
    noPendaftaran: "UM2026001",
    namaPaket: "Paket Umrah Premium 14 Hari",
    tanggalDaftar: "15 Feb 2024",
    tanggalKeberangkatan: "15 Maret 2024",
    tanggalKepulangan: "28 Maret 2024",
    totalBayar: 60000000,
    sudahBayar: 18000000, // DP 30%
    statusPendaftaran: "disetujui", // pending, verifikasi, disetujui, ditolak, lunas
    statusAdministrasi: "lengkap", // belum-lengkap, sebagian, lengkap, diverifikasi
    jamaahList: [
      {
        id: "j1",
        namaLengkap: "Ahmad Fauzi",
        jenisKelamin: "Laki-laki",
        noKTP: "3174012345678901",
        statusPembayaran: "dp", // dp, cicil-1, cicil-2, lunas
        jumlahDibayar: 6000000,
        totalBiaya: 30000000,
        kelengkapanDokumen: {
          ktp: true,
          kk: true,
          passport: true,
          foto: true,
          vaksin: true,
        },
        statusDokumen: "diverifikasi", // belum-upload, menunggu-verifikasi, diverifikasi, ditolak
      },
      {
        id: "j2",
        namaLengkap: "Siti Nurhaliza",
        jenisKelamin: "Perempuan",
        noKTP: "3174012345678902",
        statusPembayaran: "dp",
        jumlahDibayar: 6000000,
        totalBiaya: 30000000,
        kelengkapanDokumen: {
          ktp: true,
          kk: true,
          passport: true,
          foto: false,
          vaksin: false,
        },
        statusDokumen: "menunggu-verifikasi",
      },
      {
        id: "j3",
        namaLengkap: "Muhammad Rizki",
        jenisKelamin: "Laki-laki",
        noKTP: "3174012345678903",
        statusPembayaran: "dp",
        jumlahDibayar: 6000000,
        totalBiaya: 30000000,
        kelengkapanDokumen: {
          ktp: true,
          kk: false,
          passport: false,
          foto: false,
          vaksin: false,
        },
        statusDokumen: "belum-upload",
      },
    ],
  };

  const handlePaymentSuccess = (paymentData: PaymentResult) => {
    console.log("Payment successful:", paymentData);
    alert(`Pembayaran berhasil! Transaction ID: ${paymentData.transactionId}`);
  };

  const openPaymentGateway = () => {
    setSelectedPendaftaran(pendaftaranData);
    setPaymentModalOpen(true);
  };

  // Calculate total dokumen stats
  const totalDokumenAllJamaah = pendaftaranData.jamaahList.length * 5; // 5 dokumen per jamaah
  const totalDokumenLengkap = pendaftaranData.jamaahList.reduce((sum, jamaah) => {
    return sum + Object.values(jamaah.kelengkapanDokumen).filter(Boolean).length;
  }, 0);

  const progressAdministrasi = (totalDokumenLengkap / totalDokumenAllJamaah) * 100;

  // Status timeline
  const statusTimeline = [
    {
      status: "Pendaftaran",
      date: "15 Feb 2024",
      completed: true,
      active: false,
    },
    {
      status: "Pembayaran DP",
      date: "15 Feb 2024",
      completed: true,
      active: false,
    },
    {
      status: "Verifikasi Administrasi",
      date: "Sedang Proses",
      completed: false,
      active: true,
    },
    {
      status: "Pelunasan",
      date: "Menunggu",
      completed: false,
      active: false,
    },
    {
      status: "Keberangkatan",
      date: "15 Mar 2024",
      completed: false,
      active: false,
    },
  ];

  const getStatusDokumenBadge = (status: string) => {
    switch (status) {
      case "diverifikasi":
        return <Badge className="bg-green-100 text-green-700 text-xs">✓ Diverifikasi</Badge>;
      case "menunggu-verifikasi":
        return <Badge className="bg-blue-100 text-blue-700 text-xs">⏳ Verifikasi</Badge>;
      case "ditolak":
        return <Badge className="bg-red-100 text-red-700 text-xs">✗ Ditolak</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 text-xs">⚠ Belum Upload</Badge>;
    }
  };

  const getStatusPembayaranBadge = (status: string) => {
    switch (status) {
      case "lunas":
        return <Badge className="bg-emerald-100 text-emerald-700">Lunas</Badge>;
      case "cicil-2":
        return <Badge className="bg-blue-100 text-blue-700">Cicilan 2</Badge>;
      case "cicil-1":
        return <Badge className="bg-amber-100 text-amber-700">Cicilan 1</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-700">DP</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Status Pendaftaran
          </h1>
          <p className="text-gray-600">
            Pantau status pendaftaran, administrasi, dan pembayaran keberangkatan Anda
          </p>
        </div>

        {/* Informasi Keberangkatan */}
        <Card className="mb-6 border-l-4 border-l-[#f4c430]">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-xl">
                    {pendaftaranData.namaPaket}
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-700">
                    {pendaftaranData.statusPendaftaran}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-4 flex-wrap">
                  <span>No. {pendaftaranData.noPendaftaran}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {pendaftaranData.jamaahList.length} Jamaah
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {pendaftaranData.tanggalKeberangkatan}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Makkah - Madinah
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. STATUS PENDAFTARAN */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                  Status Pendaftaran
                </CardTitle>
                <CardDescription>
                  Timeline proses pendaftaran hingga keberangkatan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline */}
                  <div className="space-y-6">
                    {statusTimeline.map((item, index) => (
                      <div key={index} className="relative flex items-start gap-4">
                        {/* Line connector */}
                        {index < statusTimeline.length - 1 && (
                          <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200" />
                        )}

                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            item.completed
                              ? "bg-green-100"
                              : item.active
                              ? "bg-[#f4c430]"
                              : "bg-gray-100"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : item.active ? (
                            <Clock className="w-5 h-5 text-black" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <h4
                            className={`font-semibold ${
                              item.completed || item.active
                                ? "text-gray-900"
                                : "text-gray-500"
                            }`}
                          >
                            {item.status}
                          </h4>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>

                        {/* Status badge */}
                        {item.completed && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            Selesai
                          </Badge>
                        )}
                        {item.active && (
                          <Badge className="bg-[#f4c430] text-black text-xs">
                            Sedang Proses
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2. STATUS ADMINISTRASI */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#f4c430]" />
                      Status Administrasi
                    </CardTitle>
                    <CardDescription>
                      Kelengkapan dokumen untuk {pendaftaranData.jamaahList.length} jamaah
                    </CardDescription>
                  </div>
                  <Badge className="bg-[#f4c430] text-black">
                    {totalDokumenLengkap}/{totalDokumenAllJamaah} Dokumen
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Progress */}
                <div className="p-4 bg-gradient-to-br from-[#f4c430]/10 to-[#ffd700]/10 rounded-lg border border-[#f4c430]/30">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">Total Kelengkapan</span>
                    <span className="font-bold text-gray-900">
                      {progressAdministrasi.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progressAdministrasi} className="h-3" />
                </div>

                {/* Per Jamaah */}
                <div className="space-y-3">
                  {pendaftaranData.jamaahList.map((jamaah, idx) => {
                    const dokumenLengkap = Object.values(jamaah.kelengkapanDokumen).filter(
                      Boolean
                    ).length;
                    const totalDokumen = Object.keys(jamaah.kelengkapanDokumen).length;
                    const progress = (dokumenLengkap / totalDokumen) * 100;

                    return (
                      <Card key={jamaah.id} className="bg-gray-50">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                                {idx + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold">{jamaah.namaLengkap}</h4>
                                <p className="text-xs text-gray-600">
                                  {jamaah.jenisKelamin} • KTP: {jamaah.noKTP}
                                </p>
                              </div>
                            </div>
                            {getStatusDokumenBadge(jamaah.statusDokumen)}
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Kelengkapan Dokumen</span>
                              <span className="font-medium">
                                {dokumenLengkap}/{totalDokumen} • {progress.toFixed(0)}%
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          {/* Dokumen Icons */}
                          <div className="grid grid-cols-5 gap-2">
                            {Object.entries(jamaah.kelengkapanDokumen).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div
                                  className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                                    value ? "bg-green-100" : "bg-gray-200"
                                  }`}
                                >
                                  {value ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 uppercase">{key}</p>
                              </div>
                            ))}
                          </div>

                          {/* Warning if incomplete */}
                          {progress < 100 && (
                            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs flex items-center gap-2">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span className="text-amber-800">
                                Segera lengkapi dokumen yang belum diupload
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3. STATUS PEMBAYARAN PER JAMAAH */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#f4c430]" />
                      Status Pembayaran per Jamaah
                    </CardTitle>
                    <CardDescription>
                      Rincian pembayaran untuk keberangkatan {pendaftaranData.tanggalKeberangkatan}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Total Pembayaran */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total Biaya</p>
                      <p className="text-lg font-bold text-gray-900">
                        Rp {pendaftaranData.totalBayar.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Sudah Bayar</p>
                      <p className="text-lg font-bold text-green-600">
                        Rp {pendaftaranData.sudahBayar.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Sisa</p>
                      <p className="text-lg font-bold text-red-600">
                        Rp{" "}
                        {(
                          pendaftaranData.totalBayar - pendaftaranData.sudahBayar
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress Pembayaran</span>
                      <span className="font-medium">
                        {((pendaftaranData.sudahBayar / pendaftaranData.totalBayar) * 100).toFixed(
                          0
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(pendaftaranData.sudahBayar / pendaftaranData.totalBayar) * 100}
                      className="h-3"
                    />
                  </div>
                </div>

                {/* Per Jamaah Payment */}
                <div className="space-y-3">
                  {pendaftaranData.jamaahList.map((jamaah, idx) => {
                    const progressPembayaran = (jamaah.jumlahDibayar / jamaah.totalBiaya) * 100;
                    const sisaPembayaran = jamaah.totalBiaya - jamaah.jumlahDibayar;

                    return (
                      <Card key={jamaah.id} className="bg-gray-50 border-l-4 border-l-[#f4c430]">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center text-black font-bold">
                                {idx + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold">{jamaah.namaLengkap}</h4>
                                <p className="text-xs text-gray-600">{jamaah.jenisKelamin}</p>
                              </div>
                            </div>
                            {getStatusPembayaranBadge(jamaah.statusPembayaran)}
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Progress Pembayaran</span>
                              <span className="font-medium">{progressPembayaran.toFixed(0)}%</span>
                            </div>
                            <Progress value={progressPembayaran} className="h-2" />
                          </div>

                          <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="text-gray-600 mb-0.5">Total Biaya</p>
                              <p className="font-semibold text-gray-900">
                                Rp {jamaah.totalBiaya.toLocaleString("id-ID")}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-0.5">Sudah Bayar</p>
                              <p className="font-semibold text-green-600">
                                Rp {jamaah.jumlahDibayar.toLocaleString("id-ID")}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-0.5">Sisa</p>
                              <p className="font-semibold text-red-600">
                                Rp {sisaPembayaran.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Payment Button */}
                {pendaftaranData.sudahBayar < pendaftaranData.totalBayar && (
                  <div className="pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Info:</strong> Pelunasan dapat dilakukan secara bertahap untuk
                        semua jamaah. Minimal pembayaran Rp 1.000.000 per transaksi.
                      </p>
                    </div>
                    <Button
                      onClick={openPaymentGateway}
                      className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Bayar Pelunasan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Gateway Modal */}
        {selectedPendaftaran && (
          <PaymentGateway
            open={paymentModalOpen}
            onClose={() => setPaymentModalOpen(false)}
            amount={selectedPendaftaran.totalBayar - selectedPendaftaran.sudahBayar}
            orderId={selectedPendaftaran.noPendaftaran}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    </div>
  );
}
