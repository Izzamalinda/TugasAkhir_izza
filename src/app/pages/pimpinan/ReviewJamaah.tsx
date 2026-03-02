import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { 
  Star, 
  Search, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Filter,
  Calendar,
  Award,
  ThumbsUp,
  MapPin,
  Package
} from "lucide-react";
import { useState } from "react";

interface Review {
  id: string;
  jamaahName: string;
  paketName: string;
  tanggalKeberangkatan: string;
  rating: number;
  comment: string;
  tanggalReview: string;
  avatar?: string;
  helpful: number;
  kategori: "Pelayanan" | "Akomodasi" | "Ibadah" | "Transportasi" | "Keseluruhan";
}

const mockReviews: Review[] = [
  {
    id: "R001",
    jamaahName: "Ahmad Fauzi",
    paketName: "Paket Premium 14 Hari",
    tanggalKeberangkatan: "15 Maret 2026",
    rating: 5,
    comment: "Alhamdulillah pengalaman umrah yang luar biasa! Pelayanan sangat memuaskan, hotel dekat dengan Masjidil Haram, pembimbing yang sabar dan berpengalaman. Semua fasilitas sesuai dengan yang dijanjikan. Terima kasih Ardaya Travel!",
    tanggalReview: "25 Maret 2026",
    helpful: 24,
    kategori: "Keseluruhan"
  },
  {
    id: "R002",
    jamaahName: "Siti Nurhaliza",
    paketName: "Paket Standar 12 Hari",
    tanggalKeberangkatan: "10 April 2026",
    rating: 5,
    comment: "Sangat puas dengan pelayanan Ardaya Travel. Hotel bersih dan nyaman, makanan enak, dan yang paling penting pembimbing sangat membantu dalam menjalankan ibadah. Recommended!",
    tanggalReview: "20 April 2026",
    helpful: 18,
    kategori: "Pelayanan"
  },
  {
    id: "R003",
    jamaahName: "Budi Santoso",
    paketName: "Paket VIP 16 Hari",
    tanggalKeberangkatan: "20 Juni 2026",
    rating: 5,
    comment: "Paket VIP benar-benar VIP! Hotel bintang 5 dengan view Masjidil Haram yang menakjubkan. Pelayanan eksklusif, bus private yang nyaman, dan waktu ibadah yang lebih fleksibel. Worth every penny!",
    tanggalReview: "5 Juli 2026",
    helpful: 32,
    kategori: "Akomodasi"
  },
  {
    id: "R004",
    jamaahName: "Rina Wati",
    paketName: "Paket Hemat 9 Hari",
    tanggalKeberangkatan: "1 Mei 2026",
    rating: 4,
    comment: "Untuk paket hemat, fasilitas yang diberikan sudah sangat baik. Hotel cukup bersih meskipun agak jauh dari Masjidil Haram, tapi ada shuttle bus yang rutin. Pembimbing sangat membantu dan sabar.",
    tanggalReview: "8 Mei 2026",
    helpful: 15,
    kategori: "Transportasi"
  },
  {
    id: "R005",
    jamaahName: "Dedi Kurniawan",
    paketName: "Paket Express 7 Hari",
    tanggalKeberangkatan: "15 Juli 2026",
    rating: 4,
    comment: "Paket express cocok untuk yang sudah pernah umrah dan tidak perlu banyak panduan. Jadwal padat tapi efisien. Semua ibadah wajib dan sunnah bisa dijalankan dengan baik.",
    tanggalReview: "21 Juli 2026",
    helpful: 12,
    kategori: "Ibadah"
  },
  {
    id: "R006",
    jamaahName: "Fatimah Az-Zahra",
    paketName: "Paket Premium 14 Hari",
    tanggalKeberangkatan: "15 Maret 2026",
    rating: 5,
    comment: "Subhanallah, perjalanan spiritual yang sangat berkesan. Tim Ardaya Travel sangat profesional, dari keberangkatan sampai kepulangan semua terorganisir dengan baik. Dokumen juga diurus dengan cepat.",
    tanggalReview: "26 Maret 2026",
    helpful: 28,
    kategori: "Pelayanan"
  },
  {
    id: "R007",
    jamaahName: "Hendra Wijaya",
    paketName: "Paket Standar 12 Hari",
    tanggalKeberangkatan: "10 April 2026",
    rating: 4,
    comment: "Secara keseluruhan bagus, hanya saja waktu di Madinah terasa kurang. Tapi pelayanan hotel dan transportasi sangat memuaskan. Guide pembimbing juga ramah dan informatif.",
    tanggalReview: "21 April 2026",
    helpful: 10,
    kategori: "Keseluruhan"
  },
  {
    id: "R008",
    jamaahName: "Indah Permatasari",
    paketName: "Paket VIP 16 Hari",
    tanggalKeberangkatan: "20 Juni 2026",
    rating: 5,
    comment: "Pelayanan VIP yang sesungguhnya! Kamar hotel mewah dengan pemandangan Ka'bah, makanan buffet yang lezat setiap hari, dan fasilitas laundry gratis. Tidak ada yang perlu dikhawatirkan, semua sudah diatur dengan sempurna.",
    tanggalReview: "6 Juli 2026",
    helpful: 35,
    kategori: "Akomodasi"
  }
];

