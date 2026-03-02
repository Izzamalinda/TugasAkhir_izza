// Types berdasarkan ERD Database

export interface User {
  user_id: string; // varchar(30)
  role_id: string; // varchar(30)
  username: string; // varchar(100)
  email: string; // varchar(255) unique
  password: string; // varchar(255)
  status_verif: boolean;
  tanggal_daftar: Date;
  tanggal_verifikasi: Date | null;
}

export interface Role {
  role_id: string; // varchar(30)
  nama_role: string; // varchar(50)
}

export interface Jamaah {
  jamaah_id: string; // varchar(30) PK
  nama_lengkap: string; // varchar(100)
  nik: string; // varchar(30)
  no_paspor: string; // varchar(30)
  tempat_lahir: string; // varchar(50)
  tanggal_lahir: Date;
  jenis_kelamin: string; // varchar(10)
  alamat: string; // varchar(200)
  no_telepon: string; // varchar(20)
  email: string; // varchar(100)
  nama_darurat: string; // varchar(100)
  no_hp_darurat: string; // varchar(20)
}

export interface Formulir {
  formulir_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  user_id: string; // varchar(30) FK
  nomor_id: string; // varchar(30)
  tanggal_lahir: Date;
  tempat_lahir: string;
  jenis_kelamin: string;
  tanggal_pembuatan: Date;
  tanggal_berlaku: Date;
  status_jamaah: number; // integer
  nama_jamaah: number; // integer
  status_biro: number; // bigint
}

export interface AnggotaPendaftaranJamaah {
  anggotapendaftaranjam_id: string; // varchar(30) PK
  formulir_id: string; // varchar(30) FK
  jamaah_id: string; // varchar(30) FK
  nourut_anggota_id: string; // varchar(30)
  tipe_jamaah_id: string; // varchar(30)
}

export interface Keberangkatan {
  keberangkatan_id: string; // varchar(30) PK
  paket_id: string; // varchar(30) FK
  waktu_keberangkatan: Date;
  tanggal_selesai: Date;
  kuota_tersedia: number; // integer
  kuota_terisi: number; // integer
  status_keberangkatan: string; // varchar(50)
  biaya_jamaah: string; // varchar(50)
  biaya_jamaah_anak: string; // varchar(30)
}

export interface PaketUmroh {
  paket_id: string; // varchar(30) PK
  nama_paket: string; // varchar(200)
  deskripsi: string; // text
  harga: string; // varchar(20)
  durasi: string; // varchar(50)
  target_jamaah_max: Date;
  nama_notifikasi: Date;
}

export interface DokumenJamaah {
  dokumenjemaah_id: string; // varchar(30) PK
  jamaah_id: string; // varchar(30) FK
  jenisdokumen_id: string; // varchar(30) FK
  pathdokumen_id: string; // varchar(200)
  tanggal_unggah: Date;
  status_verifikasi: string; // varchar(50)
  keterangan: string; // text
}

export interface Pembayaran {
  pembayaran_id: string; // varchar(30) PK
  formulir_id: string; // varchar(30) FK
  tanggal_pembayaran: Date;
  nominal: string; // varchar(30)
  metode_pembayaran: string; // varchar(50)
  status_pembayaran: string; // varchar(50)
  bukti_pembayaran: string; // varchar(200)
}

export interface NotifikasiJamaah {
  notifikasijam_id: string; // varchar(30) PK
  user_id: string; // varchar(30) FK
  judul: string; // varchar(255)
  pesan: string; // text
  tanggal_kirim: Date;
  status_baca: boolean;
  tipe_notifikasi: string; // varchar(50)
}

export interface Transportasi {
  transportasi_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  namatransportasi_id: string; // varchar(100)
  nama_transportasi: string; // varchar(100)
  jenis: string; // varchar(50)
  waktu_keberangkatan: Date; // integer
}

export interface DetailTransportasi {
  detailtransportasi_id: string; // varchar(30) PK
  transportasi_id: string; // varchar(30) FK
  keberangkatan_id: string; // varchar(30) FK
  namatransportasi_id: string; // varchar(30)
  user_id: string; // varchar(30)
  nama_transportasi: string; // varchar(100)
  vehicle_seat: string; // integer
  tanggal_wisata_jamaah: string;
  tanggal_kembaran: string;
  company: string; // varchar(100)
  tanggal_url: string;
  contangjam: string; // varchar(100)
}

export interface Akomodasi {
  akomodasi_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  namaakomodasi_id: string; // varchar(30)
  namahotel: string; // varchar(100)
  tipe_kamar_id: string; // varchar(100)
  jumlah_kamar: number; // integer
  lokasi_mekah: number; // integer
}

export interface Itenary {
  itenary_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  urutan: number; // integer
  tanggal_kegiatan: Date;
  nama_kegiatatan: string; // varchar(200)
  lokasi: string; // varchar(200)
  deskripsi: string; // text
  tanggal_verifikasi: Date;
}

export interface DetailItenary {
  detailitenary_id: string; // varchar(30) PK
  itenary_id: string; // varchar(30) FK
  urutan: string; // varchar(30)
  tanggal_kegiatan: Date;
  nama_kegiatan: string; // varchar(30)
  lokasi: string; // varchar(30)
  deskripsi: string; // varchar(30)
  waktu_mulai: string; // varchar(30)
  waktu_selesai: string; // varchar(30)
  nama_fasilitas: string;
}

export interface DistribusiJamaahKamar {
  distribusijam_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  jamaah_id: string; // varchar(30) FK
  akomodasi_id: string; // varchar(30) FK
  nomor_kamar: string; // varchar(30)
}

export interface ChecklistPerlengkapan {
  checklistperleng_id: string; // varchar(30) PK
  user_id: string; // varchar(30) FK
  keberangkatan_id: string; // varchar(30) FK
  keberangkatan_status: string; // varchar(30)
  namaperlengkapan: string; // varchar(30)
  kategori: string; // varchar(100)
  status: string; // varchar(100)
  tanggal_checklist: Date;
}

export interface DistribusiPerlengkapan {
  distribusiperleng_id: string; // varchar(30) PK
  keberangkatan_id: string; // varchar(30) FK
  namaperlengkapan_id: string; // varchar(30) FK
  user_id: string; // varchar(30) FK
  keberangkatan: string; // varchar(30)
  tanggal: Date;
  nama_item: string; // varchar(100)
  jumlah_item: number; // integer
  tanggal_distribusi: Date;
  nama_penerimaan: string; // varchar(100)
  status_distribusi: string; // text
}

export interface CabangLog {
  cabanglog_id: string; // varchar(30) PK
  user_id: string; // varchar(30) FK
  namauser: string; // varchar(100)
  jamlmasuk: string; // varchar(100)
  timestamp: string; // varchar(100)
  action: Date;
  table_nama: string;
  tanggal_cabanglog: Date;
}

// Helper types untuk form
export type StatusVerifikasiDokumen = "belum-upload" | "menunggu-verifikasi" | "diverifikasi" | "ditolak";
export type StatusPembayaran = "pending" | "dp-dibayar" | "lunas" | "expired";
export type StatusKeberangkatan = "aktif" | "penuh" | "dibatalkan" | "selesai";
export type TipeJamaah = "dewasa" | "anak" | "bayi";
export type JenisDokumen = "ktp" | "kk" | "passport" | "foto" | "vaksin" | "buku-nikah" | "akta-lahir";
export type MetodePembayaran = "transfer" | "virtual-account" | "e-wallet" | "credit-card";
