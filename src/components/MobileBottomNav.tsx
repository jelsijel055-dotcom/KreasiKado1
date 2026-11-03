import React from 'react';
import { Sparkles, Wallet, Mail, Gift, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}) => {
  return (
    <nav
      aria-label="Navigasi Bawah Mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9FA]/95 backdrop-blur-lg border-t border-[#F5CAD4] safe-area-bottom shadow-lg shadow-pink-900/5"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        <button
          onClick={() => setActiveTab('rekomendasi')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'rekomendasi' ? 'text-[#A84357]' : 'text-slate-500'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Ide AI
          </span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'budget' ? 'text-[#A84357]' : 'text-slate-500'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Budget
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ucapan')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'ucapan' ? 'text-[#A84357]' : 'text-slate-500'
          }`}
        >
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Ucapan
          </span>
        </button>

        <button
          onClick={() => setActiveTab('hampers')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'hampers' || activeTab === 'bungkus'
              ? 'text-[#A84357]'
              : 'text-slate-500'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Paket
          </span>
        </button>

        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] relative text-slate-500 active:text-[#A84357] transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#A84357] text-white text-[9px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Keranjang
          </span>
        </button>
      </div>
    </nav>
  );
};
