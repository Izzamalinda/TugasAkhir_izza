import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Calendar, Hotel, Plane, Users, MapPin, Star, Search, CheckCircle, ArrowRight, Filter, Crown, Sparkles } from "lucide-react";
import { paketUmrahList } from "../../data/mockData";
import { Link } from "react-router";
import { motion } from "motion/react";

export default function PaketList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterHarga, setFilterHarga] = useState("all");
  const [selectedPaket, setSelectedPaket] = useState<any>(null);

  // Filter paket
  const filteredPaket = paketUmrahList.filter((paket) => {
    const matchSearch = paket.nama.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchHarga = true;
    if (filterHarga === "hemat") matchHarga = paket.harga < 25000000;
    else if (filterHarga === "reguler") matchHarga = paket.harga >= 25000000 && paket.harga < 35000000;
    else if (filterHarga === "premium") matchHarga = paket.harga >= 35000000;

    return matchSearch && matchHarga;
  });

  return (
    <div className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Badge className="mb-4 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
            <Crown className="w-3 h-3 mr-1" />
            Paket Premium
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Paket Umrah </span>
            <span className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] bg-clip-text text-transparent">
              Terbaik
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda
          </p>
          <div className="mt-4">
            <Badge className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black px-4 py-2">
              <Sparkles className="w-3 h-3 mr-1" />
              {filteredPaket.length} Paket Tersedia
            </Badge>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-8 border-[#f4c430]/30 shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f4c430] w-5 h-5" />
                  <Input
                    placeholder="Cari paket umrah..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-10 pr-3 bg-black border border-[#f4c430]/30 text-white placeholder:text-gray-500 focus:ring-0 focus:ring-offset-0 focus:border-[#f4c430] flex items-center"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f4c430] w-5 h-5 pointer-events-none z-10" />
                  <Select value={filterHarga} onValueChange={setFilterHarga}>
                      <SelectTrigger className="w-full h-12 pl-10 pr-3 py-0 leading-none bg-black border border-[#f4c430]/30 text-white focus:ring-0 focus:ring-offset-0 focus:border-[#f4c430] flex items-center">
                      <SelectValue placeholder="Filter berdasarkan harga" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-[#f4c430]/30">
                      <SelectItem value="all" className="text-white hover:bg-[#f4c430]/20">Semua Harga</SelectItem>
                      <SelectItem value="hemat" className="text-white hover:bg-[#f4c430]/20">💰 Hemat (&lt; 25 Jt)</SelectItem>
                      <SelectItem value="reguler" className="text-white hover:bg-[#f4c430]/20">✨ Reguler (25-35 Jt)</SelectItem>
                      <SelectItem value="premium" className="text-white hover:bg-[#f4c430]/20">⭐ Premium (&gt;= 35 Jt)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Paket List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaket.map((paket, index) => (
            <motion.div
              key={paket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/30 shadow-lg hover:shadow-[#f4c430]/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group overflow-hidden">
                {/* Badge untuk Premium */}
                {paket.harga >= 35000000 && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-[#f4c430] text-black shadow-lg font-bold">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Premium
                    </Badge>
                  </div>
                )}

                {/* Header dengan gradient background */}
                <div className="h-24 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
                  </div>
                  <div className="relative z-10 p-6 flex items-center justify-between h-full">
                    <Plane className="w-8 h-8 text-black" />
                    <div className="text-black text-right">
                      <div className="text-2xl font-bold">{paket.durasi}</div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white group-hover:text-[#f4c430] transition-colors">
                    {paket.nama}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{paket.keberangkatan}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-1 pb-4">
                  {/* Harga - Simplified */}
                  <div className="text-center py-3 border-y border-[#f4c430]/20">
                    <div className="text-3xl font-bold text-[#f4c430]">
                      Rp {(paket.harga / 1000000).toFixed(1)} Jt
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Per jamaah</div>
                  </div>

                  {/* Info - Simplified List */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Hotel className="w-4 h-4 text-[#f4c430]" />
                      <span>{paket.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Plane className="w-4 h-4 text-[#f4c430]" />
                      <span>{paket.pesawat}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 text-[#f4c430]" />
                      <span>{paket.kuota} jamaah tersedia</span>
                    </div>
                  </div>

                  {/* Fitur Utama - Simple List */}
                  <div className="pt-3 border-t border-[#f4c430]/20 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-[#f4c430]" />
                      <span>Pembimbing berpengalaman</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-[#f4c430]" />
                      <span>Makan 3x sehari</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <CheckCircle className="w-4 h-4 text-[#f4c430]" />
                      <span>Visa & Asuransi termasuk</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 pt-4 border-t border-[#f4c430]/20">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full bg-transparent border-[#f4c430]/50 text-[#f4c430] hover:bg-[#f4c430]/10 hover:border-[#f4c430]"
                        onClick={() => setSelectedPaket(paket)}
                      >
                        Lihat Detail
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-white">{selectedPaket?.nama}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Detail lengkap paket umrah
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedPaket && (
                        <div className="space-y-6">
                          {/* Harga */}
                          <div className="text-center py-6 border-y border-[#f4c430]/30">
                            <div className="text-sm text-gray-400 mb-2">Harga Paket</div>
                            <div className="text-5xl font-bold text-[#f4c430] mb-1">
                              Rp {selectedPaket.harga.toLocaleString("id-ID")}
                            </div>
                            <div className="text-sm text-gray-500">Per jamaah</div>
                          </div>

                          {/* Info Utama - Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500">Durasi</div>
                              <div className="text-white font-medium">{selectedPaket.durasi}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500">Keberangkatan</div>
                              <div className="text-white font-medium">{selectedPaket.keberangkatan}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500">Hotel</div>
                              <div className="text-white font-medium">{selectedPaket.hotel}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500">Maskapai</div>
                              <div className="text-white font-medium">{selectedPaket.pesawat}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-gray-500">Kuota Tersedia</div>
                              <div className="text-white font-medium">{selectedPaket.kuota} jamaah</div>
                            </div>
                          </div>

                          {/* Fasilitas - Simple List */}
                          <div className="border-t border-[#f4c430]/30 pt-6">
                            <h4 className="font-bold text-lg mb-4 text-white">Fasilitas Termasuk</h4>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Tiket Pesawat PP</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Hotel Bintang 4/5</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Makan 3x Sehari</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Pembimbing Resmi</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Visa Umrah</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Asuransi Perjalanan</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Manasik & Bimbingan</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#f4c430]" />
                                <span className="text-sm text-gray-300">Ziarah Kota Suci</span>
                              </div>
                            </div>
                          </div>

                          {/* CTA */}
                          <Link to="/customer/pendaftaran">
                            <Button className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 h-12 shadow-lg shadow-[#f4c430]/50 font-bold">
                              <Crown className="mr-2 w-5 h-5" />
                              Daftar Paket Ini
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Link to="/customer/pendaftaran" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 font-bold">
                      Daftar Sekarang
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaket.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-[#f4c430]/30 shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-[#f4c430]/20 border-2 border-[#f4c430]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-[#f4c430]" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-white">Paket Tidak Ditemukan</h3>
                <p className="text-gray-400 mb-6">
                  Tidak ada paket yang sesuai dengan pencarian Anda. Coba ubah filter atau kata kunci.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setFilterHarga("all");
                  }}
                  className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Reset Filter
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}