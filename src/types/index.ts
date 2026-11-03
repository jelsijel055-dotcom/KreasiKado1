export interface GiftIdea {
  id: string;
  title: string;
  category: string;
  estimatedCost: string;
  estimatedCostNumber: number;
  description: string;
  whyItFits: string;
  studentFriendlyTip: string;
  suggestedWrapping: string;
  difficulty?: '🟢 Super Praktis' | '✂️ DIY 15 Menit' | '🌸 Siap Kirim' | '✨ Sangat Personal';
}

export interface GreetingCardData {
  headline: string;
  message: string;
  quote: string;
  psMessage: string;
  cardTheme: 'rose-gold' | 'pastel-pink' | 'ivory-clean' | 'lavender-mist';
}

export interface HamperProduct {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags?: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  itemsIncluded: string[];
  dimensions: string;
  bestFor: string;
}

export interface WrappingConfig {
  paper: {
    id: string;
    name: string;
    colorHex: string;
    description: string;
    price: number;
  };
  ribbon: {
    id: string;
    name: string;
    colorHex: string;
    price: number;
  };
  waxSeal: {
    id: string;
    name: string;
    colorHex: string;
    price: number;
    symbol: string;
  };
  accent: {
    id: string;
    name: string;
    price: number;
  };
  cardNote?: string;
}

export interface CartItem {
  id: string;
  product?: HamperProduct;
  customWrapping?: WrappingConfig;
  customGreeting?: GreetingCardData;
  type: 'hamper' | 'wrapping_only' | 'bundle';
  customTitle?: string;
  price: number;
  quantity: number;
  giftRecipientName?: string;
}
