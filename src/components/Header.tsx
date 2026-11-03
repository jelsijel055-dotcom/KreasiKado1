import React from 'react';
import { ShoppingBag, Sparkles, Gift, Heart, Bookmark } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  savedCount: number;
  openWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  savedCount,
  openWishlist,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFF9FA]/90 backdrop-blur-md border-b border-[#F7D8E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (One single clean element) */}
        <button
          onClick={() => setActiveTab('rekomendasi')}
          className="flex items-center gap-2 text-left group shrink-0 focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E68A9F] to-[#FAD2E1] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif-display text-xl font-bold tracking-tight text-[#4A202A] group-hover:text-[#BD6B7A] transition-colors">
              KreasiKado
            </span>
            <span className="text-xs text-[#BD6B7A] font-semibold ml-1">💗</span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Single-line, concise text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('rekomendasi')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'rekomendasi'
                ? 'text-[#A84357] font-semibold border-b-2 border-[#A84357]'
                : 'text-slate-600 hover:text-[#A84357]'
            }`}
          >
            Ide Hadiah AI
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'budget'
                ? 'text-[#A84357] font-semibold border-b-2 border-[#A84357]'
                : 'text-slate-600 hover:text-[#A84357]'
            }`}
          >
            Pilihan Budget
          </button>
          <button
            onClick={() => setActiveTab('ucapan')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'ucapan'
                ? 'text-[#A84357] font-semibold border-b-2 border-[#A84357]'
                : 'text-slate-600 hover:text-[#A84357]'
            }`}
          >
            Kartu Ucapan AI
          </button>
          <button
            onClick={() => setActiveTab('hampers')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'hampers'
                ? 'text-[#A84357] font-semibold border-b-2 border-[#A84357]'
                : 'text-slate-600 hover:text-[#A84357]'
            }`}
          >
            Paket Kado
          </button>
          <button
            onClick={() => setActiveTab('bungkus')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'bungkus'
                ? 'text-[#A84357] font-semibold border-b-2 border-[#A84357]'
                : 'text-slate-600 hover:text-[#A84357]'
            }`}
          >
            Jasa Bungkus Kado
          </button>
        </nav>

        {/* Zone 3: Primary Action (Wishlist & Shopping Bag) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={openWishlist}
            aria-label="Lihat ide kado tersimpan"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-[#FFF0F4] border border-[#F5CAD4] text-[#A84357] transition-all active:scale-95 shadow-2xs"
            title="Daftar Kado Disimpan"
          >
            <Bookmark className="w-4 h-4 fill-current" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A84357] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={openCart}
            aria-label="Keranjang belanja kado"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#5A2330] bg-[#FCE8ED] hover:bg-[#F8D4DE] active:scale-95 border border-[#F5C2CE] rounded-xl transition-all shadow-xs whitespace-nowrap shrink-0 min-h-[44px]"
          >
            <ShoppingBag className="w-4 h-4 text-[#A84357]" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#A84357] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
