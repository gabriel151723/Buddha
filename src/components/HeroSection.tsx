import React from 'react';
import {
  ArrowRight,
  Star,
  Utensils,
  Instagram,
  MessageCircle,
  MapPin,
  Image as ImageIcon,
  Check,
  ChevronDown,
} from 'lucide-react';
import { INSTAGRAM_URL, RESTAURANT_PHONE, GOOGLE_MAPS_URL } from '../utils/whatsapp';

export const DEFAULT_HERO_BACKGROUND =
  'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=3840&q=95';

interface HeroSectionProps {
  onScrollToMenu: () => void;
  onScrollToStory: () => void;
  heroBgUrl?: string | null;
  heroFileName?: string | null;
  onOpenBgModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToMenu,
  onScrollToStory,
  heroBgUrl,
  heroFileName,
  onOpenBgModal,
}) => {
  // Use user-specified Drive image or premium editorial Asian bistro background in 4K UHD
  const activeBg = heroBgUrl || DEFAULT_HERO_BACKGROUND;

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* 
        100% FIRST PAGE FULL BACKGROUND:
        Covers the entire first viewport with crystal-clear 4K luxury fine-dining restaurant photography
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={activeBg}
          alt="Buddha Bistrô Asiático - Ambiente e Gastronomia"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.06] transition-all duration-700"
          loading="eager"
          decoding="async"
        />
        {/* Layered luxury lighting scrim for perfect typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]" />
      </div>

      {/* Discreet Button to Change/Upload Background Image */}
      {onOpenBgModal && (
        <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20">
          <button
            onClick={onOpenBgModal}
            className="px-3.5 py-1.5 rounded-full bg-black/65 hover:bg-black/90 border border-white/15 backdrop-blur-md text-xs text-neutral-300 hover:text-white flex items-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer group"
            title="Alterar imagem de fundo (Google Drive ou Arquivo)"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#F87171] group-hover:rotate-12 transition-transform" />
            <span className="font-sans font-medium text-[11px] sm:text-xs">
              {heroFileName ? `Fundo: ${heroFileName}` : 'Alterar imagem de fundo'}
            </span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Refined Fine-Dining Presentation */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-8 text-left">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#991B1B]" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#FCA5A5] uppercase font-sans">
                Alta Gastronomia Pan-Asiática · Salvador
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] text-balance drop-shadow-lg">
                A Arte da Cozinha{' '}
                <span className="font-script text-[#F87171] font-normal tracking-normal block sm:inline text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
                  Asiática
                </span>
              </h1>

              {/* Japanese Kanji Motto */}
              <div className="flex items-center gap-3 text-neutral-200 text-xs sm:text-sm tracking-widest font-serif drop-shadow">
                <span className="h-px w-6 sm:w-10 bg-white/30" />
                <span>美味しい · 新鮮 · 本物</span>
                <span className="text-[11px] text-[#FCA5A5] font-sans font-light">
                  (Sabor Puro · Frescor do Mar · Tradição Autêntica)
                </span>
                <span className="h-px w-6 sm:w-10 bg-white/30" />
              </div>
            </div>

            {/* Welcoming Sensory Paragraph */}
            <p className="text-base sm:text-xl text-neutral-200 leading-relaxed max-w-2xl font-sans font-light drop-shadow-md">
              Uma imersão sensorial através dos sabores do Oriente em Salvador.
              Peixes nobres do litoral baiano selecionados na alvorada, cortes milenares do sushiman
              e a força do fogo no wok contemporâneo.
            </p>

            {/* Google Maps Social Proof */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md shadow-md">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white text-xs sm:text-sm ml-1">4.8</span>
                <span className="text-neutral-400 text-xs font-light">/ 5.0</span>
              </div>
              <span className="text-xs sm:text-sm text-neutral-200 font-light drop-shadow">
                Mais de <strong className="text-white font-medium">2.400 clientes atendidos</strong> no Google Maps
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToMenu}
                className="px-7 py-4 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] active:scale-95 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl shadow-[#991B1B]/30 flex items-center gap-2.5 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Explorar Cardápio</span>
              </button>

              <button
                onClick={onScrollToStory}
                className="px-6 py-4 rounded-xl border border-white/30 hover:border-white/70 hover:bg-white/10 active:scale-95 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-sm cursor-pointer"
              >
                <span>Nossa Filosofia</span>
                <ArrowRight className="w-4 h-4 text-[#FCA5A5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Signature Culinary Spotlight */}
          <div className="lg:col-span-5 xl:col-span-4 relative flex items-center justify-center">
            {/* Signature Showcase Card with Glassmorphic Detail */}
            <div className="relative z-10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl shadow-black/95 border border-white/20 bg-[#121212]/85 backdrop-blur-xl group transition-transform duration-500 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85"
                  alt="Combinado Especial do Sushiman"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-[#991B1B]/90 backdrop-blur-md text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                    Destaque do Chef
                  </span>
                </div>
              </div>

              <div className="p-5 text-left space-y-2">
                <span className="text-[11px] font-mono tracking-widest text-[#F87171] uppercase">
                  Experiência Omakase
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  Combinado Contemporâneo de Salmão & Atum Bluefin
                </h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">
                  Lâminas maçaricadas com azeite trufado, flor de sal e redução autoral de yuzu e caju da Bahia.
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-neutral-400">Ambiente</span>
                    <span className="text-xs font-semibold text-white">Rio Vermelho · Salvador</span>
                  </div>
                  <button
                    onClick={onScrollToMenu}
                    className="text-xs font-semibold text-[#F87171] hover:text-[#FCA5A5] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Ver no Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick social dock */}
            <div className="hidden sm:flex flex-col gap-2.5 absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-black/70 p-2 rounded-2xl border border-white/15 backdrop-blur-md shadow-2xl">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @buddhabistroasiatico"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/15 transition-colors"
                title="Instagram @buddhabistroasiatico"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (71) 98315-2006"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                title="WhatsApp (71) 98315-2006"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:text-amber-400 hover:bg-amber-950/40 transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Pulsing Scroll Indicator */}
      <button
        onClick={onScrollToMenu}
        aria-label="Rolar para o cardápio"
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group focus:outline-none"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-300/80 group-hover:text-white transition-colors drop-shadow">
          Explorar Cardápio
        </span>
        <div className="w-8 h-8 rounded-full bg-black/45 border border-white/15 backdrop-blur-sm flex items-center justify-center group-hover:border-[#991B1B] group-hover:bg-[#991B1B]/20 transition-all shadow-lg group-active:scale-95">
          <ChevronDown className="w-4 h-4 text-[#F87171] group-hover:text-[#FCA5A5] animate-bounce transition-colors" />
        </div>
      </button>
    </section>
  );
};
