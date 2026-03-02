import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { 
  Shield, 
  Package, 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Plane,
  Heart,
  FileCheck,
  Briefcase,
  Pill,
  ShieldCheck
} from "lucide-react";
import { pendaftaranList } from "../../data/mockData";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  item: string;
  completed: boolean;
  category: "distribusi" | "keselamatan" | "keamanan";
}

interface JamaahChecklist {
  jamaahId: string;
  namaJamaah: string;
  paket: string;
  checklist: ChecklistItem[];
}

const defaultChecklist: ChecklistItem[] = [
  // Pendistribusian
  { id: "1", item: "Tiket pesawat sudah didistribusikan", completed: false, category: "distribusi" },
  { id: "2", item: "Voucher hotel sudah diberikan", completed: false, category: "distribusi" },
  { id: "3", item: "Perlengkapan umrah (tas, mukena, dll) sudah diserahkan", completed: false, category: "distribusi" },
  { id: "4", item: "Buku panduan umrah sudah diberikan", completed: false, category: "distribusi" },
  { id: "5", item: "Kartu identitas jamaah sudah dibagikan", completed: false, category: "distribusi" },
  
  // Keselamatan
  { id: "6", item: "Asuransi perjalanan sudah aktif", completed: false, category: "keselamatan" },
  { id: "7", item: "Kontak darurat sudah tercatat", completed: false, category: "keselamatan" },
  { id: "8", item: "Obat-obatan pribadi sudah disiapkan", completed: false, category: "keselamatan" },
  { id: "9", item: "Briefing kesehatan sudah dilakukan", completed: false, category: "keselamatan" },
  { id: "10", item: "Nomor kontak tour leader sudah diberikan", completed: false, category: "keselamatan" },
  
  // Keamanan
  { id: "11", item: "Dokumen paspor sudah diverifikasi", completed: false, category: "keamanan" },
  { id: "12", item: "Visa umrah sudah valid", completed: false, category: "keamanan" },
  { id: "13", item: "Vaksinasi meningitis sudah lengkap", completed: false, category: "keamanan" },
  { id: "14", item: "Bagasi sudah di-check sesuai ketentuan", completed: false, category: "keamanan" },
  { id: "15", item: "Briefing keamanan di tanah suci sudah diberikan", completed: false, category: "keamanan" },
];

