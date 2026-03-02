import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { 
  Star, 
  Send, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  CheckCircle2,
  Heart,
  Sparkles,
  Camera,
  Award
} from "lucide-react";
import { useState } from "react";

export default function ReviewUmrah() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    ratingLayanan: 0,
    ratingHotel: 0,
    ratingPemandu: 0,
    ratingTransportasi: 0,
    ratingMakanan: 0,
    pengalamanPositif: "",
    saran: "",
    testimonial: "",
    rekomendasiKeluarga: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Mohon berikan rating keseluruhan");
      return;
    }
    
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const RatingStars = ({ 
    count, 
    value, 
    onChange 
  }: { 
    count: number; 
    value: number; 
    onChange: (rating: number) => void;
  }) => {
    const [hover, setHover] = useState(0);
    
    return (
      <div className="flex gap-1">
        {Array.from({ length: count }).map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className="transition-transform hover:scale-110"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-8 h-8 ${
                  starValue <= (hover || value)
                    ? "fill-[#f4c430] text-[#f4c430]"
                    : "text-gray-300"
                }`}
              />
            </button>
          );
        })}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f4c430]/10 via-gray-50 to-[#ffd700]/10 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-[#f4c430]/30 shadow-2xl shadow-[#f4c430]/20">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#f4c430]/50">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Terima Kasih! 🎉
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
                Review Anda sangat berarti untuk kami dan akan membantu meningkatkan kualitas pelayanan Ardaya Travel.
              </p>

              <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < rating ? "fill-[#f4c430] text-[#f4c430]" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-2xl font-bold text-gray-900 ml-2">{rating}/5</span>
              </div>

              <div className="space-y-3">
                <Button
                  className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                  onClick={() => window.location.href = "/customer/dashboard"}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Kembali ke Dashboard
                </Button>
                
                <p className="text-sm text-gray-500">
                  Semoga umrah Anda diterima Allah SWT 🤲
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Review Pelaksanaan Umrah
            </h1>
          </div>
          <p className="text-gray-600">
            Bagikan pengalaman umrah Anda untuk membantu meningkatkan layanan kami
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <Heart className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">Alhamdulillah, Umrah Selesai!</h4>
            <p className="text-sm text-green-800">
              Terima kasih telah mempercayakan perjalanan ibadah Anda kepada Ardaya Travel. 
              Kami sangat menghargai feedback Anda.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Keseluruhan */}
          <Card className="border-l-4 border-l-[#f4c430]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#f4c430] text-[#f4c430]" />
                Rating Keseluruhan *
              </CardTitle>
              <CardDescription>
                Berikan penilaian umum untuk perjalanan umrah Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 py-6">
                <RatingStars count={5} value={rating} onChange={setRating} />
                <div className="text-center">
                  {rating === 0 && <p className="text-gray-500">Klik bintang untuk memberi rating</p>}
                  {rating === 1 && <p className="text-red-600 font-semibold">Sangat Tidak Puas</p>}
                  {rating === 2 && <p className="text-orange-600 font-semibold">Tidak Puas</p>}
                  {rating === 3 && <p className="text-yellow-600 font-semibold">Cukup</p>}
                  {rating === 4 && <p className="text-blue-600 font-semibold">Puas</p>}
                  {rating === 5 && (
                    <div className="flex items-center gap-2 text-green-600">
                      <Sparkles className="w-5 h-5" />
                      <p className="font-semibold">Sangat Puas!</p>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Detail */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Rating Detail Layanan
              </CardTitle>
              <CardDescription>
                Beri penilaian untuk setiap aspek layanan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Layanan Customer Service</Label>
                <RatingStars
                  count={5}
                  value={formData.ratingLayanan}
                  onChange={(value) => handleChange("ratingLayanan", value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">Kualitas Hotel</Label>
                <RatingStars
                  count={5}
                  value={formData.ratingHotel}
                  onChange={(value) => handleChange("ratingHotel", value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">Pembimbing/Tour Leader</Label>
                <RatingStars
                  count={5}
                  value={formData.ratingPemandu}
                  onChange={(value) => handleChange("ratingPemandu", value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">Transportasi & Bus</Label>
                <RatingStars
                  count={5}
                  value={formData.ratingTransportasi}
                  onChange={(value) => handleChange("ratingTransportasi", value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">Kualitas Makanan</Label>
                <RatingStars
                  count={5}
                  value={formData.ratingMakanan}
                  onChange={(value) => handleChange("ratingMakanan", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pengalaman Positif */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                Yang Anda Sukai
              </CardTitle>
              <CardDescription>
                Ceritakan hal-hal positif selama perjalanan umrah
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Contoh: Hotel sangat dekat dengan Masjidil Haram, tour leader sangat helpful, makanan enak dan bervariasi..."
                value={formData.pengalamanPositif}
                onChange={(e) => handleChange("pengalamanPositif", e.target.value)}
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Saran */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsDown className="w-5 h-5" />
                Saran Perbaikan
              </CardTitle>
              <CardDescription>
                Bagian mana yang perlu kami tingkatkan?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Contoh: Waktu istirahat di bus terlalu singkat, porsi makanan bisa ditambah, briefing bisa lebih detail..."
                value={formData.saran}
                onChange={(e) => handleChange("saran", e.target.value)}
                rows={4}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Testimonial */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Testimonial Anda
              </CardTitle>
              <CardDescription>
                Berikan testimoni yang bisa kami tampilkan di website (opsional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Contoh: Alhamdulillah sangat puas dengan pelayanan Ardaya Travel. Semua terorganisir dengan baik dari awal hingga akhir. Insya Allah akan umrah lagi dengan Ardaya..."
                value={formData.testimonial}
                onChange={(e) => handleChange("testimonial", e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                * Testimonial Anda mungkin akan ditampilkan di website dan media sosial kami
              </p>
            </CardContent>
          </Card>

          {/* Rekomendasi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Apakah Anda akan merekomendasikan Ardaya Travel?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={formData.rekomendasiKeluarga === "ya" ? "default" : "outline"}
                  className={
                    formData.rekomendasiKeluarga === "ya"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : ""
                  }
                  onClick={() => handleChange("rekomendasiKeluarga", "ya")}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Ya, Pasti!
                </Button>
                <Button
                  type="button"
                  variant={formData.rekomendasiKeluarga === "mungkin" ? "default" : "outline"}
                  onClick={() => handleChange("rekomendasiKeluarga", "mungkin")}
                >
                  Mungkin
                </Button>
                <Button
                  type="button"
                  variant={formData.rekomendasiKeluarga === "tidak" ? "default" : "outline"}
                  className={
                    formData.rekomendasiKeluarga === "tidak"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : ""
                  }
                  onClick={() => handleChange("rekomendasiKeluarga", "tidak")}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Tidak
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold h-12"
            >
              <Send className="w-5 h-5 mr-2" />
              Kirim Review
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Jazakumullah khairan atas waktu Anda memberikan review 🤲
          </p>
        </form>
      </div>
    </div>
  );
}
