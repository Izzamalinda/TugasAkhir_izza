import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
import { Package, UserCheck, Clock, ArrowRight, CheckCircle, Crown } from "lucide-react";
import { paketUmrahList, pendaftaranList } from "../../data/mockData";
import { motion } from "motion/react";

export default function CustomerDashboard() {
  const userName = localStorage.getItem("userName") || "Customer";

  // Simulasi data customer (dalam aplikasi nyata dari API)
  const myPendaftaran = pendaftaranList.filter(
    (p) => p.namaCustomer.toLowerCase().includes(userName.toLowerCase())
  );

  const stats = [
    {
      label: "Paket Tersedia",
      value: paketUmrahList.length,
      icon: Package,
      color: "from-[#f4c430] to-[#d4a028]",
      description: "Pilihan paket umrah",
    },
    {
      label: "Pendaftaran Saya",
      value: myPendaftaran.length,
      icon: UserCheck,
      color: "from-[#ffd700] to-[#f4c430]",
      description: "Total pendaftaran",
    },
    {
      label: "Menunggu Verifikasi",
      value: myPendaftaran.filter((p) => p.status === "pending").length,
      icon: Clock,
      color: "from-amber-500 to-orange-600",
      description: "Perlu ditindaklanjuti",
    },
    {
      label: "Disetujui",
      value: myPendaftaran.filter((p) => p.status === "disetujui").length,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      description: "Siap berangkat",
    },
  ];

  return (
    <div className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Center Aligned */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
            <Crown className="w-3 h-3 mr-1" />
            Dashboard Premium
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Assalamualaikum, </span>
            <span className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] bg-clip-text text-transparent">
              {userName}!
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Selamat datang di dashboard Anda. Kelola perjalanan umrah dengan mudah dan nyaman.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl hover:shadow-[#f4c430]/30 transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <CardContent className="p-6 relative text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg shadow-[#f4c430]/30 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold mb-2 text-[#f4c430]">{stat.value}</div>
                    <div className="text-sm font-medium text-white mb-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-gray-400">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions - Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-white">Akses </span>
            <span className="text-[#f4c430]">Cepat</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/customer/paket">
              <Card className="border-[#f4c430]/30 bg-gradient-to-br from-[#f4c430] via-[#ffd700] to-[#f4c430] shadow-2xl shadow-[#f4c430]/30 hover:shadow-[#f4c430]/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group h-full">
                <CardContent className="p-8 text-center">
                  <Package className="w-16 h-16 mb-4 text-black mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-2xl mb-3 text-black">Paket Umrah</h3>
                  <p className="text-black/80 text-sm mb-6">
                    Lihat dan pilih paket umrah sesuai kebutuhan Anda
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-black">
                    Lihat Semua
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/customer/pendaftaran">
              <Card className="border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl hover:shadow-[#f4c430]/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full">
                <CardContent className="p-8 text-center">
                  <UserCheck className="w-16 h-16 mb-4 text-[#f4c430] mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-2xl mb-3 text-white">Daftar Umrah</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Mulai pendaftaran untuk perjalanan umrah Anda
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-[#f4c430]">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/customer/status">
              <Card className="border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl hover:shadow-[#f4c430]/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full">
                <CardContent className="p-8 text-center">
                  <Clock className="w-16 h-16 mb-4 text-[#f4c430] mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-2xl mb-3 text-white">Status Pendaftaran</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Pantau status dan progres pendaftaran Anda
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-[#f4c430]">
                    Cek Status
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}