export default function OperasionalDashboard() {
  const [jamaahChecklists, setJamaahChecklists] = useState<JamaahChecklist[]>(
    pendaftaranList
      .filter((p) => p.status === "disetujui")
      .map((p) => ({
        jamaahId: p.id,
        namaJamaah: p.namaCustomer,
        paket: p.namaPaket,
        checklist: [...defaultChecklist],
      }))
  );

  const [selectedJamaah, setSelectedJamaah] = useState<string | null>(
    jamaahChecklists.length > 0 ? jamaahChecklists[0].jamaahId : null
  );

  const toggleChecklistItem = (jamaahId: string, itemId: string) => {
    setJamaahChecklists((prev) =>
      prev.map((jc) =>
        jc.jamaahId === jamaahId
          ? {
              ...jc,
              checklist: jc.checklist.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : jc
      )
    );
  };

  const currentJamaahChecklist = jamaahChecklists.find(
    (jc) => jc.jamaahId === selectedJamaah
  );

  // Statistics
  const totalJamaah = jamaahChecklists.length;
  const jamaahWithCompleteChecklist = jamaahChecklists.filter((jc) =>
    jc.checklist.every((item) => item.completed)
  ).length;
  const totalChecklistItems = defaultChecklist.length;
  const averageCompletion =
    jamaahChecklists.length > 0
      ? Math.round(
          jamaahChecklists.reduce(
            (acc, jc) => acc + jc.checklist.filter((item) => item.completed).length,
            0
          ) /
            (jamaahChecklists.length * totalChecklistItems) *
            100
        )
      : 0;

  const getPendingCount = () => {
    return jamaahChecklists.filter((jc) =>
      jc.checklist.some((item) => !item.completed)
    ).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Operasional
          </h1>
          <p className="text-gray-600">
            Checklist pendistribusian, keselamatan, dan keamanan jamaah
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Jamaah
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJamaah}</div>
              <p className="text-xs text-gray-500 mt-1">Siap berangkat</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Checklist Selesai
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jamaahWithCompleteChecklist}</div>
              <p className="text-xs text-gray-500 mt-1">Dari {totalJamaah} jamaah</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Checklist
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPendingCount()}</div>
              <p className="text-xs text-gray-500 mt-1">Perlu ditindaklanjuti</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rata-rata Penyelesaian
              </CardTitle>
              <ClipboardCheck className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageCompletion}%</div>
              <p className="text-xs text-gray-500 mt-1">Keseluruhan checklist</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Daftar Jamaah */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Daftar Jamaah
              </CardTitle>
              <CardDescription>
                Pilih jamaah untuk checklist
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {jamaahChecklists.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm">Belum ada jamaah yang disetujui</p>
                  </div>
                ) : (
                  jamaahChecklists.map((jc) => {
                    const completed = jc.checklist.filter((item) => item.completed).length;
                    const total = jc.checklist.length;
                    const percentage = Math.round((completed / total) * 100);
                    const isComplete = percentage === 100;

                    return (
                      <div
                        key={jc.jamaahId}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedJamaah === jc.jamaahId
                            ? "border-[#f4c430] bg-[#f4c430]/5 shadow-sm"
                            : "hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedJamaah(jc.jamaahId)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{jc.namaJamaah}</div>
                            <div className="text-xs text-gray-500">{jc.paket}</div>
                          </div>
                          {isComplete && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                isComplete ? "bg-green-500" : "bg-[#f4c430]"
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Checklist */}
          <div className="lg:col-span-2">
            {!currentJamaahChecklist ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ClipboardCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Pilih jamaah untuk melihat checklist</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5" />
                    Checklist: {currentJamaahChecklist.namaJamaah}
                  </CardTitle>
                  <CardDescription>
                    {currentJamaahChecklist.paket}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="distribusi" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="distribusi" className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="hidden sm:inline">Pendistribusian</span>
                      </TabsTrigger>
                      <TabsTrigger value="keselamatan" className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span className="hidden sm:inline">Keselamatan</span>
                      </TabsTrigger>
                      <TabsTrigger value="keamanan" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span className="hidden sm:inline">Keamanan</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Pendistribusian */}
                    <TabsContent value="distribusi">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <Package className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-sm text-blue-900">
                              Checklist Pendistribusian Perlengkapan
                            </h3>
                            <p className="text-xs text-blue-700">
                              Pastikan semua perlengkapan sudah didistribusikan ke jamaah
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {currentJamaahChecklist.checklist
                            .filter((item) => item.category === "distribusi")
                            .map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${
                                  item.completed
                                    ? "bg-green-50 border-green-200"
                                    : "bg-white border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <Checkbox
                                  id={item.id}
                                  checked={item.completed}
                                  onCheckedChange={() =>
                                    toggleChecklistItem(
                                      currentJamaahChecklist.jamaahId,
                                      item.id
                                    )
                                  }
                                  className="mt-1"
                                />
                                <Label
                                  htmlFor={item.id}
                                  className={`flex-1 cursor-pointer ${
                                    item.completed
                                      ? "line-through text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.item}
                                </Label>
                                {item.completed && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Keselamatan */}
                    <TabsContent value="keselamatan">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <Heart className="w-5 h-5 text-red-600" />
                          <div>
                            <h3 className="font-semibold text-sm text-red-900">
                              Checklist Keselamatan Jamaah
                            </h3>
                            <p className="text-xs text-red-700">
                              Verifikasi keselamatan dan kesiapan kesehatan jamaah
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {currentJamaahChecklist.checklist
                            .filter((item) => item.category === "keselamatan")
                            .map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${
                                  item.completed
                                    ? "bg-green-50 border-green-200"
                                    : "bg-white border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <Checkbox
                                  id={item.id}
                                  checked={item.completed}
                                  onCheckedChange={() =>
                                    toggleChecklistItem(
                                      currentJamaahChecklist.jamaahId,
                                      item.id
                                    )
                                  }
                                  className="mt-1"
                                />
                                <Label
                                  htmlFor={item.id}
                                  className={`flex-1 cursor-pointer ${
                                    item.completed
                                      ? "line-through text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.item}
                                </Label>
                                {item.completed && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Keamanan */}
                    <TabsContent value="keamanan">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <div>
                            <h3 className="font-semibold text-sm text-purple-900">
                              Checklist Keamanan Jamaah
                            </h3>
                            <p className="text-xs text-purple-700">
                              Verifikasi dokumen dan keamanan perjalanan jamaah
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {currentJamaahChecklist.checklist
                            .filter((item) => item.category === "keamanan")
                            .map((item) => (
                              <div
                                key={item.id}
                                className={`flex items-start gap-3 p-4 border rounded-lg transition-all ${
                                  item.completed
                                    ? "bg-green-50 border-green-200"
                                    : "bg-white border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <Checkbox
                                  id={item.id}
                                  checked={item.completed}
                                  onCheckedChange={() =>
                                    toggleChecklistItem(
                                      currentJamaahChecklist.jamaahId,
                                      item.id
                                    )
                                  }
                                  className="mt-1"
                                />
                                <Label
                                  htmlFor={item.id}
                                  className={`flex-1 cursor-pointer ${
                                    item.completed
                                      ? "line-through text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.item}
                                </Label>
                                {item.completed && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Action Button */}
                  <div className="mt-6 pt-6 border-t">
                    <Button
                      className="w-full bg-gradient-to-r from-[#f4c430] via-[#ffd700] to-[#f4c430] text-black hover:opacity-90 shadow-lg shadow-[#f4c430]/50 font-bold"
                      disabled={
                        !currentJamaahChecklist.checklist.every((item) => item.completed)
                      }
                    >
                      <Plane className="w-4 h-4 mr-2" />
                      {currentJamaahChecklist.checklist.every((item) => item.completed)
                        ? "Jamaah Siap Berangkat ✓"
                        : "Selesaikan Checklist"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
