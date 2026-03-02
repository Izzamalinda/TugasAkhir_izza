import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  DollarSign,
  Calendar,
  FileText,
  Trash2,
  CheckCheck,
  Filter,
} from "lucide-react";
import { motion } from "motion/react";

type NotificationType = "success" | "warning" | "info" | "payment";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Pendaftaran Disetujui",
    message: "Pendaftaran Anda untuk Paket Umrah Reguler 12 Hari telah disetujui. Silakan lakukan pelunasan pembayaran.",
    date: "2024-02-15T10:30:00",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Pembayaran DP Diterima",
    message: "Pembayaran DP sebesar Rp 10.000.000 telah kami terima dan diverifikasi. Terima kasih.",
    date: "2024-02-14T14:20:00",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Jadwal Manasik",
    message: "Jadwal manasik untuk jamaah akan dilaksanakan pada tanggal 20 Februari 2024. Harap hadir tepat waktu.",
    date: "2024-02-13T09:15:00",
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Batas Pelunasan",
    message: "Batas waktu pelunasan pembayaran adalah 7 hari lagi (22 Februari 2024). Segera lakukan pembayaran.",
    date: "2024-02-12T16:45:00",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Dokumen Diterima",
    message: "Dokumen yang Anda upload telah diterima dan sedang dalam proses verifikasi.",
    date: "2024-02-11T11:00:00",
    read: true,
  },
  {
    id: "6",
    type: "success",
    title: "Verifikasi Dokumen Selesai",
    message: "Semua dokumen Anda telah diverifikasi dan dinyatakan lengkap. Terima kasih atas kerjasamanya.",
    date: "2024-02-10T13:30:00",
    read: true,
  },
];

export default function Notifikasi() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "warning":
        return <AlertCircle className="w-6 h-6 text-amber-400" />;
      case "payment":
        return <DollarSign className="w-6 h-6 text-[#f4c430]" />;
      case "info":
      default:
        return <Info className="w-6 h-6 text-blue-400" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-600";
      case "warning":
        return "from-amber-500 to-orange-600";
      case "payment":
        return "from-[#f4c430] to-[#d4a028]";
      case "info":
      default:
        return "from-blue-500 to-cyan-600";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Notifikasi</h1>
              <p className="text-gray-600">
                Pantau semua notifikasi dan update terbaru
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-lg px-4 py-2">
                {unreadCount} Baru
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={
                  filter === "all"
                    ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black"
                    : ""
                }
              >
                <Filter className="w-4 h-4 mr-2" />
                Semua ({notifications.length})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                onClick={() => setFilter("unread")}
                className={
                  filter === "unread"
                    ? "bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black"
                    : ""
                }
              >
                <Bell className="w-4 h-4 mr-2" />
                Belum Dibaca ({unreadCount})
              </Button>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="border-[#f4c430] text-[#f4c430] hover:bg-[#f4c430]/10"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Tandai Semua Dibaca
              </Button>
            )}
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={`border-gray-200 transition-all duration-300 hover:shadow-lg ${
                    !notif.read ? "bg-[#f4c430]/5 border-[#f4c430]/30" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getNotificationColor(
                          notif.type
                        )} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        {getNotificationIcon(notif.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-black">
                              {notif.title}
                            </h3>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-[#f4c430] rounded-full"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 whitespace-nowrap">
                            {new Date(notif.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <p className="text-gray-600 mb-4">{notif.message}</p>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {!notif.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notif.id)}
                              className="border-[#f4c430] text-[#f4c430] hover:bg-[#f4c430]/10"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Tandai Dibaca
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteNotification(notif.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="border-gray-200">
              <CardContent className="p-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-black">
                  {filter === "unread"
                    ? "Tidak Ada Notifikasi Baru"
                    : "Tidak Ada Notifikasi"}
                </h3>
                <p className="text-gray-500">
                  {filter === "unread"
                    ? "Semua notifikasi sudah dibaca"
                    : "Anda belum memiliki notifikasi"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
