import React from 'react';
import { GiftIdea } from '../types';
import { X, Bookmark, ArrowRight, Trash2, Mail, ExternalLink, Lightbulb } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIdeas: GiftIdea[];
  onRemoveIdea: (id: string) => void;
  onSelectForGreeting: (title: string, category: string) => void;
  onClearAll: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedIdeas,
  onRemoveIdea,
  onSelectForGreeting,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-l border-[#F5CAD4] p-5 sm:p-6 text-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#F7E1E6]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF0F4] text-[#A84357] flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold text-[#3A1821]">
                  Ide Hadiah Tersimpan
                </h3>
                <p className="text-[11px] text-slate-500 tabular-nums">
                  {savedIdeas.length} kado dalam daftar impianmu
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of saved ideas */}
          {savedIdeas.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0F4] text-[#A84357] mx-auto flex items-center justify-center border border-[#F5CAD4]">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">Belum Ada Ide yang Disimpan</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Saat AI merekomendasikan kado, tekan tombol bookmark di pojok kanan kartu untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F7E1E6] py-3 max-h-[60vh] overflow-y-auto space-y-3">
              {savedIdeas.map((idea) => (
                <div key={idea.id} className="pt-3 pb-2 group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="font-bold text-[#A84357]">{idea.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-800 tabular-nums">
                          {idea.estimatedCost}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#3A1821] group-hover:text-[#A84357] transition-colors leading-snug">
                        {idea.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {idea.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveIdea(idea.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Hapus dari daftar simpan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {idea.studentFriendlyTip && (
                    <div className="mt-2 p-2 bg-[#FFF9FA] rounded-lg border border-[#F5CAD4] text-[11px] text-slate-600">
                      <span className="font-semibold text-[#8C3245]">Tips: </span>
                      {idea.studentFriendlyTip}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onSelectForGreeting(idea.title, idea.category);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-[11px] font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] rounded-lg transition-colors flex items-center gap-1.5 min-h-[34px]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Buatkan Kartu Ucapan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedIdeas.length > 0 && (
          <div className="pt-4 border-t border-[#F7E1E6] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
            >
              Hapus Semua
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#A84357] hover:bg-[#8C3245] rounded-xl transition-colors min-h-[38px]"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
