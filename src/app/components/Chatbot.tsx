import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Assalamualaikum! Selamat datang di Ardaya Travel. Ada yang bisa saya bantu?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const botResponses: Record<string, string> = {
    halo: "Wa'alaikumsalam! Bagaimana saya bisa membantu Anda hari ini?",
    paket: "Kami memiliki berbagai paket umrah mulai dari Paket Hemat, Reguler, Plus Turkey, hingga Ramadhan. Anda bisa melihat detailnya di menu Paket Umrah.",
    harga: "Harga paket umrah kami mulai dari Rp 20 juta untuk paket hemat. Untuk info lebih detail, silakan klik menu Paket Umrah atau hubungi kami di 0812-3456-7890.",
    pembayaran: "Kami menerima pembayaran melalui transfer bank dan payment gateway. Anda bisa melakukan pembayaran secara bertahap atau cicilan.",
    dokumen: "Dokumen yang diperlukan: KTP, KK, Passport (jika ada), Foto 4x6, dan Buku Vaksin. Semua akan dibantu oleh tim kami.",
    jadwal: "Jadwal keberangkatan tersedia setiap bulan. Untuk melihat jadwal lengkap, silakan pilih paket yang Anda minati.",
    kontak: "Anda bisa menghubungi kami melalui WhatsApp di 0812-3456-7890, email di info@ardayatravel.com, atau telp (021) 1234-5678.",
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "Maaf, saya kurang memahami pertanyaan Anda. Silakan hubungi customer service kami di 0812-3456-7890 untuk informasi lebih lanjut.";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-[#f4c430] hover:scale-105 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all ring-2 ring-[#f4c430]/20"
        >
          <MessageSquare className="w-6 h-6 text-[#f4c430]" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[540px] z-50 shadow-2xl rounded-lg overflow-hidden ring-2 ring-[#f4c430]/15">
          <Card className="h-full flex flex-col bg-black/80 backdrop-blur-sm text-white">
            <CardHeader className="bg-black/95 text-white flex-none border-b border-[#f4c430]/10 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <CardTitle className="text-white">
                    Ardaya Assistant
                  </CardTitle>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-[#f4c430]/10 rounded p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-white/80 mt-1">
                AI Assistant - Siap membantu Anda
              </p>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-[#f4c430] text-black shadow-md"
                        : "bg-gray-800 text-white border border-gray-700"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-black/60"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="p-4 border-t border-[#f4c430]/10 bg-black/95 flex-none">
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Ketik pesan..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-gray-900 text-white placeholder-gray-400 border border-gray-800 rounded-md px-3 py-2"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-[#f4c430] to-[#d4a028] text-black hover:brightness-95 shadow-md"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Tanya tentang: paket, harga, pembayaran, dokumen, jadwal, kontak
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
