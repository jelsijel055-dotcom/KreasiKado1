import React from 'react';
import { CartItem } from '../types';
import { CheckCircle2, Printer, Heart, ArrowRight } from 'lucide-react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  deliveryMethod: string;
  deliveryFee: number;
  customerName: string;
  orderNumber: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  deliveryMethod,
  deliveryFee,
  customerName,
  orderNumber,
}) => {
  if (!isOpen) return null;

  const total = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#F5CAD4] text-left relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Status */}
        <div className="text-center pb-5 border-b border-[#F7E1E6]">
          <div className="w-12 h-12 rounded-full bg-[#FFF0F4] border border-[#F5CAD4] text-[#A84357] mx-auto flex items-center justify-center mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-[#A84357] uppercase">
            Pesanan Berhasil Disiapkan
          </span>
          <h3 className="font-serif-display text-2xl font-bold text-[#3A1821] mt-0.5">
            Nota Pesanan KreasiKado
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Nomor Pesanan: <strong className="text-slate-800 tabular-nums">{orderNumber}</strong>
          </p>
        </div>

        {/* Customer & Delivery Info */}
        <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#F7E1E6] text-xs">
          <div>
            <span className="text-slate-400 block">Pemesan:</span>
            <span className="font-bold text-slate-800">{customerName || 'Pelanggan Setia'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Metode Pengiriman:</span>
            <span className="font-bold text-slate-800">{deliveryMethod}</span>
          </div>
        </div>

        {/* Itemized List */}
        <div className="py-4 border-b border-[#F7E1E6] space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Rincian Hadiah:
          </span>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-xs">
              <div className="max-w-[70%]">
                <p className="font-semibold text-slate-800">
                  {item.customTitle || item.product?.title || 'Paket Kado'}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Jumlah: {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                </p>
                {item.customGreeting && (
                  <p className="text-[10px] text-[#A84357] italic">
                    + Kartu Ucapan Khusus Terlampir
                  </p>
                )}
                {item.customWrapping && (
                  <p className="text-[10px] text-slate-500">
                    + Kertas {item.customWrapping.paper.name} & {item.customWrapping.ribbon.name}
                  </p>
                )}
              </div>
              <span className="font-bold text-slate-900 tabular-nums">
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="py-4 space-y-1.5 text-xs text-slate-600 border-b border-[#F7E1E6]">
          <div className="flex justify-between">
            <span>Subtotal Kado</span>
            <span className="tabular-nums">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Pengiriman</span>
            <span className="tabular-nums">Rp {deliveryFee.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between pt-2 text-sm font-bold text-slate-900">
            <span>Total Pembayaran</span>
            <span className="text-[#A84357] text-base tabular-nums">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Packing Promise Note */}
        <div className="bg-[#FFF9FA] rounded-xl p-3 border border-[#F5CAD4] my-4 text-xs text-slate-600 flex items-start gap-2">
          <Heart className="w-4 h-4 text-[#A84357] shrink-0 mt-0.5" />
          <p>
            Setiap paket kado dibungkus dengan double bubble wrap, box tebal pelindung, dan segel lilin wax asli agar tiba dalam kondisi sempurna dan siap dipamerkan.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-1.5 min-h-[40px]"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Nota</span>
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-semibold text-white bg-[#A84357] hover:bg-[#8C3245] rounded-xl transition-colors min-h-[40px]"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
