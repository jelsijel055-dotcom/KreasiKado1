import React, { useState } from 'react';
import { BUDGET_TIERS } from '../data/hampers';
import { DollarSign, PieChart, Sparkles, Check, ArrowRight, Heart, Gift, Quote, Award } from 'lucide-react';

interface BudgetExplorerProps {
  onSelectBudgetToRecommender: (range: string, max: number) => void;
  onExploreHampers: () => void;
}

export const BudgetExplorer: React.FC<BudgetExplorerProps> = ({
  onSelectBudgetToRecommender,
  onExploreHampers,
}) => {
  const [activeTierId, setActiveTierId] = useState<string>('student');
  const [calculatorBudget, setCalculatorBudget] = useState<number>(75000);

  const selectedTier = BUDGET_TIERS.find((t) => t.id === activeTierId) || BUDGET_TIERS[0];

  // Golden Gift Formula: 70% main gift, 15% wrapping/ribbon, 15% card & sweets
  const mainGiftAmount = Math.round(calculatorBudget * 0.7);
  const wrappingAmount = Math.round(calculatorBudget * 0.15);
  const cardTreatAmount = Math.round(calculatorBudget * 0.15);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-left mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A84357] uppercase mb-1">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Perencana Anggaran Kado</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3A1821]">
          Pilihan Hadiah Sesuai Anggaran
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Kado berkesan tidak harus mahal. Temukan inspirasi hadiah terkurasi untuk setiap rentang dana—dari budget uang jajan pelajar hingga paket hampers wisuda lengkap.
        </p>
      </div>

      {/* Tier Switcher Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#F5CAD4] pb-4">
        {BUDGET_TIERS.map((tier) => {
          const isActive = tier.id === activeTierId;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTierId(tier.id)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-2xl transition-all whitespace-nowrap min-h-[42px] flex items-center gap-2 ${
                isActive
                  ? 'bg-[#A84357] text-white shadow-sm font-bold'
                  : 'bg-[#FFF0F4] text-slate-700 hover:bg-[#FCE8ED]'
              }`}
            >
              <span>{tier.title}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-lg ${
                  isActive ? 'bg-white/20 text-white font-bold' : 'bg-white text-[#A84357] font-semibold'
                }`}
              >
                {tier.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tier Details & Curated Ideas */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="bg-white rounded-3xl border border-[#F5CAD4] p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F7E1E6] pb-4 mb-5">
              <div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3A1821]">
                  {selectedTier.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {selectedTier.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onSelectBudgetToRecommender(selectedTier.id, selectedTier.maxPrice)
                }
                className="px-4 py-2 text-xs font-semibold text-white bg-[#A84357] hover:bg-[#8C3245] rounded-xl transition-all whitespace-nowrap self-start min-h-[38px] flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rekomendasikan dengan AI</span>
              </button>
            </div>

            {/* List of Curated Ideas for this Tier */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedTier.ideas.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9FA] rounded-2xl border border-[#F5CAD4] p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:border-[#E8A5B5] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#A84357] font-bold text-[11px]">{item.category}</span>
                      <span className="font-extrabold text-slate-900 tabular-nums bg-white px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                        {item.cost}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#3A1821] group-hover:text-[#A84357] transition-colors mb-2 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F5CAD4]/60 flex items-center justify-between text-[11px] text-[#8C3245] font-semibold">
                    <span>Ide #{idx + 1}</span>
                    <span className="text-emerald-700">✓ Rekomendasi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Success Story Quote Banner */}
          <div className="bg-gradient-to-r from-[#FFF0F4] via-[#FDE8ED] to-[#FFF9FA] border border-[#F5CAD4] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left relative overflow-hidden shadow-2xs">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8C3245]">
                <Award className="w-4 h-4 text-[#A84357]" />
                <span>Kisah Nyata Mahasiswa</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "Cuma keluar 35 ribu buat toples dan cetak foto polaroid di kampus, sahabatku malah nangis terharu waktu sidang skripsi. Ternyata kado berkesan itu soal ceritanya, bukan harganya."
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                — Nabila S., Mahasiswi Tingkat Akhir (Jakarta)
              </p>
            </div>
            <button
              onClick={onExploreHampers}
              className="px-4 py-2.5 text-xs font-semibold text-[#8C3245] bg-white border border-[#F5CAD4] hover:bg-slate-50 rounded-xl transition-colors whitespace-nowrap min-h-[40px] shadow-2xs"
            >
              Lihat Paket Jadi
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Budget Allocator Calculator */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#F5CAD4] p-5 sm:p-6 shadow-xs text-left space-y-5 relative">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FCE8ED] text-[#A84357] flex items-center justify-center">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#3A1821]">Kalkulator Alokasi Budget</h3>
              <p className="text-[11px] text-slate-500">Formula Kado Ideal (70 - 15 - 15)</p>
            </div>
          </div>

          {/* Input Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Masukkan Total Anggaranmu:
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">Rp</span>
              <input
                type="number"
                step="5000"
                min="10000"
                max="2000000"
                value={calculatorBudget}
                onChange={(e) => setCalculatorBudget(Number(e.target.value) || 0)}
                className="w-full pl-10 pr-3 py-2.5 text-sm font-bold text-slate-800 border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA] tabular-nums"
              />
            </div>

            {/* Quick quick buttons */}
            <div className="flex gap-1.5 mt-2">
              {[35000, 75000, 150000, 250000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setCalculatorBudget(amt)}
                  className={`text-[11px] py-1 px-2.5 rounded-lg border transition-all whitespace-nowrap tabular-nums ${
                    calculatorBudget === amt
                      ? 'border-[#A84357] bg-[#FCE8ED] text-[#A84357] font-bold shadow-2xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Rp {(amt / 1000).toLocaleString('id-ID')}k
                </button>
              ))}
            </div>
          </div>

          {/* Visual Color Split Bar */}
          <div>
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 mb-2 shadow-inner">
              <div className="bg-[#A84357] h-full" style={{ width: '70%' }} title="Barang Utama 70%" />
              <div className="bg-[#E68A9F] h-full" style={{ width: '15%' }} title="Kemasan & Pita 15%" />
              <div className="bg-[#ECC8AF] h-full" style={{ width: '15%' }} title="Kartu Ucapan 15%" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="text-[#A84357] font-bold">● Kado Utama (70%)</span>
              <span className="text-[#E68A9F] font-bold">● Kemasan (15%)</span>
              <span className="text-[#B07B57] font-bold">● Kartu (15%)</span>
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="space-y-3 pt-1">
            {/* 70% Main item */}
            <div className="bg-[#FFF0F4] rounded-2xl p-3.5 border border-[#F5CAD4]/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">1. Barang Utama (70%)</span>
                <span className="font-extrabold text-[#A84357] tabular-nums">
                  Rp {mainGiftAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Buku, tumbler pastel, baju, lilin aromaterapi, atau barang hobi.
              </p>
            </div>

            {/* 15% Wrapping */}
            <div className="bg-[#FFF9FA] rounded-2xl p-3.5 border border-[#F5CAD4]/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">2. Kemasan & Pita (15%)</span>
                <span className="font-bold text-slate-700 tabular-nums">
                  Rp {wrappingAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Box karton, kertas kado blush, pita satin rose gold & segel lilin.
              </p>
            </div>

            {/* 15% Card & Mini treats */}
            <div className="bg-[#FFF9FA] rounded-2xl p-3.5 border border-[#F5CAD4]/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800">3. Kartu & Mini Treats (15%)</span>
                <span className="font-bold text-slate-700 tabular-nums">
                  Rp {cardTreatAmount.toLocaleString('id-ID')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Kartu ucapan AI KreasiKado + permen/cokelat mini favorit.
              </p>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={() => onSelectBudgetToRecommender('custom', calculatorBudget)}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#C2586E] to-[#A84357] hover:opacity-95 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 min-h-[42px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cari Ide dengan Budget Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
};
