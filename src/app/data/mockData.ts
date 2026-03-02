export interface PaketUmrah {
  id: string;
  nama: string;
  durasi: string;
  harga: number;
  keberangkatan: string;
  hotel: string;
  pesawat: string;
  fasilitas: string[];
  kuota: number;
  tersedia: number;
}

export interface Pendaftaran {
  id: string;
  noPendaftaran: string;
  paketId: string;
  namaPaket: string;
  namaCustomer: string;
  email: string;
  noTelp: string;
  tanggalDaftar: string;
  status: "pending" | "verifikasi" | "disetujui" | "ditolak" | "lunas";
  totalBayar: number;
  sudahBayar: number;
  kelengkapanDokumen: {
    ktp: boolean;
    kk: boolean;
    passport: boolean;
    foto: boolean;
    bukuVaksin: boolean;
  };
}

export interface Pembayaran {
  id: string;
  pendaftaranId: string;
  tanggal: string;
  jumlah: number;
  metodePembayaran: string;
  status: "pending" | "berhasil" | "gagal";
  buktiTransfer?: string;
}

export const paketUmrahList: PaketUmrah[] = [
  {
    id: "1",
    nama: "Paket Umrah Reguler",
    durasi: "9 Hari 7 Malam",
    harga: 25000000,
    keberangkatan: "15 Maret 2026",
    hotel: "Hotel Bintang 4 (Makkah & Madinah)",
    pesawat: "Garuda Indonesia",
    fasilitas: [
      "Tiket pesawat PP",
      "Hotel bintang 4",
      "Makan 3x sehari",
      "Tour guide berpengalaman",
      "Visa umrah",
      "Perlengkapan umrah",
    ],
    kuota: 40,
    tersedia: 15,
  },
  {
    id: "2",
    nama: "Paket Umrah Plus Turkey",
    durasi: "14 Hari 12 Malam",
    harga: 35000000,
    keberangkatan: "1 April 2026",
    hotel: "Hotel Bintang 5 (Makkah & Madinah)",
    pesawat: "Turkish Airlines",
    fasilitas: [
      "Tiket pesawat PP",
      "Hotel bintang 5",
      "Makan 3x sehari",
      "Tour Turkey (Istanbul, Cappadocia)",
      "Tour guide berpengalaman",
      "Visa umrah",
      "Perlengkapan umrah",
      "City tour Jeddah",
    ],
    kuota: 30,
    tersedia: 8,
  },
  {
    id: "3",
    nama: "Paket Umrah Ramadhan",
    durasi: "12 Hari 10 Malam",
    harga: 45000000,
    keberangkatan: "20 Februari 2026",
    hotel: "Hotel Bintang 5 Dekat Masjidil Haram",
    pesawat: "Saudia Airlines",
    fasilitas: [
      "Tiket pesawat PP",
      "Hotel bintang 5 walking distance",
      "Makan 3x sehari + sahur & iftar",
      "Tour guide berpengalaman",
      "Visa umrah",
      "Perlengkapan umrah lengkap",
      "Ziarah kota Makkah & Madinah",
    ],
    kuota: 35,
    tersedia: 20,
  },
  {
    id: "4",
    nama: "Paket Umrah Hemat",
    durasi: "7 Hari 5 Malam",
    harga: 20000000,
    keberangkatan: "10 Maret 2026",
    hotel: "Hotel Bintang 3",
    pesawat: "Lion Air",
    fasilitas: [
      "Tiket pesawat PP",
      "Hotel bintang 3",
      "Makan 2x sehari",
      "Tour guide",
      "Visa umrah",
    ],
    kuota: 45,
    tersedia: 30,
  },
];

export const pendaftaranList: Pendaftaran[] = [
  {
    id: "1",
    noPendaftaran: "UM2026001",
    paketId: "1",
    namaPaket: "Paket Umrah Reguler",
    namaCustomer: "Ahmad Hidayat",
    email: "ahmad@email.com",
    noTelp: "081234567890",
    tanggalDaftar: "2026-02-01",
    status: "disetujui",
    totalBayar: 25000000,
    sudahBayar: 25000000,
    kelengkapanDokumen: {
      ktp: true,
      kk: true,
      passport: true,
      foto: true,
      bukuVaksin: true,
    },
  },
  {
    id: "2",
    noPendaftaran: "UM2026002",
    paketId: "2",
    namaPaket: "Paket Umrah Plus Turkey",
    namaCustomer: "Siti Nurhaliza",
    email: "siti@email.com",
    noTelp: "081234567891",
    tanggalDaftar: "2026-02-03",
    status: "verifikasi",
    totalBayar: 35000000,
    sudahBayar: 10000000,
    kelengkapanDokumen: {
      ktp: true,
      kk: true,
      passport: true,
      foto: true,
      bukuVaksin: false,
    },
  },
  {
    id: "3",
    noPendaftaran: "UM2026003",
    paketId: "3",
    namaPaket: "Paket Umrah Ramadhan",
    namaCustomer: "Budi Santoso",
    email: "budi@email.com",
    noTelp: "081234567892",
    tanggalDaftar: "2026-02-05",
    status: "pending",
    totalBayar: 45000000,
    sudahBayar: 0,
    kelengkapanDokumen: {
      ktp: true,
      kk: false,
      passport: false,
      foto: false,
      bukuVaksin: false,
    },
  },
];

export const pembayaranList: Pembayaran[] = [
  {
    id: "1",
    pendaftaranId: "1",
    tanggal: "2026-02-01",
    jumlah: 25000000,
    metodePembayaran: "Transfer Bank",
    status: "berhasil",
  },
  {
    id: "2",
    pendaftaranId: "2",
    tanggal: "2026-02-03",
    jumlah: 10000000,
    metodePembayaran: "Transfer Bank",
    status: "berhasil",
  },
];
