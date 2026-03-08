import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Shield, 
  Heart,
  MapPin,
  Clock,
  Phone,
  Mail,
  Crown,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from "../../assets/logo.png";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Terpercaya & Berizin",
      description: "Terdaftar resmi di Kementerian Agama RI",
    },
    {
      icon: Users,
      title: "Berpengalaman",
      description: "Melayani ribuan jamaah sejak 2024",
    },
    {
      icon: Heart,
      title: "Pelayanan Prima",
      description: "Pendampingan dari awal hingga kembali",
    },
    {
      icon: Crown,
      title: "Kualitas Terbaik",
      description: "Kepuasan jamaah adalah prioritas kami",
    },
  ];

  const testimonials = [
    {
      name: "Ibu Siti Aisyah",
      location: "Jakarta",
      rating: 5,
      text: "Alhamdulillah, perjalanan umrah bersama Ardaya sangat menyenangkan. Tour guide ramah dan profesional.",
    },
    {
      name: "Bapak Ahmad Rizki",
      location: "Bandung",
      rating: 5,
      text: "Pelayanan sangat memuaskan, hotel dekat Masjidil Haram, dan pembimbing sangat sabar.",
    },
    {
      name: "Ibu Fatimah",
      location: "Surabaya",
      rating: 5,
      text: "Paket umrah yang ditawarkan sangat terjangkau dengan fasilitas yang baik. Recommended!",
    },
  ];

  const packages = [
    {
      name: "Paket Ekonomis",
      price: "25.000.000",
      duration: "9 Hari",
      features: ["Hotel bintang 3", "Dekat Haram", "Pembimbing", "Makan 3x"],
    },
    {
      name: "Paket Standar",
      price: "32.000.000",
      duration: "12 Hari",
      features: ["Hotel bintang 4", "Dekat Haram", "Pembimbing", "Makan 3x", "City Tour"],
    },
    {
      name: "Paket Premium",
      price: "45.000.000",
      duration: "14 Hari",
      features: ["Hotel bintang 5", "View Haram", "Pembimbing", "Makan 3x", "Full Tour"],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#f4c430]/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZjRjNDMwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
                Wujudkan Impian <br />
                <span className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] bg-clip-text text-transparent">
                  Umrah Anda
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Perjalanan ibadah umrah yang aman, nyaman, dan penuh berkah bersama 
                Ardaya Travel. Kami siap membantu mewujudkan impian spiritual Anda dengan pelayanan terbaik.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-2xl shadow-[#f4c430]/50 font-bold">
                    <Crown className="mr-2 w-5 h-5" />
                    Daftar Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f4c430] mb-1">500+</div>
                  <div className="text-gray-400 text-sm">Jamaah Terlayani</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f4c430] mb-1">98%</div>
                  <div className="text-gray-400 text-sm">Kepuasan</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#f4c430] mb-1">2+</div>
                  <div className="text-gray-400 text-sm">Tahun Pengalaman</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-2 ring-[#f4c430]/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1649459304452-5a3e5d217102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwdW1yYWglMjBwaWxncmltYWdlfGVufDF8fHx8MTc3MTAzMzExOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Kaaba Mecca"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">
                    "Dan sempurnakanlah ibadah haji dan umrah karena Allah"
                  </p>
                  <p className="text-[#f4c430] text-sm mt-1">QS. Al-Baqarah: 196</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#f4c430]/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
              <Crown className="w-3 h-3 mr-1" />
              Mengapa Memilih Kami
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Keunggulan <span className="text-[#f4c430]">Ardaya Travel</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Komitmen kami adalah memberikan pelayanan terbaik untuk perjalanan ibadah Anda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl hover:shadow-[#f4c430]/20 transition-all duration-300 hover:-translate-y-2 group">
                    <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#f4c430] to-[#d4a028] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#f4c430]/50">
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#f4c430]/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Paket Umrah
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Pilih Paket <span className="text-[#f4c430]">Premium</span> Anda
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Berbagai pilihan paket dengan harga terjangkau dan fasilitas terbaik
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="relative h-full border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl hover:shadow-[#f4c430]/30 transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-bold text-[#f4c430]">
                          Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 mb-6">
                        <Clock className="w-4 h-4 text-[#f4c430]" />
                        <span>{pkg.duration}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#f4c430] flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Link to="/login">
                        <Button className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50">
                          Pilih Paket
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-950 to-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#f4c430]/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#f4c430]/20 text-[#f4c430] border-[#f4c430]/30">
              <Star className="w-3 h-3 mr-1" />
              Testimoni
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Kata Mereka <span className="text-[#f4c430]">Tentang Kami</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Kepuasan jamaah adalah bukti komitmen kami
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-[#f4c430]/20 bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#f4c430] text-[#f4c430]" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f4c430] to-[#d4a028] flex items-center justify-center text-black font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative bg-black text-white"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Logo & Description */}
            <div>
              <img src={logo} alt="Ardaya Travel" className="h-12 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Ardaya Travel adalah mitra terpercaya Anda dalam perjalanan ibadah umrah dan haji. 
                Dengan pengalaman 2 tahun, kami berkomitmen memberikan pelayanan terbaik dan profesional.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#f4c430] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#f4c430] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#f4c430] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#f4c430] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Kontak</h3>
              <div className="space-y-4">
                <a href="mailto:info@ardayatravel.com" className="flex items-center gap-3 text-gray-400 hover:text-[#f4c430] transition-colors group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-[#f4c430]" />
                  <span className="text-sm">info@ardayatravel.com</span>
                </a>
                <a href="tel:+622112345678" className="flex items-center gap-3 text-gray-400 hover:text-[#f4c430] transition-colors group">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-[#f4c430]" />
                  <span className="text-sm">(021) 1234-5678</span>
                </a>
                <a href="https://wa.me/6281234567890" className="flex items-center gap-3 text-gray-400 hover:text-[#f4c430] transition-colors group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f4c430]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm">WA: 0812-3456-7890</span>
                </a>
              </div>
            </div>

            {/* Alamat Kantor */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Alamat Kantor</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm leading-relaxed">
                  Jl. Raya Umrah No. 123<br />
                  Jakarta Selatan<br />
                  DKI Jakarta 12345<br />
                  Indonesia
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 Ardaya Travel Umrah. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#f4c430] transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-[#f4c430] transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-[#f4c430] transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}