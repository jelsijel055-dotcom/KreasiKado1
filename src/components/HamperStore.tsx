import React, { useState } from 'react';
import { HAMPERS_CATALOG } from '../data/hampers';
import { HamperProduct } from '../types';
import { ShoppingBag, Star, Check, ArrowRight, Eye, Sparkles, Search, SlidersHorizontal, Package, Heart } from 'lucide-react';

interface HamperStoreProps {
  onAddToCart: (product: HamperProduct) => void;
  onOpenWrappingCustomizer: () => void;
}

export const HamperStore: React.FC<HamperStoreProps> = ({
  onAddToCart,
  onOpenWrappingCustomizer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');
  const [activeModalProduct, setActiveModalProduct] = useState<HamperProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter products by category and search query
  const filteredProducts = HAMPERS_CATALOG.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory ||
      (product.tags && product.tags.includes(selectedCategory));

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.itemsIncluded.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended order
  });

  const handleAdd = (product: HamperProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return HAMPERS_CATALOG.length;
    return HAMPERS_CATALOG.filter(
      (p) => p.category === catId || (p.tags && p.tags.includes(catId))
    ).length;
  };

  const categoryTabs = [
    { id: 'all', label: `Semua Kado (${getCategoryCount('all')})` },
    { id: 'lucu', label: `✨ Lucu & Gemas (${getCategoryCount('lucu')})` },
    { id: 'wisuda', label: `🎓 Wisuda & Sidang (${getCategoryCount('wisuda')})` },
    { id: 'birthday', label: `🎂 Ulang Tahun (${getCategoryCount('birthday')})` },
    { id: 'budget', label: `💸 Pelajar < 50k (${getCategoryCount('budget')})` },
    { id: 'bunga', label: `🌷 Bunga & Rajut (${getCategoryCount('bunga')})` },
    { id: 'coffee', label: `☕ Kopi & Nugas (${getCategoryCount('coffee')})` },
    { id: 'anniversary', label: `💖 Romantis (${getCategoryCount('anniversary')})` },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-left mb-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#A84357] uppercase mb-1">
          <Package className="w-3.5 h-3.5" />
          <span>Katalog Lengkap KreasiKado</span>
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#3A1821]">
          Pilihan Paket Kado Siap Kirim
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Pilih dari berbagai koleksi hampers terkurasi: mulai dari kado lucu anabul kucing, buket bunga tulip rajut, lampu tidur squishy, set jurnal estetik, hingga hampers wisuda lengkap.
        </p>
      </div>

      {/* 3-Step Simple Guide Card (Sangat Mudah Dipahami) */}
      <div className="bg-[#FFF0F4] rounded-2xl p-4 sm:p-5 mb-8 border border-[#F5CAD4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#A84357] text-white text-xs font-bold flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Pilih Paket Kado</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Cari kado yang sesuai dengan momen dan anggaranmu.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#A84357] text-white text-xs font-bold flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Tulis Kartu Ucapan AI</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Kartu ucapan dipersonalisasi gratis dan dipasang rapi di kado.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-full bg-[#A84357] text-white text-xs font-bold flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Kirim & Siap Dibanggakan</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dikirim kurir kampus, ekspedisi reguler, atau ambil langsung.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Cari kado: kucing, tulip, kelinci, jurnal, kopi, mawar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-[#F5CAD4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A84357] bg-white shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sorting & Wrapping CTA */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs border border-[#F5CAD4] rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#A84357] text-slate-700 shadow-2xs"
          >
            <option value="recommended">Urutkan: Rekomendasi</option>
            <option value="price_low">Harga: Termurah</option>
            <option value="price_high">Harga: Tertinggi</option>
            <option value="rating">Rating Tertinggi</option>
          </select>

          <button
            onClick={onOpenWrappingCustomizer}
            className="px-3.5 py-2 text-xs font-semibold text-[#8C3245] bg-[#FCE8ED] hover:bg-[#F8D4DE] border border-[#F5CAD4] rounded-xl transition-colors whitespace-nowrap min-h-[38px] shadow-2xs flex items-center gap-1.5"
          >
            <span>🎀 Studio Jasa Bungkus</span>
          </button>
        </div>
      </div>

      {/* Expanded Category Filter Buttons (All have multiple options) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none text-left">
        {categoryTabs.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 min-h-[38px] ${
                isActive
                  ? 'bg-[#A84357] text-white shadow-xs font-bold'
                  : 'bg-white border border-[#F5CAD4] text-slate-700 hover:bg-[#FFF0F4]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#F5CAD4] p-12 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800">Tidak ada kado yang cocok dengan kata kunci</p>
          <p className="text-xs text-slate-500">Coba ubah kata pencarian atau pilih kategori lain.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#A84357] bg-[#FFF0F4] rounded-xl"
          >
            Tampilkan Semua Kado
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 text-left">
          {sortedProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => setActiveModalProduct(product)}
                className="bg-white rounded-3xl border border-[#F5CAD4] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#E8A5B5] transition-all flex flex-col justify-between cursor-pointer group"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#FFF5F7]">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#A84357] rounded-xl shadow-xs border border-white/40">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span className="uppercase tracking-wider font-bold text-[#A84357] text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-slate-700 font-bold tabular-nums">
                          {product.rating}
                        </span>
                        <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif-display font-bold text-base text-[#3A1821] group-hover:text-[#A84357] transition-colors leading-snug line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-4 pt-3.5 border-t border-[#F7E1E6] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-extrabold text-slate-900 tabular-nums">
                        Rp {product.price.toLocaleString('id-ID')}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through tabular-nums">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[38px] shadow-2xs ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#A84357] text-white hover:bg-[#8C3245]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Masuk!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-[#F5CAD4] text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
            >
              ✕
            </button>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-50 border border-[#F5CAD4]">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-[#A84357] uppercase tracking-wider">
                {activeModalProduct.category}
              </span>
              <span className="text-slate-400">Dimensi: {activeModalProduct.dimensions}</span>
            </div>

            <h3 className="font-serif-display text-xl font-bold text-[#3A1821]">
              {activeModalProduct.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{activeModalProduct.subtitle}</p>

            <div className="my-4 py-3 border-y border-[#F7E1E6] flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Harga Paket Siap Kirim:</span>
                <span className="text-xl font-extrabold text-[#A84357] tabular-nums">
                  Rp {activeModalProduct.price.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="text-xs text-slate-600">
                Paling pas untuk: <b>{activeModalProduct.bestFor}</b>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Isi Dalam Paket (What's Inside):
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeModalProduct.itemsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#A84357] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAdd(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#A84357] hover:bg-[#8C3245] rounded-xl shadow-xs transition-colors min-h-[42px] flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambahkan ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
