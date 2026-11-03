import React, { useState } from 'react';
import { WRAPPING_OPTIONS } from '../data/hampers';
import { WrappingConfig } from '../types';
import { Sparkles, Check, ShoppingBag, Heart, Scissors, Package, Wand2 } from 'lucide-react';

interface WrappingServiceStudioProps {
  onAddWrappingToCart: (config: WrappingConfig, totalPrice: number) => void;
}

export const WrappingServiceStudio: React.FC<WrappingServiceStudioProps> = ({
  onAddWrappingToCart,
}) => {
  const [selectedPaper, setSelectedPaper] = useState(WRAPPING_OPTIONS.papers[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(WRAPPING_OPTIONS.ribbons[0]);
  const [selectedWaxSeal, setSelectedWaxSeal] = useState(WRAPPING_OPTIONS.waxSeals[0]);
  const [selectedAccent, setSelectedAccent] = useState(WRAPPING_OPTIONS.accents[0]);
  const [cardNote, setCardNote] = useState<string>('');
  const [isSuccessToast, setIsSuccessToast] = useState<boolean>(false);

  const baseLaborPrice = 15000; // Base professional wrapping fee
  const totalPrice =
    baseLaborPrice +
    selectedPaper.price +
    selectedRibbon.price +
    selectedWaxSeal.price +
    selectedAccent.price;

  // Preset combinations for quick aesthetic matching
  const applyPresetTheme = (theme: 'signature' | 'rustic' | 'luxury_gold' | 'sweet_lilac') => {
    if (theme === 'signature') {
      setSelectedPaper(WRAPPING_OPTIONS.papers[0]); // Blush pink matte
      setSelectedRibbon(WRAPPING_OPTIONS.ribbons[0]); // Rose gold satin
      setSelectedWaxSeal(WRAPPING_OPTIONS.waxSeals[0]); // Rose gold metallic
      setSelectedAccent(WRAPPING_OPTIONS.accents[0]); // Dried flowers
    } else if (theme === 'rustic') {
      setSelectedPaper(WRAPPING_OPTIONS.papers[2]); // Vintage kraft
      setSelectedRibbon(WRAPPING_OPTIONS.ribbons[3]); // Jute rope
      setSelectedWaxSeal(WRAPPING_OPTIONS.waxSeals[1]); // Gold leaf
      setSelectedAccent(WRAPPING_OPTIONS.accents[1]); // Cinnamon & orange
    } else if (theme === 'luxury_gold') {
      setSelectedPaper(WRAPPING_OPTIONS.papers[1]); // Ivory marble
      setSelectedRibbon(WRAPPING_OPTIONS.ribbons[1]); // Champagne gold
      setSelectedWaxSeal(WRAPPING_OPTIONS.waxSeals[1]); // Gold leaf
      setSelectedAccent(WRAPPING_OPTIONS.accents[0]); // Dried flowers
    } else if (theme === 'sweet_lilac') {
      setSelectedPaper(WRAPPING_OPTIONS.papers[3]); // Lilac pearl
      setSelectedRibbon(WRAPPING_OPTIONS.ribbons[2]); // White silk
      setSelectedWaxSeal(WRAPPING_OPTIONS.waxSeals[2]); // Pastel peach
      setSelectedAccent(WRAPPING_OPTIONS.accents[0]); // Dried flowers
    }
  };

  const handleOrderWrapping = () => {
    const config: WrappingConfig = {
      paper: selectedPaper,
      ribbon: selectedRibbon,
      waxSeal: selectedWaxSeal,
      accent: selectedAccent,
      cardNote,
    };
    onAddWrappingToCart(config, totalPrice);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 2500);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-left mb-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A84357] uppercase mb-1">
          <Scissors className="w-3.5 h-3.5" />
          <span>Peluang Bisnis & Layanan</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3A1821]">
          Studio Jasa Pembungkusan Hadiah KreasiKado
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Sudah punya hadiah sendiri tapi ingin kemasannya terlihat mewah layaknya hadiah butik? Pilih kombinasi kertas pastel, pita satin rose gold, dan segel lilin wax favoritmu di bawah ini.
        </p>
      </div>

      {/* Preset Inspirations Bar */}
      <div className="bg-[#FFF0F4] rounded-2xl p-3 sm:p-4 mb-8 border border-[#F5CAD4] flex flex-wrap items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-[#A84357] shrink-0" />
          <span className="text-xs font-bold text-[#8C3245]">Pilihan Tema Stylist KreasiKado:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPresetTheme('signature')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            🌸 Signature Rose Gold & Blush
          </button>
          <button
            type="button"
            onClick={() => applyPresetTheme('rustic')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            🍂 Rustic Kraft & Kayu Manis
          </button>
          <button
            type="button"
            onClick={() => applyPresetTheme('luxury_gold')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            ✨ Luxury Ivory Marble & Gold
          </button>
          <button
            type="button"
            onClick={() => applyPresetTheme('sweet_lilac')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            💜 Sweet Princess Lilac
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Customizer Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F5CAD4] p-5 sm:p-6 shadow-xs text-left space-y-6 relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-0.5 bg-[#A84357] text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
            Kustomisasi Kemasan
          </div>

          {/* Step 1: Paper */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Pilih Kertas Kado Premium
              </label>
              <span className="text-xs text-[#A84357] font-bold tabular-nums bg-[#FFF0F4] px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                + Rp {selectedPaper.price.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WRAPPING_OPTIONS.papers.map((paper) => (
                <button
                  type="button"
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    selectedPaper.id === paper.id
                      ? 'border-[#A84357] bg-[#FFF0F4] ring-1 ring-[#A84357] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-[#F5CAD4]'
                  }`}
                >
                  <div
                    className="w-full h-9 rounded-xl mb-2 border border-black/10 shadow-inner"
                    style={{ backgroundColor: paper.colorHex }}
                  />
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {paper.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                    {paper.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Ribbon */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Pilih Pita Aksen Mewah
              </label>
              <span className="text-xs text-[#A84357] font-bold tabular-nums bg-[#FFF0F4] px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                + Rp {selectedRibbon.price.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {WRAPPING_OPTIONS.ribbons.map((ribbon) => (
                <button
                  type="button"
                  key={ribbon.id}
                  onClick={() => setSelectedRibbon(ribbon)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedRibbon.id === ribbon.id
                      ? 'border-[#A84357] bg-[#FFF0F4] ring-1 ring-[#A84357] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-[#F5CAD4]'
                  }`}
                >
                  <div
                    className="w-full h-3 rounded-full mb-2 shadow-xs"
                    style={{ backgroundColor: ribbon.colorHex }}
                  />
                  <div className="text-xs font-bold text-slate-800 leading-tight">
                    {ribbon.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Wax Seal Stamp */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. Segel Lilin Asli (Wax Seal Stamp)
              </label>
              <span className="text-xs text-[#A84357] font-bold tabular-nums bg-[#FFF0F4] px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                + Rp {selectedWaxSeal.price.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {WRAPPING_OPTIONS.waxSeals.map((wax) => (
                <button
                  type="button"
                  key={wax.id}
                  onClick={() => setSelectedWaxSeal(wax)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedWaxSeal.id === wax.id
                      ? 'border-[#A84357] bg-[#FFF0F4] ring-1 ring-[#A84357] shadow-2xs'
                      : 'border-slate-200 bg-white hover:border-[#F5CAD4]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-4 h-4 rounded-full shadow-xs inline-block"
                      style={{ backgroundColor: wax.colorHex }}
                    />
                    <span className="text-xs font-bold text-slate-800">{wax.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">Motif: {wax.symbol}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Accent */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Aksen Bunga Kering / Ornamen
              </label>
              <span className="text-xs text-[#A84357] font-bold tabular-nums bg-[#FFF0F4] px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                {selectedAccent.price > 0
                  ? `+ Rp ${selectedAccent.price.toLocaleString('id-ID')}`
                  : 'Gratis'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {WRAPPING_OPTIONS.accents.map((accent) => (
                <button
                  type="button"
                  key={accent.id}
                  onClick={() => setSelectedAccent(accent)}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                    selectedAccent.id === accent.id
                      ? 'border-[#A84357] bg-[#FFF0F4] text-[#8C3245] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span>{accent.name}</span>
                  {selectedAccent.id === accent.id && (
                    <Check className="w-4 h-4 text-[#A84357]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Card Note */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              Nama Penerima di Hangtag Kado (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Dear Amanda, Happy Graduation!"
              value={cardNote}
              onChange={(e) => setCardNote(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
            />
          </div>
        </div>

        {/* Right Column: Interactive Live Box Visualizer & Price Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
            Simulasi Visual Kotak Kado 3D
          </div>

          {/* Real-time Interactive Visual Gift Box Container */}
          <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#FFF5F7] to-[#FCE8ED] border border-[#F5CAD4] shadow-md flex flex-col items-center justify-center min-h-[360px] overflow-hidden group">
            {/* The Box Body with Shadow */}
            <div className="relative group-hover:scale-105 transition-transform duration-500">
              {/* Bottom Ground Shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-pink-900/15 rounded-full blur-md" />

              {/* The Actual Box */}
              <div
                className="relative w-60 h-60 rounded-3xl shadow-2xl transition-all duration-500 flex items-center justify-center border border-black/10 overflow-hidden"
                style={{ backgroundColor: selectedPaper.colorHex }}
              >
                {/* Paper subtle texture */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Ribbon Vertical Bar */}
                <div
                  className="absolute top-0 bottom-0 w-9 shadow-md transition-colors duration-300"
                  style={{ backgroundColor: selectedRibbon.colorHex }}
                />

                {/* Ribbon Horizontal Bar */}
                <div
                  className="absolute left-0 right-0 h-9 shadow-md transition-colors duration-300"
                  style={{ backgroundColor: selectedRibbon.colorHex }}
                />

                {/* Ribbon Bow / Center Knot */}
                <div
                  className="absolute w-16 h-16 rounded-full opacity-90 blur-[0.5px] transition-colors duration-300"
                  style={{ backgroundColor: selectedRibbon.colorHex }}
                />

                {/* Dried Flower Sprig Illustration */}
                {selectedAccent.id === 'accent-dried-flowers' && (
                  <div className="absolute -top-1 -right-1 text-3xl select-none rotate-45 filter drop-shadow-md animate-gentle-float">
                    🌾
                  </div>
                )}
                {selectedAccent.id === 'accent-cinnamon-orange' && (
                  <div className="absolute top-1 right-1 text-3xl select-none rotate-12 filter drop-shadow-md">
                    🍊
                  </div>
                )}

                {/* Real Wax Seal Stamp Simulation in Center */}
                <div
                  className="relative z-10 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/70 transition-colors duration-300 text-white select-none cursor-pointer group-hover:rotate-6"
                  style={{ backgroundColor: selectedWaxSeal.colorHex }}
                  title={`Segel Lilin ${selectedWaxSeal.name}`}
                >
                  <Heart className="w-6 h-6 fill-white" />
                </div>
              </div>
            </div>

            {/* Note tag preview */}
            {cardNote && (
              <div className="mt-6 px-4 py-2 bg-white/95 backdrop-blur-md rounded-xl border border-[#F5CAD4] shadow-xs text-xs font-handwriting text-lg text-slate-800 max-w-xs truncate">
                "{cardNote}"
              </div>
            )}
          </div>

          {/* Price Calculation Card */}
          <div className="bg-white rounded-3xl border border-[#F5CAD4] p-5 sm:p-6 text-left shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Rincian Biaya Layanan:
            </h4>

            <div className="space-y-1.5 text-xs text-slate-600 border-b border-[#F7E1E6] pb-3">
              <div className="flex justify-between">
                <span>Jasa Pembungkusan Standar Butik</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  Rp {baseLaborPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Kertas {selectedPaper.name}</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  Rp {selectedPaper.price.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{selectedRibbon.name}</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  Rp {selectedRibbon.price.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{selectedWaxSeal.name}</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  Rp {selectedWaxSeal.price.toLocaleString('id-ID')}
                </span>
              </div>
              {selectedAccent.price > 0 && (
                <div className="flex justify-between">
                  <span>{selectedAccent.name}</span>
                  <span className="font-semibold text-slate-800 tabular-nums">
                    Rp {selectedAccent.price.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-slate-900">Total Biaya Bungkus:</span>
              <span className="text-xl font-extrabold text-[#A84357] tabular-nums">
                Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleOrderWrapping}
              className={`w-full py-3.5 px-4 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs min-h-[46px] ${
                isSuccessToast
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#A84357] text-white hover:bg-[#8C3245]'
              }`}
            >
              {isSuccessToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Jasa Bungkus Masuk ke Keranjang!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Jasa Bungkus Ini</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