export default function ReviewJamaah() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterKategori, setFilterKategori] = useState("all");

  // Calculate statistics
  const totalReviews = mockReviews.length;
  const averageRating = (mockReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);
  const rating5 = mockReviews.filter(r => r.rating === 5).length;
  const rating4 = mockReviews.filter(r => r.rating === 4).length;
  const rating3 = mockReviews.filter(r => r.rating === 3).length;
  const totalHelpful = mockReviews.reduce((acc, r) => acc + r.helpful, 0);

  // Filter reviews
  const filteredReviews = mockReviews.filter(review => {
    const matchSearch = review.jamaahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       review.paketName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRating = filterRating === "all" || review.rating === parseInt(filterRating);
    const matchKategori = filterKategori === "all" || review.kategori === filterKategori;
    
    return matchSearch && matchRating && matchKategori;
  });

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === "sm" ? "w-4 h-4" : "w-6 h-6"} ${
              star <= rating ? "fill-[#f4c430] text-[#f4c430]" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Review Jamaah
          </h1>
          <p className="text-gray-400">
            Testimoni dan penilaian dari jamaah yang telah berangkat umrah
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#f4c430]/20 via-black to-gray-900 border-[#f4c430]/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4c430]/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#f4c430]/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#f4c430]" />
                </div>
                <Badge className="bg-[#f4c430]/20 text-[#f4c430] border-0">
                  <Award className="w-3 h-3 mr-1" />
                  Excellent
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Rating Rata-rata</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-white">{averageRating}</p>
                  <p className="text-sm text-gray-400 mb-1">/ 5.0</p>
                </div>
                {renderStars(Math.round(parseFloat(averageRating)), "sm")}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 via-black to-gray-900 border-blue-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-0">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15%
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Review</p>
                <p className="text-3xl font-bold text-white">{totalReviews}</p>
                <p className="text-xs text-blue-400 mt-1">Review terkumpul</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/20 via-black to-gray-900 border-emerald-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-emerald-500" />
                </div>
                <Badge className="bg-emerald-600/20 text-emerald-400 border-0">
                  Popular
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Helpful Votes</p>
                <p className="text-3xl font-bold text-white">{totalHelpful}</p>
                <p className="text-xs text-emerald-400 mt-1">Total votes berguna</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 via-black to-gray-900 border-purple-600/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <Badge className="bg-purple-600/20 text-purple-400 border-0">
                  Happy
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Kepuasan Jamaah</p>
                <p className="text-3xl font-bold text-white">
                  {((rating5 / totalReviews) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-purple-400 mt-1">Rating bintang 5</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Distribusi Rating</CardTitle>
            <CardDescription className="text-gray-400">
              Breakdown rating dari semua review jamaah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stars: 5, count: rating5, color: "bg-[#f4c430]" },
                { stars: 4, count: rating4, color: "bg-blue-600" },
                { stars: 3, count: rating3, color: "bg-amber-600" },
                { stars: 2, count: 0, color: "bg-orange-600" },
                { stars: 1, count: 0, color: "bg-red-600" }
              ].map(({ stars, count, color }) => {
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-24">
                      {renderStars(stars, "sm")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-800 rounded-full h-3">
                          <div
                            className={`${color} h-3 rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400 w-16 text-right">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Cari review (nama, paket, komentar)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/50 border-[#f4c430]/20 text-white placeholder:text-gray-500"
                />
              </div>

              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                  <Filter className="w-4 h-4 mr-2 text-[#f4c430]" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                  <SelectItem value="all">Semua Rating</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Bintang)</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ (4 Bintang)</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ (3 Bintang)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterKategori} onValueChange={setFilterKategori}>
                <SelectTrigger className="bg-black/50 border-[#f4c430]/20 text-white">
                  <Package className="w-4 h-4 mr-2 text-[#f4c430]" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#f4c430]/20">
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Keseluruhan">Keseluruhan</SelectItem>
                  <SelectItem value="Pelayanan">Pelayanan</SelectItem>
                  <SelectItem value="Akomodasi">Akomodasi</SelectItem>
                  <SelectItem value="Ibadah">Ibadah</SelectItem>
                  <SelectItem value="Transportasi">Transportasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Tidak Ada Review Ditemukan
                </h3>
                <p className="text-gray-400">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-[#f4c430]/20 hover:border-[#f4c430]/40 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12 border-2 border-[#f4c430]/30">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback className="bg-[#f4c430]/20 text-[#f4c430]">
                        {review.jamaahName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {review.jamaahName}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {review.paketName}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {review.tanggalKeberangkatan}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {renderStars(review.rating, "sm")}
                          <p className="text-xs text-gray-500 mt-1">
                            {review.tanggalReview}
                          </p>
                        </div>
                      </div>

                      <Badge className="mb-3 bg-[#f4c430]/20 text-[#f4c430] border-0">
                        {review.kategori}
                      </Badge>

                      <p className="text-gray-300 leading-relaxed mb-4">
                        {review.comment}
                      </p>

                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-[#f4c430] hover:bg-[#f4c430]/10"
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredReviews.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Menampilkan {filteredReviews.length} dari {totalReviews} review
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
