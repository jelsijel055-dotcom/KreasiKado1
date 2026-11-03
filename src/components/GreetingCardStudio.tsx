import React, { useState } from 'react';
import { Mail, Sparkles, Copy, Check, Printer, Heart, RefreshCw, Feather, Eye, RotateCw } from 'lucide-react';
import { GreetingCardData } from '../types';

interface GreetingCardStudioProps {
  initialRecipient?: string;
  initialOccasion?: string;
  onAttachCardToCart: (card: GreetingCardData, recipientName: string) => void;
}

export const GreetingCardStudio: React.FC<GreetingCardStudioProps> = ({
  initialRecipient = '',
  initialOccasion = 'Ulang Tahun',
  onAttachCardToCart,
}) => {
  const [recipientName, setRecipientName] = useState<string>(initialRecipient);
  const [senderName, setSenderName] = useState<string>('');
  const [occasion, setOccasion] = useState<string>(initialOccasion);
  const [tone, setTone] = useState<string>('sweet');
  const [relationship, setRelationship] = useState<string>('Sahabat');
  const [keyMemories, setKeyMemories] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<'rose-gold' | 'pastel-pink' | 'ivory-clean' | 'lavender-mist'>('rose-gold');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isAttached, setIsAttached] = useState<boolean>(false);
  const [cardViewMode, setCardViewMode] = useState<'inside' | 'outside'>('inside');

  // Default initial card data
  const [cardData, setCardData] = useState<GreetingCardData>({
    headline: 'Selamat Merayakan Momen Berharga! 💗',
    message: 'Semoga setiap lembar hari barumu senantiasa bermekaran dengan kebahagiaan, tawa yang menyejukkan hati, dan kemudahan dalam setiap impian yang kau tuju. Terima kasih sudah selalu hadir dengan ketulusan yang luar biasa.',
    quote: '"Hadiah terindah bukan tentang seberapa besar nilainya, melainkan ketulusan hati di balik senyumannya."',
    psMessage: 'P.S. Semoga kado kecil ini bisa membawa secercah senyum di harimu yang begitu istimewa! ✨',
    cardTheme: 'rose-gold',
  });

  const toneOptions = [
    { id: 'sweet', label: '💖 Manis & Tulus', desc: 'Hangat, penuh kasih sayang dan apresiasi mendalam' },
    { id: 'humorous', label: '😆 Santai & Lucu', desc: 'Akrab tanpa jaim khas obrolan tongkrongan mahasiswa' },
    { id: 'poetic', label: '📜 Puitis Estetik', desc: 'Sastra indah, diksi anggun, dan berkesan puitis' },
    { id: 'formal', label: '🕊️ Formal Berkelas', desc: 'Sopan dan santun untuk dosen, guru, atau senior' },
    { id: 'minimalist', label: '✨ Singkat & Bermakna', desc: 'Aesthetic one-liner untuk kartu mini tag' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsCopied(false);
    setIsAttached(false);

    try {
      const response = await fetch('/api/generate-greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: recipientName || 'Teman Baik',
          senderName: senderName || 'Sahabatmu',
          occasion,
          relationship,
          tone,
          keyMemories,
        }),
      });

      const data = await response.json();
      setCardData({
        headline: data.headline || `Happy ${occasion}!`,
        message: data.message || 'Semoga hari bahagiamu menyenangkan!',
        quote: data.quote || '"Kenangan terbaik terukir di dalam hati."',
        psMessage: data.psMessage || 'P.S. Jangan lupa tersenyum hari ini! 🎁',
        cardTheme: selectedTheme,
      });
      setCardViewMode('inside');
    } catch (err) {
      console.error('Error generating greeting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = `${cardData.headline}\n\n${cardData.message}\n\n${cardData.quote}\n\n${cardData.psMessage}\n\nDari: ${senderName || 'Sahabatmu'}`;
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAttach = () => {
    onAttachCardToCart(cardData, recipientName || 'Sahabat');
    setIsAttached(true);
    setTimeout(() => setIsAttached(false), 3000);
  };

  // Theme styling helpers
  const getThemeClasses = () => {
    switch (selectedTheme) {
      case 'rose-gold':
        return {
          cardBg: 'bg-gradient-to-br from-[#FFF9FB] via-[#FFF3F6] to-[#FCE8ED]',
          borderClass: 'rose-gold-foil-border',
          accentText: 'text-[#9E4559]',
          waxSealColor: 'bg-[#B76E79]',
          ribbonAccent: '#D88B97',
        };
      case 'pastel-pink':
        return {
          cardBg: 'bg-gradient-to-br from-[#FFF5F7] via-[#FFF0F4] to-[#FDE8ED]',
          borderClass: 'border-2 border-[#F8C1CE]',
          accentText: 'text-[#B04C62]',
          waxSealColor: 'bg-[#E5989B]',
          ribbonAccent: '#E8A5B5',
        };
      case 'ivory-clean':
        return {
          cardBg: 'bg-gradient-to-br from-[#FFFFFF] via-[#FDFCF8] to-[#F7F4EA]',
          borderClass: 'gold-foil-border',
          accentText: 'text-[#6B5E4B]',
          waxSealColor: 'bg-[#C9A356]',
          ribbonAccent: '#D4AF37',
        };
      case 'lavender-mist':
        return {
          cardBg: 'bg-gradient-to-br from-[#FAF7FD] via-[#F5EDFD] to-[#EFE5FC]',
          borderClass: 'border-2 border-[#DAC8F2]',
          accentText: 'text-[#7A5299]',
          waxSealColor: 'bg-[#9370DB]',
          ribbonAccent: '#B19CD9',
        };
    }
  };

  const themeStyle = getThemeClasses();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-left mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A84357] uppercase mb-1">
          <Feather className="w-3.5 h-3.5" />
          <span>Pembuat Kartu Ucapan AI</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3A1821]">
          Rangkai Kata Manis & Berkesan Otomatis
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Bingung menulis kata-kata ucapan di kartu kado? Pilih momen dan gaya bahasa, dan biarkan AI meracik pesan yang menyentuh, lucu, atau puitis lengkap dengan pratinjau kartu lipat estetik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-[#F5CAD4] shadow-xs text-left relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-0.5 bg-[#A84357] text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
            Studio Ucapan
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 pt-1">
            {/* Recipient & Sender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Untuk (Penerima)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dinda / Kak Ryan"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Dari (Pengirim)
                </label>
                <input
                  type="text"
                  placeholder="Nama kamu"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
                />
              </div>
            </div>

            {/* Momen & Relationship */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Momen Acara
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
                >
                  <option value="Ulang Tahun">Ulang Tahun</option>
                  <option value="Wisuda / Sidang Skripsi">Wisuda / Sidang Skripsi</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Ucapan Terima Kasih">Ucapan Terima Kasih</option>
                  <option value="Pernikahan / Wedding">Pernikahan / Wedding</option>
                  <option value="Hari Ibu / Hari Ayah">Hari Ibu / Hari Ayah</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Hubungan
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
                >
                  <option value="Sahabat Dekat">Sahabat Dekat</option>
                  <option value="Pacar / Pasangan">Pacar / Pasangan</option>
                  <option value="Teman Kampus / Sekelas">Teman Kampus / Sekelas</option>
                  <option value="Dosen Pembimbing">Dosen Pembimbing</option>
                  <option value="Keluarga / Saudara">Keluarga / Saudara</option>
                </select>
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Pilih Gaya Bahasa / Nada Bicara
              </label>
              <div className="space-y-1.5">
                {toneOptions.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`w-full p-2.5 text-left rounded-xl border transition-all flex items-center justify-between ${
                      tone === t.id
                        ? 'border-[#A84357] bg-[#FCE8ED] text-[#8C3245] shadow-2xs font-semibold'
                        : 'border-slate-200 bg-[#FFF9FA] text-slate-700 hover:border-[#F5CAD4]'
                    }`}
                  >
                    <div>
                      <div className="text-xs">{t.label}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{t.desc}</div>
                    </div>
                    {tone === t.id && <Check className="w-4 h-4 text-[#A84357] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Key memories or notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Kenangan Khusus / Kata Kunci (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Makasih udah nemenin nugas sampai subuh, selamat udah beres skripsi bab 5!"
                value={keyMemories}
                onChange={(e) => setKeyMemories(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
              />
            </div>

            {/* Card Aesthetic Theme */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Tema Desain & Kertas Kartu
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTheme('rose-gold')}
                  className={`p-2 text-center rounded-xl border text-[11px] font-medium transition-all ${
                    selectedTheme === 'rose-gold'
                      ? 'border-[#A84357] bg-[#FFF0F4] text-[#A84357] font-bold ring-1 ring-[#A84357] shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Rose Gold
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTheme('pastel-pink')}
                  className={`p-2 text-center rounded-xl border text-[11px] font-medium transition-all ${
                    selectedTheme === 'pastel-pink'
                      ? 'border-[#A84357] bg-[#FFF0F4] text-[#A84357] font-bold ring-1 ring-[#A84357] shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Blush Pink
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTheme('ivory-clean')}
                  className={`p-2 text-center rounded-xl border text-[11px] font-medium transition-all ${
                    selectedTheme === 'ivory-clean'
                      ? 'border-[#C9A356] bg-[#FFFDF7] text-[#8C6D2B] font-bold ring-1 ring-[#C9A356] shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Ivory Gold
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTheme('lavender-mist')}
                  className={`p-2 text-center rounded-xl border text-[11px] font-medium transition-all ${
                    selectedTheme === 'lavender-mist'
                      ? 'border-[#9370DB] bg-[#F7F2FD] text-[#6A43A8] font-bold ring-1 ring-[#9370DB] shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Lavender
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-[#C2586E] via-[#A84357] to-[#8C3245] rounded-xl hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#A84357]/20 min-h-[46px]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Sedang Merangkai Kalimat...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Rangkai Ucapan Otomatis AI 💌</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Aesthetic Live Card Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-left">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pratinjau Kartu Fisik Realistis
            </span>

            {/* View Mode Toggle (Inside vs Envelope/Cover) */}
            <div className="flex items-center gap-1 p-1 bg-[#FFF0F4] rounded-xl border border-[#F5CAD4]">
              <button
                type="button"
                onClick={() => setCardViewMode('inside')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  cardViewMode === 'inside'
                    ? 'bg-white text-[#A84357] shadow-2xs'
                    : 'text-slate-600 hover:text-[#A84357]'
                }`}
              >
                Isi Surat
              </button>
              <button
                type="button"
                onClick={() => setCardViewMode('outside')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  cardViewMode === 'outside'
                    ? 'bg-white text-[#A84357] shadow-2xs'
                    : 'text-slate-600 hover:text-[#A84357]'
                }`}
              >
                Sampul & Segel Lilin
              </button>
            </div>
          </div>

          {/* INSIDE VIEW: The Heartwarming Greeting Card */}
          {cardViewMode === 'inside' && (
            <div
              id="printable-greeting-card"
              className={`relative rounded-3xl p-6 sm:p-9 ${themeStyle.borderClass} ${themeStyle.cardBg} paper-watercolor shadow-xl shadow-pink-900/8 text-left transition-all duration-300 min-h-[400px] flex flex-col justify-between`}
            >
              {/* Subtle Foil Vignette Line */}
              <div className="absolute inset-3 border border-[#E8A5B5]/35 rounded-2xl pointer-events-none" />

              {/* Decorative Corner Ornaments */}
              <div className="absolute top-5 left-5 text-sm text-[#A84357]/40 font-serif-display select-none">
                ❧
              </div>
              <div className="absolute top-5 right-5 text-sm text-[#A84357]/40 font-serif-display select-none">
                ☙
              </div>

              {/* Top Card Headline */}
              <div className="relative z-10 pt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-extrabold tracking-widest uppercase ${themeStyle.accentText}`}>
                    {occasion.toUpperCase()}
                  </span>

                  {/* Wax Seal Simulation */}
                  <div
                    className={`w-9 h-9 rounded-full ${themeStyle.waxSealColor} text-white shadow-md flex items-center justify-center text-xs font-bold border-2 border-white/60 select-none animate-gentle-float`}
                    title="Segel Lilin KreasiKado"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#3A1821] tracking-tight mb-4 leading-snug">
                  {cardData.headline}
                </h3>

                {/* Main Message Prose */}
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                  {cardData.message}
                </p>

                {/* Quote */}
                {cardData.quote && (
                  <div className="mt-5 pl-3.5 border-l-2 border-[#D88B97] italic text-xs text-slate-600">
                    {cardData.quote}
                  </div>
                )}
              </div>

              {/* Footer with PS and Handwritten Signature */}
              <div className="relative z-10 mt-6 pt-4 border-t border-black/5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="text-xs text-slate-600 italic">
                  {cardData.psMessage}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-sans">Dengan cinta & doa,</span>
                  <span className="font-handwriting text-2xl font-bold text-[#5E222F]">
                    {senderName || 'Sahabatmu'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* OUTSIDE VIEW: Elegant Envelope & Wax Stamp Cover */}
          {cardViewMode === 'outside' && (
            <div
              className={`relative rounded-3xl p-8 sm:p-12 ${themeStyle.borderClass} ${themeStyle.cardBg} paper-linen shadow-xl shadow-pink-900/8 text-center transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center`}
            >
              {/* Envelope Flap Fold Line Simulation */}
              <div className="w-full max-w-sm border-b-2 border-dashed border-[#D88B97]/50 mb-6" />

              {/* Big Realistic Wax Stamp with Ripple */}
              <div className="relative my-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-md opacity-25 animate-pulse" />
                <div
                  className={`w-20 h-20 rounded-full ${themeStyle.waxSealColor} shadow-xl flex flex-col items-center justify-center text-white border-4 border-white/70 select-none`}
                >
                  <Heart className="w-8 h-8 fill-white mb-0.5" />
                  <span className="text-[9px] font-bold tracking-widest uppercase">KREASIKADO</span>
                </div>
              </div>

              <div className="mt-6 text-center space-y-1">
                <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Khusus Untuk:
                </span>
                <h4 className="font-serif-display text-2xl font-bold text-[#3A1821]">
                  {recipientName || 'Sosok Istimewa'}
                </h4>
                <p className="text-xs text-[#A84357] font-medium">
                  {occasion} · Disegel dengan Penuh Cinta
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCardViewMode('inside')}
                className="mt-6 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#F5CAD4] hover:bg-[#FFF0F4] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-[#A84357]" />
                <span>Buka Isi Surat</span>
              </button>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-[#F5CAD4] hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs min-h-[40px]"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Salin Teks Ucapan</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-[#F5CAD4] hover:bg-slate-50 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs min-h-[40px]"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Cetak Kartu</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleAttach}
              className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 min-h-[40px] shadow-xs ${
                isAttached
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#A84357] text-white hover:bg-[#8C3245]'
              }`}
            >
              {isAttached ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Kartu Terpasang di Keranjang!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Pasang Kartu Ini ke Pesanan Kado</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
