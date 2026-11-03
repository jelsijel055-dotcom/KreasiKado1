import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Heart } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutComplete: (deliveryMethod: string, deliveryFee: number, customerName: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutComplete,
}) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'campus' | 'regular' | 'pickup'>('campus');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getDeliveryFee = () => {
    if (deliveryMethod === 'campus') return 10000;
    if (deliveryMethod === 'regular') return 15000;
    return 0; // pickup
  };

  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    let message = `*🌸 FORMULIR PESANAN KREASIKADO 🌸*\n\n`;
    message += `*Nama Pemesan:* ${customerName || 'Pelanggan'}\n`;
    message += `*Nomor WhatsApp:* ${customerPhone || '-'}\n`;
    message += `*Metode Pengiriman:* ${
      deliveryMethod === 'campus'
        ? 'Kurir Kampus (Sameday)'
        : deliveryMethod === 'regular'
        ? 'Ekspedisi Reguler'
        : 'Ambil di Studio KreasiKado'
    }\n\n`;

    message += `*RINCIAN KADO:*\n`;
    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.customTitle || item.product?.title} (x${item.quantity}) - Rp ${(
        item.price * item.quantity
      ).toLocaleString('id-ID')}\n`;
      if (item.customGreeting) {
        message += `   💌 _Pesan Kartu:_ "${item.customGreeting.headline}"\n`;
      }
      if (item.customWrapping) {
        message += `   🎀 _Bungkus:_ Kertas ${item.customWrapping.paper.name}, ${item.customWrapping.ribbon.name}\n`;
      }
    });

    message += `\n*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}\n`;
    message += `*Ongkir:* Rp ${deliveryFee.toLocaleString('id-ID')}\n`;
    message += `*TOTAL PEMBAYARAN:* Rp ${total.toLocaleString('id-ID')}\n\n`;
    message += `Mohon konfirmasi ketersediaan dan detail pembayarannya ya min. Terima kasih KreasiKado! 💗`;

    const encoded = encodeURI(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleSimulateInvoice = () => {
    const deliveryLabel =
      deliveryMethod === 'campus'
        ? 'Kurir Kampus / Sameday'
        : deliveryMethod === 'regular'
        ? 'Ekspedisi Reguler'
        : 'Ambil Sendiri di Studio';
    onCheckoutComplete(deliveryLabel, deliveryFee, customerName);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-l border-[#F5CAD4] p-5 sm:p-6 text-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#F7E1E6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A84357]" />
              <h3 className="font-serif-display text-lg font-bold text-[#3A1821]">
                Keranjang Kado
              </h3>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                ({items.length} item)
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF0F4] text-[#A84357] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">Keranjang Kado Masih Kosong</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Pilih paket kado siap kirim, jasa bungkus, atau simpan kartu ucapan yang baru kamu buat.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] rounded-xl transition-colors"
              >
                Mulai Belanja Kado
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#F7E1E6] py-3 max-h-[42vh] overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3 items-start">
                  {item.product?.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#F5CAD4] shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">
                      {item.customTitle || item.product?.title}
                    </h4>

                    {item.customGreeting && (
                      <p className="text-[10px] text-[#A84357] italic mt-0.5">
                        💌 Kartu ucapan terpasang
                      </p>
                    )}

                    {item.customWrapping && (
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        🎀 {item.customWrapping.paper.name}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-bold text-slate-900 tabular-nums">
                        Rp {item.price.toLocaleString('id-ID')}
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customer & Delivery Options */}
          {items.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-[#F7E1E6]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase">
                    Nama Kamu
                  </label>
                  <input
                    type="text"
                    placeholder="Nama lengkap"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#F5CAD4] rounded-lg bg-[#FFF9FA]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase">
                    No WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="08xxxxxxxxxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs border border-[#F5CAD4] rounded-lg bg-[#FFF9FA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                  Opsi Pengiriman
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('campus')}
                    className={`p-2 rounded-lg border text-left text-[10px] transition-all ${
                      deliveryMethod === 'campus'
                        ? 'border-[#A84357] bg-[#FFF0F4] font-bold text-[#A84357]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div>Kurir Kampus</div>
                    <div className="tabular-nums font-semibold">Rp 10.000</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('regular')}
                    className={`p-2 rounded-lg border text-left text-[10px] transition-all ${
                      deliveryMethod === 'regular'
                        ? 'border-[#A84357] bg-[#FFF0F4] font-bold text-[#A84357]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div>Reguler</div>
                    <div className="tabular-nums font-semibold">Rp 15.000</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-2 rounded-lg border text-left text-[10px] transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#A84357] bg-[#FFF0F4] font-bold text-[#A84357]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div>Ambil Studio</div>
                    <div className="font-semibold text-emerald-600">Gratis</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Checkout Actions */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-[#F7E1E6] space-y-3">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Pengiriman</span>
                <span className="tabular-nums">Rp {deliveryFee.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1">
                <span>Total</span>
                <span className="text-[#A84357] tabular-nums text-base">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[42px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Cepat via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateInvoice}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] border border-[#F5CAD4] rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[42px]"
              >
                <span>Simulasi Konfirmasi & Cetak Nota</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
