import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { GiftRecommender } from './components/GiftRecommender';
import { BudgetExplorer } from './components/BudgetExplorer';
import { GreetingCardStudio } from './components/GreetingCardStudio';
import { HamperStore } from './components/HamperStore';
import { WrappingServiceStudio } from './components/WrappingServiceStudio';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { InvoiceModal } from './components/InvoiceModal';
import { CartItem, HamperProduct, WrappingConfig, GreetingCardData, GiftIdea } from './types';
import { Heart, Sparkles, Gift } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('rekomendasi');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);
  const [savedIdeas, setSavedIdeas] = useState<GiftIdea[]>([
    {
      id: 'init-1',
      title: 'Aesthetic Memories Explosion Box & Polaroid',
      category: 'DIY Kreatif',
      estimatedCost: 'Rp 35.000 - Rp 65.000',
      estimatedCostNumber: 45000,
      description: 'Kotak lipat hexagonal berisi 6 cetak foto polaroid kenangan manis, pesan tersembunyi, dan permen kesukaannya.',
      whyItFits: 'Sangat personal, penuh kenangan manis, dan biaya bahan sangat ramah di kantong.',
      studentFriendlyTip: 'Bisa dicetak di tempat print foto digital dekat kampus seharga 1000/lembar.',
      suggestedWrapping: 'Pita satin rose gold tipis dan segel lilin pink blush.',
    },
  ]);

  const [lastInvoiceData, setLastInvoiceData] = useState<{
    items: CartItem[];
    subtotal: number;
    deliveryMethod: string;
    deliveryFee: number;
    customerName: string;
    orderNumber: string;
  } | null>(null);

  // Cross-tab transfer states
  const [greetingRecipient, setGreetingRecipient] = useState<string>('');
  const [greetingOccasion, setGreetingOccasion] = useState<string>('Ulang Tahun');

  // Load saved ideas from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kreasikado_saved_ideas');
      if (stored) {
        setSavedIdeas(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Save to localStorage when changed
  const saveIdeasToStorage = (newIdeas: GiftIdea[]) => {
    setSavedIdeas(newIdeas);
    try {
      localStorage.setItem('kreasikado_saved_ideas', JSON.stringify(newIdeas));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleToggleSaveIdea = (idea: GiftIdea) => {
    const exists = savedIdeas.some((item) => item.id === idea.id);
    if (exists) {
      saveIdeasToStorage(savedIdeas.filter((item) => item.id !== idea.id));
    } else {
      saveIdeasToStorage([...savedIdeas, idea]);
    }
  };

  const handleRemoveSavedIdea = (id: string) => {
    saveIdeasToStorage(savedIdeas.filter((item) => item.id !== id));
  };

  const handleClearAllSavedIdeas = () => {
    saveIdeasToStorage([]);
  };

  // Add standard product to cart
  const handleAddToCart = (product: HamperProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product?.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product?.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          type: 'hamper',
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  // Add custom wrapping service to cart
  const handleAddWrappingToCart = (config: WrappingConfig, totalPrice: number) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `wrapping-${Date.now()}`,
        customWrapping: config,
        type: 'wrapping_only',
        customTitle: `Jasa Bungkus: ${config.paper.name} & ${config.ribbon.name}`,
        price: totalPrice,
        quantity: 1,
      },
    ]);
  };

  // Attach greeting card to cart
  const handleAttachCardToCart = (card: GreetingCardData, recipientName: string) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `card-${Date.now()}`,
        customGreeting: card,
        type: 'bundle',
        customTitle: `Kartu Ucapan AI untuk ${recipientName}: "${card.headline}"`,
        price: 15000,
        quantity: 1,
        giftRecipientName: recipientName,
      },
    ]);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckoutComplete = (
    deliveryMethod: string,
    deliveryFee: number,
    customerName: string
  ) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderNumber = `KK-${Math.floor(1000 + Math.random() * 9000)}`;

    setLastInvoiceData({
      items: [...cartItems],
      subtotal,
      deliveryMethod,
      deliveryFee,
      customerName: customerName || 'Pelanggan Setia KreasiKado',
      orderNumber,
    });

    setIsCartOpen(false);
    setIsInvoiceOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9FA] text-[#2D2124]">
      {/* 1. Header with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        savedCount={savedIdeas.length}
        openWishlist={() => setIsWishlistOpen(true)}
      />

      {/* 2. Hero Section (shown on home / recommendation tab) */}
      {activeTab === 'rekomendasi' && (
        <HeroSection
          onStartRecommender={() => {
            const el = document.getElementById('recommender-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onStartGreeting={() => setActiveTab('ucapan')}
          onExploreHampers={() => setActiveTab('hampers')}
        />
      )}

      {/* 3. Main Views */}
      <main className="flex-1 pb-20 md:pb-12">
        {activeTab === 'rekomendasi' && (
          <div id="recommender-form">
            <GiftRecommender
              onSelectForGreeting={(giftTitle, recipient, occ) => {
                setGreetingRecipient(recipient);
                setGreetingOccasion(occ);
                setActiveTab('ucapan');
              }}
              onExploreStore={() => setActiveTab('hampers')}
              savedIdeas={savedIdeas}
              onToggleSaveIdea={handleToggleSaveIdea}
            />
          </div>
        )}

        {activeTab === 'budget' && (
          <BudgetExplorer
            onSelectBudgetToRecommender={(range, max) => {
              setActiveTab('rekomendasi');
            }}
            onExploreHampers={() => setActiveTab('hampers')}
          />
        )}

        {activeTab === 'ucapan' && (
          <GreetingCardStudio
            initialRecipient={greetingRecipient}
            initialOccasion={greetingOccasion}
            onAttachCardToCart={handleAttachCardToCart}
          />
        )}

        {activeTab === 'hampers' && (
          <HamperStore
            onAddToCart={handleAddToCart}
            onOpenWrappingCustomizer={() => setActiveTab('bungkus')}
          />
        )}

        {activeTab === 'bungkus' && (
          <WrappingServiceStudio onAddWrappingToCart={handleAddWrappingToCart} />
        )}
      </main>

      {/* 4. Quiet, refined footer (anti-slop, no fake telemetry) */}
      <footer className="border-t border-[#F5CAD4]/80 bg-white/70 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#E68A9F] flex items-center justify-center text-white">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-display font-bold text-slate-800 text-sm">
              KreasiKado 💗
            </span>
            <span className="text-slate-400">·</span>
            <span>Ide Hadiah Kreatif & Berkesan Sesuai Anggaran</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span>Didesain untuk iOS & Android</span>
            <span aria-hidden="true">·</span>
            <span>Ramah Mahasiswa & Pelajar</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 KreasiKado</span>
          </div>
        </div>
      </footer>

      {/* 5. Mobile Tab Bar (Bottom navigation on phone viewports) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* 6. Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedIdeas={savedIdeas}
        onRemoveIdea={handleRemoveSavedIdea}
        onSelectForGreeting={(title, category) => {
          setGreetingRecipient('Sahabat');
          setGreetingOccasion('Spesial');
          setActiveTab('ucapan');
        }}
        onClearAll={handleClearAllSavedIdeas}
      />

      {/* 7. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* 8. Official Invoice Modal */}
      {lastInvoiceData && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          items={lastInvoiceData.items}
          subtotal={lastInvoiceData.subtotal}
          deliveryMethod={lastInvoiceData.deliveryMethod}
          deliveryFee={lastInvoiceData.deliveryFee}
          customerName={lastInvoiceData.customerName}
          orderNumber={lastInvoiceData.orderNumber}
        />
      )}
    </div>
  );
}
