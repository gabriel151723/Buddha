import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Utensils,
  Calendar,
  Clock,
  Menu as MenuIcon,
  X,
  Sun,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';
import { BusinessStatus } from '../types';
import { formatCurrency, RESTAURANT_PHONE } from '../utils/whatsapp';

interface HeaderProps {
  businessStatus: BusinessStatus;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  isCartBumping?: boolean;
  highContrast?: boolean;
  onOpenSettings?: () => void;
  onToggleHighContrast?: () => void;
  onOpenBgModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  businessStatus,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
  isCartBumping = false,
  highContrast = false,
  onOpenSettings,
  onToggleHighContrast,
  onOpenBgModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Automatically hide header on scroll down, and reveal smoothly on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // At top of page, always show header
          if (currentScrollY <= 40) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
            // Scrolling DOWN: hide header to leave full screen view unobstructed
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY - 4) {
            // Scrolling UP: bring header back smoothly
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Keep header visible if mobile drawer is currently open
  const shouldShowHeader = isVisible || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full bg-[#121212]/95 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ease-in-out ${
        shouldShowHeader ? 'translate-y-0 shadow-lg shadow-black/25' : '-translate-y-full shadow-none pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand & Real-time Status */}
        <div className="flex items-center gap-3 md:gap-4">
          <a href="#" className="flex items-center gap-3 group focus:outline-none">
            {/* Japanese/Asian seal logo badge */}
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#991B1B] to-[#7F1D1D] flex items-center justify-center text-white shadow-lg shadow-[#991B1B]/20 border border-[#F87171]/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif text-lg md:text-xl font-bold leading-none select-none">
                佛
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg tracking-wider font-semibold text-white uppercase group-hover:text-[#FCA5A5] transition-colors whitespace-nowrap">
                Buddha Bistrô
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D1D5DB]/70 uppercase font-sans -mt-0.5">
                Asiático · Salvador
              </span>
            </div>
          </a>

          {/* Real-time Business Hours Indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              businessStatus.isOpen
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
            }`}
            title={businessStatus.detail}
          >
            <span className="relative flex h-2 w-2">
              {businessStatus.isOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  businessStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
            </span>
            <span className="whitespace-nowrap">{businessStatus.statusLabel}</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300 tracking-wide">
          <a
            href="#inicio"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#991B1B] hover:after:w-full after:transition-all"
          >
            Início
          </a>
          <a
            href="#sobre"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#991B1B] hover:after:w-full after:transition-all"
          >
            Sobre o Bistrô
          </a>
          <a
            href="#cardapio"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#991B1B] hover:after:w-full after:transition-all"
          >
            Cardápio
          </a>
          <a
            href="#reservas"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#991B1B] hover:after:w-full after:transition-all"
          >
            Reservas
          </a>
          <a
            href="#localizacao"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#991B1B] hover:after:w-full after:transition-all"
          >
            Como Chegar
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Accessibility Settings Toggle */}
          <button
            onClick={onOpenSettings || onToggleHighContrast}
            aria-label={
              highContrast
                ? 'Alto contraste ativado. Abrir configurações de acessibilidade'
                : 'Abrir configurações de acessibilidade e alto contraste'
            }
            title="Configurações de Acessibilidade (Alto Contraste WCAG AAA)"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              highContrast
                ? 'bg-[#FFFF00] text-black border-[#FFFF00] shadow-[0_0_12px_rgba(255,255,0,0.5)]'
                : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white border-white/10 active:scale-95'
            }`}
          >
            <Sun
              className={`w-4 h-4 ${
                highContrast ? 'text-black fill-black' : 'text-[#FCA5A5]'
              }`}
            />
            <span className="hidden xl:inline font-mono uppercase tracking-wider text-[11px]">
              {highContrast ? 'Contraste: ON' : 'Acessibilidade'}
            </span>
          </button>

          {/* Change Background Button (Google Drive / Upload) */}
          {onOpenBgModal && (
            <button
              onClick={onOpenBgModal}
              title="Personalizar Imagem de Fundo (Google Drive ou Arquivo)"
              className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-2.5 rounded-lg text-xs font-semibold bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white border border-white/10 active:scale-95 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-[#F87171]" />
              <span className="hidden xl:inline font-mono uppercase tracking-wider text-[11px]">
                Fundo
              </span>
            </button>
          )}

          {/* Reservation CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#991B1B] hover:bg-[#B91C1C] active:scale-95 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md shadow-[#991B1B]/20 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservar Mesa</span>
          </button>

          {/* Virtual Comanda Button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir Comanda Virtual"
            className={`relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg transition-all text-white text-xs font-medium cursor-pointer ${
              isCartBumping
                ? 'bg-[#2A2A2A] border-[#F87171] shadow-lg shadow-[#991B1B]/30'
                : 'bg-[#1F1F1F] hover:bg-[#2A2A2A] border-white/10 active:scale-95'
            } border`}
          >
            <div className={`relative ${isCartBumping ? 'animate-cart-bounce' : ''}`}>
              <ShoppingBag
                className={`w-4 h-4 transition-colors ${
                  isCartBumping ? 'text-[#F87171]' : 'text-[#FCA5A5]'
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#991B1B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-mono tabular-nums text-neutral-200">
              {cartCount === 0 ? 'Comanda' : formatCurrency(cartTotal)}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-[#1F1F1F] text-neutral-300 hover:text-white border border-white/10 active:scale-95 cursor-pointer"
            aria-label="Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181818] border-b border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                businessStatus.isOpen
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-300'
              }`}
            >
              <span
                className={`inline-block rounded-full h-2 w-2 ${
                  businessStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
              />
              <span>{businessStatus.statusLabel}</span>
            </div>
            <span className="text-xs text-neutral-400">{businessStatus.detail}</span>
          </div>

          <nav className="flex flex-col space-y-2 text-sm text-neutral-300">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Início
            </a>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Sobre o Bistrô
            </a>
            <a
              href="#cardapio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Cardápio Interativo
            </a>
            <a
              href="#reservas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Reservar Mesa
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white"
            >
              Localização & Horários
            </a>
          </nav>

          {/* Mobile Accessibility High-Contrast Toggle */}
          <div className="pt-2 pb-1 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSettings) onOpenSettings();
                else if (onToggleHighContrast) onToggleHighContrast();
              }}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-between border cursor-pointer ${
                highContrast
                  ? 'bg-[#FFFF00] text-black border-[#FFFF00]'
                  : 'bg-[#1F1F1F] text-neutral-200 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <span>Modo Alto Contraste</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/40 text-white">
                {highContrast ? 'LIGADO' : 'DESLIGADO'}
              </span>
            </button>
          </div>

          {/* Mobile Change Background Option */}
          {onOpenBgModal && (
            <div className="pb-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBgModal();
                }}
                className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-between border border-white/10 bg-[#1F1F1F] text-neutral-200 cursor-pointer hover:bg-[#252525]"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#F87171]" />
                  <span>Personalizar Fundo</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">Google Drive / Arquivo</span>
              </button>
            </div>
          )}

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 rounded-lg bg-[#991B1B] text-white text-xs font-semibold uppercase tracking-wider text-center"
            >
              Reservar Mesa
            </button>
            <a
              href={`https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(
                'Olá Buddha Bistrô! Gostaria de tirar uma dúvida sobre o cardápio e atendimento.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#1F1F1F] border border-white/10 text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
