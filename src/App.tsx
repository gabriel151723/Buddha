import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, MenuItem, BusinessStatus } from './types';
import { getBusinessStatus } from './utils/businessHours';
import { formatCurrency } from './utils/whatsapp';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PillarsBar } from './components/PillarsBar';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification, ToastData } from './components/Toast';
import { BackgroundModal } from './components/BackgroundModal';
import { SettingsModal } from './components/SettingsModal';
import { initAuth, googleSignIn } from './services/auth';
import { searchDriveForBuddhaImage } from './services/drive';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('buddha_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>(() => getBusinessStatus());
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isCartBumping, setIsCartBumping] = useState(false);

  // Accessibility: High Contrast Mode State
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      return localStorage.getItem('buddha_high_contrast') === 'true';
    } catch {
      return false;
    }
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleToggleHighContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('buddha_high_contrast', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Google Drive "Buddha Pag1.jpg" or custom background state
  const [heroBgUrl, setHeroBgUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('buddha_hero_bg') || null;
    } catch {
      return null;
    }
  });
  const [heroFileName, setHeroFileName] = useState<string | null>(() => {
    try {
      return localStorage.getItem('buddha_hero_name') || null;
    } catch {
      return null;
    }
  });
  const [isConnectingDrive, setIsConnectingDrive] = useState(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);

  // Initialize auth & attempt to auto-fetch Buddha Pag1.jpg if token exists
  useEffect(() => {
    initAuth(async (_user, token) => {
      try {
        const driveResult = await searchDriveForBuddhaImage(token);
        if (driveResult) {
          setHeroBgUrl(driveResult.blobUrl);
          setHeroFileName(driveResult.name);
          try {
            localStorage.setItem('buddha_hero_bg', driveResult.blobUrl);
            localStorage.setItem('buddha_hero_name', driveResult.name);
          } catch {
            // ignore storage quota
          }
        }
      } catch (err) {
        console.warn('Auto-fetch Drive image notice:', err);
      }
    });
  }, []);

  const handleConnectDrive = async () => {
    setIsConnectingDrive(true);
    try {
      const authResult = await googleSignIn();
      if (authResult?.accessToken) {
        const driveResult = await searchDriveForBuddhaImage(authResult.accessToken);
        if (driveResult) {
          setHeroBgUrl(driveResult.blobUrl);
          setHeroFileName(driveResult.name);
          try {
            localStorage.setItem('buddha_hero_bg', driveResult.blobUrl);
            localStorage.setItem('buddha_hero_name', driveResult.name);
          } catch {
            // ignore
          }
        } else {
          throw new Error('Arquivo "Buddha Pag1.jpg" não foi encontrado no seu Google Drive. Use a opção de colar o link ou fazer upload direto.');
        }
      }
    } finally {
      setIsConnectingDrive(false);
    }
  };

  const handleApplyCustomBg = (url: string, name: string) => {
    setHeroBgUrl(url);
    setHeroFileName(name);
    try {
      localStorage.setItem('buddha_hero_bg', url);
      localStorage.setItem('buddha_hero_name', name);
    } catch {
      // ignore
    }
  };

  const handleResetBgDefault = () => {
    setHeroBgUrl(null);
    setHeroFileName(null);
    try {
      localStorage.removeItem('buddha_hero_bg');
      localStorage.removeItem('buddha_hero_name');
    } catch {
      // ignore
    }
  };

  const triggerCartBounce = () => {
    setIsCartBumping(true);
    setTimeout(() => {
      setIsCartBumping(false);
    }, 500);
  };

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('buddha_cart', JSON.stringify(cartItems));
    } catch {
      // localStorage may fail in restricted mode
    }
  }, [cartItems]);

  // Update business status periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  }, [cartItems]);

  const handleQuickAdd = (menuItem: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setCartItems((prev) => {
      // Check if standard version of item is already in cart
      const existingIndex = prev.findIndex(
        (it) =>
          it.menuItem.id === menuItem.id &&
          !it.notes &&
          !it.spiceLevel &&
          !it.meatPoint &&
          (!it.allergens || it.allergens.length === 0)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: `${menuItem.id}-${Date.now()}`,
          menuItem,
          quantity: 1,
        },
      ];
    });

    // Trigger visual toast & cart bounce
    setToast({
      id: `${menuItem.id}-${Date.now()}`,
      item: menuItem,
      quantity: 1,
    });
    triggerCartBounce();
  };

  const handleAddToCart = (customCartItem: CartItem) => {
    setCartItems((prev) => [...prev, customCartItem]);

    const details: string[] = [];
    if (customCartItem.meatPoint) details.push(customCartItem.meatPoint);
    if (customCartItem.spiceLevel) details.push(customCartItem.spiceLevel);
    if (customCartItem.allergens && customCartItem.allergens.length > 0) {
      details.push(customCartItem.allergens[0]);
    }

    setToast({
      id: customCartItem.id,
      item: customCartItem.menuItem,
      quantity: customCartItem.quantity,
      customizationText: details.join(' · ') || undefined,
    });
    triggerCartBounce();
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col selection:bg-[#991B1B] selection:text-white transition-colors duration-200 ${
        highContrast ? 'high-contrast bg-black text-white' : 'bg-[#121212] text-[#F3F4F6]'
      }`}
    >
      {/* 1. Header Dinâmico */}
      <Header
        businessStatus={businessStatus}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservas')}
        isCartBumping={isCartBumping}
        highContrast={highContrast}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleHighContrast={handleToggleHighContrast}
        onOpenBgModal={() => setIsBgModalOpen(true)}
      />

      {/* 2. Hero Visual Sensorial */}
      <main className="flex-1">
        <HeroSection
          onScrollToMenu={() => scrollToSection('cardapio')}
          onScrollToStory={() => scrollToSection('sobre')}
          heroBgUrl={heroBgUrl}
          heroFileName={heroFileName}
          onOpenBgModal={() => setIsBgModalOpen(true)}
        />

        {/* Pillars Bar */}
        <PillarsBar />

        {/* 3. Módulo de Cardápio com Comanda Virtual */}
        <MenuSection
          onQuickAdd={handleQuickAdd}
          onOpenDetails={(item) => setSelectedItemForModal(item)}
          onOpenReservation={() => scrollToSection('reservas')}
        />

        {/* 4. Módulo de Reservas de Mesa e História */}
        <ReservationSection />

        {/* Prova Social / Avaliações */}
        <TestimonialsSection />
      </main>

      {/* 5. Rodapé Institucional com Geolocalização */}
      <Footer />

      {/* Sticky Mobile Floating Order Bar (Below 15% Viewport Cap) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className={`w-full bg-[#991B1B] hover:bg-[#B91C1C] text-white p-3.5 rounded-2xl shadow-2xl shadow-black flex items-center justify-between border transition-all cursor-pointer ${
              isCartBumping
                ? 'border-[#FCA5A5] ring-2 ring-[#F87171]/40 scale-[1.02]'
                : 'border-[#F87171]/20 active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  isCartBumping ? 'animate-cart-bounce ring-2 ring-white/50 text-[#FCA5A5]' : ''
                }`}
              >
                {cartCount}
              </div>
              <div className="text-left leading-tight">
                <span className="text-[11px] uppercase tracking-wider text-red-200 block">
                  Comanda Virtual
                </span>
                <span className="font-mono text-sm font-bold tabular-nums">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
              <span>Finalizar no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Item Customization Modal */}
      <ItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Comanda Virtual Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Visual Feedback Toast Notification */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
        hasFloatingBar={cartCount > 0 && !isCartOpen}
      />

      {/* Google Drive / Full Background Image Modal */}
      <BackgroundModal
        isOpen={isBgModalOpen}
        onClose={() => setIsBgModalOpen(false)}
        currentBgName={heroFileName}
        onSelectDriveSearch={handleConnectDrive}
        isSearchingDrive={isConnectingDrive}
        onApplyUrl={handleApplyCustomBg}
        onResetDefault={handleResetBgDefault}
      />

      {/* Accessibility Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        highContrast={highContrast}
        onToggleHighContrast={handleToggleHighContrast}
      />

      {/* Persistent High Contrast Indicator / Quick Toggle */}
      {highContrast && (
        <div className="fixed bottom-4 left-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={handleToggleHighContrast}
            aria-label="Desativar modo de alto contraste"
            className="px-3.5 py-1.5 rounded-full bg-black text-[#FFFF00] border-2 border-[#FFFF00] font-mono text-[11px] font-bold shadow-[0_0_15px_rgba(255,255,0,0.5)] flex items-center gap-2 cursor-pointer hover:bg-[#FFFF00] hover:text-black transition-all"
            title="Clique para desativar o modo de alto contraste"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFFF00] animate-ping" />
            <span>Alto Contraste Ativo</span>
            <span className="underline ml-1">Desativar</span>
          </button>
        </div>
      )}
    </div>
  );
}
