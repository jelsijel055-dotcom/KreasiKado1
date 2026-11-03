import React, { useState } from 'react';
import { Sparkles, DollarSign, Heart, Lightbulb, Bookmark, ArrowRight, Check, Package, RefreshCw, Wand2, Compass } from 'lucide-react';
import { GiftIdea } from '../types';

interface GiftRecommenderProps {
  onSelectForGreeting: (giftTitle: string, recipientName: string, occasion: string) => void;
  onExploreStore: () => void;
  savedIdeas: GiftIdea[];
  onToggleSaveIdea: (idea: GiftIdea) => void;
}

export const GiftRecommender: React.FC<GiftRecommenderProps> = ({
  onSelectForGreeting,
  onExploreStore,
  savedIdeas,
  onToggleSaveIdea,
}) => {
  const [recipient, setRecipient] = useState<string>('Sahabat');
  const [customRecipient, setCustomRecipient] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Ulang Tahun');
  const [budgetRange, setBudgetRange] = useState<string>('student');
  const [budgetMax, setBudgetMax] = useState<number>(50000);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(['Estetik & Seni', 'Kopi & Cafe']);
  const [vibe, setVibe] = useState<string>('Estetik & Berkesan');
  const [notes, setNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ideas, setIdeas] = useState<GiftIdea[]>([]);
  const [creativeAdvice, setCreativeAdvice] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const recipientOptions = [
    'Sahabat',
    'Pacar / Pasangan',
    'Teman Kampus / Sekelas',
    'Dosen / Guru',
    'Orang Tua',
    'Saudara',
    'Lainnya',
  ];

  const occasionOptions = [
    'Ulang Tahun',
    'Wisuda / Sidang Skripsi',
    'Anniversary',
    'Ucapan Terima Kasih',
    'Hari Guru / Dosen',
    'Hari Ibu / Ayah',
  ];

  const hobbyOptions = [
    'Estetik & Seni',
    'Kopi & Cafe',
    'Belajar & Buku',
    'Fashion & Skincare',
    'Musik & Gadget',
    'Masak & Baking',
    'Olahraga & Sehat',
    'Nonton & Drakor',
  ];

  const vibeOptions = [
    'Estetik & Berkesan',
    'Lucu & Menyenangkan',
    'Romantis & Manis',
    'Sangat Berguna / Praktis',
    'Elegan & Mewah',
  ];

  const handleBudgetPreset = (preset: 'student' | 'low' | 'medium' | 'high') => {
    setBudgetRange(preset);
    if (preset === 'student') setBudgetMax(50000);
    else if (preset === 'low') setBudgetMax(150000);
    else if (preset === 'medium') setBudgetMax(300000);
    else if (preset === 'high') setBudgetMax(500000);
  };

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  // Quick preset template for 1-click test
  const applyQuickPreset = (presetType: 'wisuda_teman' | 'pacar_ultah' | 'dosen_terimakasih') => {
    if (presetType === 'wisuda_teman') {
      setRecipient('Teman Kampus / Sekelas');
      setOccasion('Wisuda / Sidang Skripsi');
      setBudgetRange('student');
      setBudgetMax(50000);
      setSelectedHobbies(['Belajar & Buku', 'Kopi & Cafe']);
      setVibe('Lucu & Menyenangkan');
      setNotes('Suka barang praktis dan butuh penyemangat pasca sidang');
    } else if (presetType === 'pacar_ultah') {
      setRecipient('Pacar / Pasangan');
      setOccasion('Ulang Tahun');
      setBudgetRange('low');
      setBudgetMax(150000);
      setSelectedHobbies(['Estetik & Seni', 'Fashion & Skincare']);
      setVibe('Romantis & Manis');
      setNotes('Suka nuansa warna blush pink dan aroma lilin wangi');
    } else if (presetType === 'dosen_terimakasih') {
      setRecipient('Dosen / Guru');
      setOccasion('Ucapan Terima Kasih');
      setBudgetRange('low');
      setBudgetMax(120000);
      setSelectedHobbies(['Belajar & Buku']);
      setVibe('Elegan & Mewah');
      setNotes('Dosen pembimbing skripsi yang sangat membantu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const finalRecipient = recipient === 'Lainnya' && customRecipient ? customRecipient : recipient;
      const response = await fetch('/api/recommend-gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: finalRecipient,
          occasion,
          budgetRange,
          budgetMax,
          hobbies: selectedHobbies,
          vibe,
          notes,
        }),
      });

      const data = await response.json();
      setIdeas(data.recommendations || []);
      setCreativeAdvice(data.creativeAdvice || '');
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWithToast = (idea: GiftIdea) => {
    onToggleSaveIdea(idea);
    const isAlreadySaved = savedIdeas.some((item) => item.id === idea.id);
    setToastMessage(isAlreadySaved ? 'Dihapus dari daftar simpan' : '✨ Ide kado disimpan ke wishlist!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#3A1821] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#FAD2E1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-left mb-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A84357] uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kecerdasan Buatan KreasiKado</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3A1821]">
          Rekomendasi Ide Hadiah Kreatif Sesuai Anggaran
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Jawab beberapa pertanyaan di bawah, dan AI KreasiKado akan menyusun rekomendasi hadiah unik lengkap dengan estimasi biaya, tips hemat mahasiswa, dan saran bungkus estetik.
        </p>
      </div>

      {/* Quick Autofill Presets for Fast Browsing */}
      <div className="bg-[#FFF0F4] rounded-2xl p-3 sm:p-4 mb-8 border border-[#F5CAD4] flex flex-wrap items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-[#A84357] shrink-0" />
          <span className="text-xs font-bold text-[#8C3245]">Coba Contoh Cepat:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyQuickPreset('wisuda_teman')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            🎓 Teman Sidang Skripsi (&lt; 50k)
          </button>
          <button
            type="button"
            onClick={() => applyQuickPreset('pacar_ultah')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            💖 Ulang Tahun Pacar (150k)
          </button>
          <button
            type="button"
            onClick={() => applyQuickPreset('dosen_terimakasih')}
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#FCE8ED] text-slate-700 rounded-lg border border-[#F5CAD4] transition-colors whitespace-nowrap min-h-[34px]"
          >
            🕊️ Hadiah Dosen Pembimbing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Questionnaire */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-[#F5CAD4] shadow-xs text-left relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-0.5 bg-[#A84357] text-white text-[10px] font-bold tracking-wider uppercase rounded-full shadow-xs">
            Formulir AI
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left pt-1">
            {/* Question 1: Recipient */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Untuk Siapa Hadiah Ini?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {recipientOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setRecipient(opt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap min-h-[36px] ${
                      recipient === opt
                        ? 'bg-[#A84357] text-white shadow-xs font-semibold'
                        : 'bg-[#FFF0F4] text-slate-700 hover:bg-[#FCE8ED]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {recipient === 'Lainnya' && (
                <input
                  type="text"
                  placeholder="Sebutkan penerima (misal: Teman kantor / Keponakan)"
                  value={customRecipient}
                  onChange={(e) => setCustomRecipient(e.target.value)}
                  className="mt-2 w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
                />
              )}
            </div>

            {/* Question 2: Occasion */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Momen Spesial
              </label>
              <div className="flex flex-wrap gap-1.5">
                {occasionOptions.map((occ) => (
                  <button
                    type="button"
                    key={occ}
                    onClick={() => setOccasion(occ)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap min-h-[36px] ${
                      occasion === occ
                        ? 'bg-[#A84357] text-white shadow-xs font-semibold'
                        : 'bg-[#FFF0F4] text-slate-700 hover:bg-[#FCE8ED]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Budget Range & Max Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  3. Batas Anggaran (Budget)
                </label>
                <span className="text-xs font-extrabold text-[#A84357] tabular-nums bg-[#FFF0F4] px-2 py-0.5 rounded-lg border border-[#F5CAD4]">
                  Rp {budgetMax.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Quick preset chips */}
              <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => handleBudgetPreset('student')}
                  className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border text-center transition-all whitespace-nowrap ${
                    budgetRange === 'student'
                      ? 'border-[#A84357] bg-[#FCE8ED] text-[#A84357] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  &lt; 50 Ribu
                </button>
                <button
                  type="button"
                  onClick={() => handleBudgetPreset('low')}
                  className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border text-center transition-all whitespace-nowrap ${
                    budgetRange === 'low'
                      ? 'border-[#A84357] bg-[#FCE8ED] text-[#A84357] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  50-150 Ribu
                </button>
                <button
                  type="button"
                  onClick={() => handleBudgetPreset('medium')}
                  className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border text-center transition-all whitespace-nowrap ${
                    budgetRange === 'medium'
                      ? 'border-[#A84357] bg-[#FCE8ED] text-[#A84357] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  150-300 Ribu
                </button>
                <button
                  type="button"
                  onClick={() => handleBudgetPreset('high')}
                  className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border text-center transition-all whitespace-nowrap ${
                    budgetRange === 'high'
                      ? 'border-[#A84357] bg-[#FCE8ED] text-[#A84357] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  &gt; 300 Ribu
                </button>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="20000"
                max="500000"
                step="10000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full accent-[#A84357] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Rp 20.000</span>
                <span>Rp 500.000</span>
              </div>
            </div>

            {/* Question 4: Hobbies / Interests */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                4. Hobi atau Minat Penerima
              </label>
              <div className="flex flex-wrap gap-1.5">
                {hobbyOptions.map((h) => {
                  const isSelected = selectedHobbies.includes(h);
                  return (
                    <button
                      type="button"
                      key={h}
                      onClick={() => toggleHobby(h)}
                      className={`px-3 py-1 text-xs font-medium rounded-xl border transition-all whitespace-nowrap min-h-[34px] ${
                        isSelected
                          ? 'border-[#A84357] bg-[#FCE8ED] text-[#8C3245] font-bold shadow-2xs'
                          : 'border-slate-200 bg-[#FFF9FA] text-slate-600 hover:border-[#F5CAD4]'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 5: Vibe & Tone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                5. Kesan / Vibe Kado
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {vibeOptions.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`px-3 py-2 text-xs text-left rounded-xl transition-all whitespace-nowrap min-h-[38px] ${
                      vibe === v
                        ? 'bg-[#A84357] text-white font-bold shadow-xs'
                        : 'bg-[#FFF0F4] text-slate-700 hover:bg-[#FCE8ED]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Dia suka warna lilac, lagi sering begadang nyelesaiin skripsi bab 4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-[#FFF9FA]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-[#C2586E] via-[#A84357] to-[#8C3245] rounded-xl hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#A84357]/20 min-h-[46px]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Sedang Meracik Ide Kado...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Dapatkan Rekomendasi Hadiah AI ✨</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Results & Ideas Display */}
        <div className="lg:col-span-7 space-y-4">
          {ideas.length === 0 && !isLoading && (
            <div className="bg-[#FFF5F7] rounded-3xl border border-dashed border-[#F5CAD4] p-8 sm:p-10 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-white mx-auto flex items-center justify-center text-[#A84357] shadow-sm animate-gentle-float">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#3A1821]">
                Temukan Kado Terbaik Tanpa Bingung
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Pilih kriteria di formulir sebelah kiri atau coba salah satu contoh cepat di atas. AI KreasiKado akan menyajikan ide hadiah unik, estimasi harga, cara buat sendiri, dan rekomendasi kertas & pita.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 text-xs font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] rounded-xl transition-all shadow-2xs"
              >
                Coba Rekomendasi Hadiah Sekarang
              </button>
            </div>
          )}

          {isLoading && (
            <div className="bg-white rounded-3xl border border-[#F5CAD4] p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] border border-[#F5CAD4] mx-auto flex items-center justify-center text-[#A84357] animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif-display text-xl font-bold text-[#3A1821]">
                  Menemukan Ide Hadiah Terbaik...
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Menganalisis anggaran Rp {budgetMax.toLocaleString('id-ID')}, momen {occasion}, dan minat penerima.
                </p>
              </div>
            </div>
          )}

          {ideas.length > 0 && !isLoading && (
            <>
              {/* Creative Advice Banner */}
              {creativeAdvice && (
                <div className="bg-[#FFF0F4] border border-[#F5CAD4] rounded-2xl p-4 sm:p-5 text-left flex items-start gap-3 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#A84357] shrink-0 shadow-2xs">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#8C3245]">Sentuhan KreasiKado: </span>
                    <span className="text-slate-700 leading-relaxed">{creativeAdvice}</span>
                  </div>
                </div>
              )}

              {/* List of Recommended Ideas */}
              <div className="space-y-4 text-left">
                {ideas.map((idea, index) => {
                  const isSaved = savedIdeas.some((item) => item.id === idea.id);
                  return (
                    <div
                      key={idea.id || index}
                      className="bg-white rounded-3xl border border-[#F5CAD4] p-5 sm:p-6 shadow-xs hover:border-[#E8A5B5] hover:shadow-md transition-all relative group"
                    >
                      {/* Top Row: Category and Estimated Price */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="font-bold text-[#A84357]">{idea.category}</span>
                          {idea.difficulty && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[11px] font-semibold text-slate-600 bg-[#FFF0F4] px-2 py-0.5 rounded-md border border-[#F5CAD4]">
                                {idea.difficulty}
                              </span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-400">Pilihan #{index + 1}</span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-900 tabular-nums bg-[#FFF9FA] px-2.5 py-1 rounded-lg border border-[#F5CAD4]">
                          {idea.estimatedCost}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#3A1821] group-hover:text-[#A84357] transition-colors">
                        {idea.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {idea.description}
                      </p>

                      {/* Reasons & Tips */}
                      <div className="mt-4 pt-3.5 border-t border-[#F7E1E6] space-y-2.5 text-xs">
                        <div className="text-slate-600">
                          <strong className="text-slate-800">Kenapa cocok: </strong>
                          {idea.whyItFits}
                        </div>

                        {idea.studentFriendlyTip && (
                          <div className="bg-[#FFF9FA] p-3 rounded-xl border border-[#F5CAD4] text-slate-700">
                            <strong className="text-[#8C3245]">🎓 Tips Mahasiswa Hemat: </strong>
                            {idea.studentFriendlyTip}
                          </div>
                        )}

                        {idea.suggestedWrapping && (
                          <div className="text-slate-600">
                            <strong className="text-slate-800">🎀 Rekomendasi Bungkus: </strong>
                            {idea.suggestedWrapping}
                          </div>
                        )}
                      </div>

                      {/* Action buttons on card */}
                      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() =>
                            onSelectForGreeting(
                              idea.title,
                              recipient === 'Lainnya' ? customRecipient || 'Sahabat' : recipient,
                              occasion
                            )
                          }
                          className="px-3.5 py-2 text-xs font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap min-h-[38px]"
                        >
                          <span>💌 Buat Kartu Ucapan untuk Kado Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveWithToast(idea)}
                            className={`px-3 py-2 text-xs rounded-xl border transition-all flex items-center gap-1.5 min-h-[38px] ${
                              isSaved
                                ? 'bg-[#A84357] text-white border-[#A84357] font-semibold'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            title="Simpan ide ke wishlist"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom discovery strip */}
              <div className="bg-[#FFF0F4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-left border border-[#F5CAD4]">
                <div>
                  <p className="text-xs font-bold text-[#8C3245]">Butuh Kado Siap Kirim Tanpa Ribet?</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Lihat koleksi hampers wisuda & ulang tahun KreasiKado lengkap dengan kemasan hardbox & kartu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onExploreStore}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#A84357] hover:bg-[#8C3245] rounded-xl transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                >
                  Katalog Paket Kado
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
