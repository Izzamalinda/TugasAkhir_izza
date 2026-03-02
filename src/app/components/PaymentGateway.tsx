import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CreditCard, Wallet, Building2, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  customerName: string;
  onSuccess: (paymentData: PaymentResult) => void;
}

export interface PaymentResult {
  orderId: string;
  paymentMethod: string;
  amount: number;
  transactionId: string;
  status: "success" | "pending" | "failed";
  paidAt: string;
}

export default function PaymentGateway({
  isOpen,
  onClose,
  amount,
  orderId,
  customerName,
  onSuccess,
}: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentMethods = [
    {
      id: "credit_card",
      name: "Kartu Kredit/Debit",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB",
      fee: 0,
      instant: true,
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: Wallet,
      description: "Bayar dengan GoPay",
      fee: 0,
      instant: true,
    },
    {
      id: "qris",
      name: "QRIS",
      icon: Wallet,
      description: "Scan QR untuk bayar",
      fee: 0,
      instant: true,
    },
    {
      id: "virtual_account",
      name: "Virtual Account",
      icon: Building2,
      description: "BCA, BNI, BRI, Mandiri",
      fee: 4000,
      instant: false,
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // Simulasi proses payment gateway (dalam real case ini akan hit Midtrans/Xendit API)
    setTimeout(() => {
      const paymentResult: PaymentResult = {
        orderId: orderId,
        paymentMethod: selectedMethod,
        amount: amount,
        transactionId: `TRX${Date.now()}`,
        status: "success",
        paidAt: new Date().toISOString(),
      };

      setIsProcessing(false);
      setPaymentSuccess(true);

      // Auto close and callback after 2 seconds
      setTimeout(() => {
        onSuccess(paymentResult);
        onClose();
        setPaymentSuccess(false);
        setSelectedMethod(null);
      }, 2000);
    }, 3000); // Simulasi 3 detik processing
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Pembayaran Otomatis</DialogTitle>
          <DialogDescription>
            Pilih metode pembayaran dan selesaikan transaksi secara otomatis
          </DialogDescription>
        </DialogHeader>

        {!paymentSuccess ? (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-[#e8f5e0] border-[#6b9944]">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Nama</span>
                  <span className="font-medium">{customerName}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-[#6b9944]">
                      {formatRupiah(amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pilih Metode Pembayaran
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                        selectedMethod === method.id
                          ? "border-[#6b9944] bg-[#e8f5e0]"
                          : "border-gray-200 hover:border-[#6b9944]/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-6 h-6 flex-shrink-0 ${
                            selectedMethod === method.id
                              ? "text-[#6b9944]"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{method.name}</span>
                            {method.instant && (
                              <Badge className="text-xs bg-green-100 text-green-700">
                                Otomatis
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {method.description}
                          </p>
                          {method.fee > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              +Biaya Admin: {formatRupiah(method.fee)}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Pembayaran Aman & Terverifikasi Otomatis</p>
                  <p className="text-blue-700">
                    Kami menggunakan payment gateway terpercaya (Midtrans). Pembayaran Anda akan
                    langsung terverifikasi secara otomatis tanpa perlu upload bukti transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isProcessing}
              >
                Batal
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!selectedMethod || isProcessing}
                className="flex-1 bg-[#6b9944] hover:bg-[#5a8337]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>Bayar Sekarang</>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-green-600">
              Pembayaran Berhasil!
            </h3>
            <p className="text-gray-600 mb-4">
              Pembayaran Anda telah terverifikasi secara otomatis
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Transaction ID:</span>
              <span className="font-mono font-medium">TRX{Date.now()}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
