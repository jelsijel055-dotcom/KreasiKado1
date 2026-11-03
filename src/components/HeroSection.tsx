import React from 'react';
import { Sparkles, Heart, ArrowRight, ShieldCheck, DollarSign, Gift } from 'lucide-react';

interface HeroSectionProps {
  onStartRecommender: () => void;
  onStartGreeting: () => void;
  onExploreHampers: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartRecommender,
  onStartGreeting,
  onExploreHampers,
}) => {
  const [isSurpriseOpen, setIsSurpriseOpen] = React.useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF0F4] via-[#FFF8F9] to-transparent pt-8 pb-14 border-b border-[#F5CAD4]/60">
      {/* Background ambient sparkles & silk curves */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FCD3DE]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-gradient-to-tr from-[#F8D2DB]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Cute top kicker with ribbon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-[#F5CAD4] shadow-2xs">
              <span className="text-xs">🎀</span>
              <span className="text-xs font-semibold text-[#8C3245] tracking-wide">
                Asisten Hadiah Kreatif Berbasis AI
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3A1821] leading-[1.18] text-balance">
              Kado Istimewa Sesuai Anggaran, Disempurnakan oleh{' '}
              <span className="rose-gold-text">Kecerdasan AI 💗</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              KreasiKado membantu mahasiswa, pelajar, dan masyarakat umum menemukan ide hadiah unik, hemat biaya, dan menyentuh hati. Lengkap dengan rekomendasi sesuai budget, generator kartu ucapan otomatis, hingga paket hamper & jasa bungkus estetik bernuansa pastel rose gold.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartRecommender}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#C2586E] via-[#A84357] to-[#8C3245] hover:opacity-95 rounded-xl shadow-md shadow-[#C2586E]/25 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap min-h-[46px] group"
              >
                <Sparkles className="w-4 h-4 text-[#FCE8ED] group-hover:rotate-12 transition-transform" />
                <span>Temukan Ide Kado AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onStartGreeting}
                className="px-5 py-3.5 text-sm font-semibold text-[#662030] bg-white hover:bg-[#FCE8ED] border border-[#F4BAC7] rounded-xl active:scale-95 transition-all whitespace-nowrap min-h-[46px] shadow-2xs"
              >
                💌 Buat Kartu Ucapan AI
              </button>

              <button
                onClick={onExploreHampers}
                className="px-5 py-3.5 text-sm font-semibold text-slate-700 hover:text-[#A84357] transition-colors whitespace-nowrap min-h-[46px]"
              >
                Katalog Paket Kado
              </button>
            </div>

            {/* Clean unboxed proof points (Zero-Pill discipline) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-4 border-t border-[#F5CAD4]/60">
              <span className="text-[#A84357] font-semibold">KreasiKado Solusi</span>
              <span aria-hidden="true">·</span>
              <span>Ramah Kantong Pelajar &lt; Rp 50.000</span>
              <span aria-hidden="true">·</span>
              <span>Kado DIY & Rekomendasi Siap Jadi</span>
              <span aria-hidden="true">·</span>
              <span>Kirim Cepat via WhatsApp</span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image with Interactive Unboxing Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/15 border border-[#F5CAD4] bg-white group">
              <img
                src="/src/assets/images/hero_gift_hamper_1793505635462.jpg"
                alt="Presentasi hampers kado mewah bernuansa pastel pink dan rose gold"
                referrerPolicy="no-referrer"
                className="w-full h-[330px] sm:h-[400px] lg:h-[430px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold tracking-wider uppercase text-rose-200">
                  Kemasan Butik Hadiah
                </span>
                <p className="text-sm font-medium mt-1 text-slate-100">
                  Hardbox blush pink, pita satin rose gold, dan segel lilin eksklusif.
                </p>
              </div>
            </div>

            {/* Interactive Surprise Kado Floating Card */}
            <div
              onClick={() => setIsSurpriseOpen(!isSurpriseOpen)}
              className="cursor-pointer absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-[#F5CAD4] flex items-center gap-3.5 max-w-xs hover:border-[#E68A9F] transition-all hover:scale-102"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E68A9F] to-[#FAD2E1] flex items-center justify-center text-white shrink-0 shadow-xs animate-gentle-float">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="text-left text-xs">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <span>Klik untuk Kejutan!</span>
                  <span className="text-[#A84357]">✨</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {isSurpriseOpen
                    ? '💡 Ide: Memory Jar Polaroid (Rp 25.000)'
                    : 'Butuh inspirasi kilat? Sentuh di sini.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
