"use client";

import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Send } from "lucide-react";

import RadioQuestion from "../../components/ui/radio-question";
import StarRating from "../../components/ui/star-rating";
import TextareaQuestion from "../../components/ui/textarea-question";

export default function ReviewUmrah() {

const [formData,setFormData] = useState<any>({
tanggalKeberangkatan:"",

jenisKelamin:"",
pengalamanIbadah:"",
sumberInformasi:"",

pelayananTravel:"",
informasiStaff:"",
pelayananBandara:"",

wisataMadinah:"",
hotelMadinah:"",
hotelMekkah:"",
fasilitasTransportasi:"",
makanan:"",

mutawifPelayanan:"",
mutawifEtika:"",
mutawifPerhatian:"",
mutawifTugas:"",
mutawifPengetahuan:"",

pembimbingPelayanan:"",
pembimbingEtika:"",
pembimbingPerhatian:"",
pembimbingPengetahuan:"",

materiKajian:"",
prosesiUmrah:"",
manasik:"",
kajian:"",

kepuasanKeseluruhan:"",

rekomendasi:0,
ratingAkhir:0,

saran:""
})

const handleChange = (field:string,value:any)=>{

setFormData((prev:any)=>({
...prev,
[field]:value
}))

}

const handleSubmit = (e:any)=>{

e.preventDefault()

console.log(formData)

alert("Review berhasil dikirim")

}

return (

<div className="min-h-screen bg-gray-50 py-10">

<div className="max-w-4xl mx-auto px-4 space-y-6">

<h1 className="text-3xl font-bold">
Kuesioner Evaluasi Umrah
</h1>

<form onSubmit={handleSubmit} className="space-y-6">

{/* TANGGAL KEBERANGKATAN */}

<Card>

<CardHeader>
<CardTitle>Tanggal Keberangkatan</CardTitle>
</CardHeader>

<CardContent>

<Input
type="date"
value={formData.tanggalKeberangkatan}
onChange={(e)=>handleChange("tanggalKeberangkatan",e.target.value)}
/>

</CardContent>

</Card>


{/* IDENTITAS JAMAAH */}

<RadioQuestion
label="Jenis Kelamin"
field="jenisKelamin"
value={formData.jenisKelamin}
onChange={handleChange}
options={[
{label:"Laki-laki",value:"laki"},
{label:"Perempuan",value:"perempuan"}
]}
/>


<RadioQuestion
label="Apakah Anda pernah melaksanakan Haji atau Umrah sebelumnya?"
field="pengalamanIbadah"
value={formData.pengalamanIbadah}
onChange={handleChange}
options={[
{label:"Sudah pernah haji",value:"haji"},
{label:"Sudah pernah umrah",value:"umrah"},
{label:"Haji dan umrah",value:"keduanya"},
{label:"Belum pernah",value:"belum"}
]}
/>


<RadioQuestion
label="Dari mana Anda mengetahui Ardaya Travel?"
field="sumberInformasi"
value={formData.sumberInformasi}
onChange={handleChange}
options={[
{label:"Keluarga",value:"keluarga"},
{label:"Teman",value:"teman"},
{label:"Facebook",value:"facebook"},
{label:"Instagram",value:"instagram"},
{label:"Iklan",value:"iklan"}
]}
/>


{/* PELAYANAN TRAVEL */}

<RadioQuestion
label="Bagaimana pelayanan dan sikap Ardaya Travel?"
field="pelayananTravel"
value={formData.pelayananTravel}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


<RadioQuestion
label="Bagaimana informasi yang disampaikan oleh staff?"
field="informasiStaff"
value={formData.informasiStaff}
onChange={handleChange}
options={[
{label:"Sangat Jelas",value:"sangat"},
{label:"Cukup Jelas",value:"cukup"},
{label:"Tidak Jelas",value:"tidak"}
]}
/>


<RadioQuestion
label="Bagaimana pelayanan ketika di bandara?"
field="pelayananBandara"
value={formData.pelayananBandara}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


{/* HOTEL DAN AKOMODASI */}

<RadioQuestion
label="Bagaimana kondisi hotel di Madinah?"
field="hotelMadinah"
value={formData.hotelMadinah}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


<RadioQuestion
label="Bagaimana pelayanan hotel dan makanan di Mekkah?"
field="hotelMekkah"
value={formData.hotelMekkah}
onChange={handleChange}
options={[
{label:"Memuaskan",value:"sangat"},
{label:"Cukup Memuaskan",value:"cukup"},
{label:"Kurang Memuaskan",value:"kurang"}
]}
/>


<RadioQuestion
label="Apakah fasilitas bus, hotel, dan pesawat sesuai dengan harga paket?"
field="fasilitasTransportasi"
value={formData.fasilitasTransportasi}
onChange={handleChange}
options={[
{label:"Sesuai",value:"sesuai"},
{label:"Cukup",value:"cukup"},
{label:"Kurang",value:"kurang"}
]}
/>


{/* MUTAWIF */}

<RadioQuestion
label="Bagaimana pelayanan mutawif?"
field="mutawifPelayanan"
value={formData.mutawifPelayanan}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


<RadioQuestion
label="Bagaimana etika mutawif kepada jamaah?"
field="mutawifEtika"
value={formData.mutawifEtika}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


{/* PEMBIMBING */}

<RadioQuestion
label="Bagaimana pelayanan pembimbing kepada jamaah?"
field="pembimbingPelayanan"
value={formData.pembimbingPelayanan}
onChange={handleChange}
options={[
{label:"Sangat Baik",value:"sangat"},
{label:"Cukup Baik",value:"cukup"},
{label:"Kurang Baik",value:"kurang"}
]}
/>


{/* PELAKSANAAN IBADAH */}

<RadioQuestion
label="Bagaimana prosesi umrah (Miqat, Tawaf, Sai, Tahallul)?"
field="prosesiUmrah"
value={formData.prosesiUmrah}
onChange={handleChange}
options={[
{label:"Sangat Memuaskan",value:"sangat"},
{label:"Cukup Memuaskan",value:"cukup"},
{label:"Kurang Memuaskan",value:"kurang"}
]}
/>


<RadioQuestion
label="Apakah manasik membantu pelaksanaan ibadah?"
field="manasik"
value={formData.manasik}
onChange={handleChange}
options={[
{label:"Sangat Membantu",value:"sangat"},
{label:"Cukup Membantu",value:"cukup"},
{label:"Kurang Membantu",value:"kurang"}
]}
/>


{/* REKOMENDASI */}

<StarRating
label="Sejauh mana Anda merekomendasikan Ardaya Travel?"
value={formData.rekomendasi}
onChange={(value)=>handleChange("rekomendasi",value)}
/>


{/* SARAN */}

<TextareaQuestion
label="Apa hal yang perlu diperbaiki?"
field="saran"
value={formData.saran}
onChange={handleChange}
/>


{/* PENILAIAN AKHIR */}

<StarRating
label="Penilaian keseluruhan perjalanan umrah"
value={formData.ratingAkhir}
onChange={(value)=>handleChange("ratingAkhir",value)}
/>


<Button
type="submit"
className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
>

<Send className="w-4 h-4 mr-2"/>
Kirim Review

</Button>

</form>

</div>

</div>

)

}