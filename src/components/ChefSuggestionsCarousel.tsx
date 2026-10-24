import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Check,
  Eye,
  Crown,
  ChefHat,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';
import { formatCurrency } from '../utils/whatsapp';

interface ChefSuggestionsCarouselProps {
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const ChefSuggestionsCarousel: React.FC<ChefSuggestionsCarouselProps> = ({
  onQuickAdd,
  onOpenDetails,
}) => {
  // Select 3 premier flagship dishes for Chef Suggestions
  const chefDishes: MenuItem[] = React.useMemo(() => {
    const ids = ['tataki-salmao-trufas', 'tartaro-wagyu-a5', 'black-cod-misoyaki'];
    const selected = ids
      .map((id) => MENU_ITEMS.find((it) => it.id === id))
      .filter((it): it is MenuItem => Boolean(it));

    // Fallback if any ID changed
    if (selected.length < 3) {
      return MENU_ITEMS.slice(0, 3);
    }
    return selected;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel smoothly every 7s if not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chefDishes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, chefDishes.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + chefDishes.length) % chefDishes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % chefDishes.length);
  };

  const handleQuickAddClick = (dish: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setJustAddedId(dish.id);
    onQuickAdd(dish, e);
    setTimeout(() => setJustAddedId(null), 1000);
  };

  const activeDish = chefDishes[currentIndex];
  if (!activeDish) return null;

  return (
    <div
      className="mb-12 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header bar of the suggestions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 text-left">
          <div className="w-8 h-8 rounded-lg bg-[#991B1B]/20 border border-[#991B1B]/40 flex items-center justify-center text-[#F87171]">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FCA5A5] uppercase font-semibold">
                Seleção Especial
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
              <span className="text-[10px] font-mono text-neutral-400">
                {currentIndex + 1} de {chefDishes.length}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
              Sugestões do Chef
            </h3>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            aria-label="Sugestão anterior"
            className="w-8 h-8 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Próxima sugestão"
            className="w-8 h-8 rounded-lg bg-[#1F1F1F] hover:bg-[#282828] border border-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Carousel Feature Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-white/10 shadow-2xl shadow-black/60 group">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[360px]">
          {/* Visual Image Presentation (Left/Top) */}
          <div
            className="lg:col-span-7 relative overflow-hidden bg-black/60 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto cursor-pointer"
            onClick={() => onOpenDetails(activeDish)}
          >
            <img
              src={activeDish.image}
              alt={activeDish.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            {/* Scrim gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#121212]" />

            {/* Prominent Visual Badge: "Destaque" */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#991B1B] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#991B1B]/40 flex items-center gap-1.5 border border-[#F87171]/40 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Destaque</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-neutral-300 border border-white/10">
                Experiência Autoral
              </span>
            </div>

            {/* Preparation time tag */}
            {activeDish.preparationTime && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-200">
                <Clock className="w-3.5 h-3.5 text-[#F87171]" />
                <span>Preparo: {activeDish.preparationTime}</span>
              </div>
            )}
          </div>

          {/* Dish Information & Actions (Right/Bottom) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 bg-[#161616]/90 backdrop-blur-md">
            <div className="space-y-3">
              {/* Japanese Kanji Subtitle */}
              {activeDish.japaneseName && (
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-[#991B1B]" />
                  <span className="font-serif tracking-widest text-xs text-[#FCA5A5]">
                    {activeDish.japaneseName}
                  </span>
                </div>
              )}

              {/* Dish Name */}
              <h4
                onClick={() => onOpenDetails(activeDish)}
                className="font-serif text-2xl sm:text-3xl font-bold text-white hover:text-[#FCA5A5] transition-colors cursor-pointer leading-tight"
              >
                {activeDish.name}
              </h4>

              {/* Sensory Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {activeDish.description}
              </p>

              {/* Key ingredients pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeDish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-lg bg-[#202020] border border-white/5 text-[11px] text-neutral-300 font-sans"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Action CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Valor
                </span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {formatCurrency(activeDish.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenDetails(activeDish)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/40 hover:bg-white/5 active:scale-95 text-neutral-200 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#F87171]" />
                  <span>Detalhes</span>
                </button>

                <button
                  onClick={(e) => handleQuickAddClick(activeDish, e)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    justAddedId === activeDish.id
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                      : 'bg-[#991B1B] hover:bg-[#B91C1C] active:scale-95 text-white shadow-[#991B1B]/30'
                  }`}
                >
                  {justAddedId === activeDish.id ? (
                    <>
                      <Check className="w-4 h-4 animate-in zoom-in" />
                      <span>Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Comanda</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicator dots and thumbnails preview */}
        <div className="bg-[#121212] px-6 py-3 border-t border-white/5 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {chefDishes.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver ${dish.name}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 bg-[#991B1B]'
                    : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          {/* Quick tab titles */}
          <div className="hidden sm:flex items-center gap-3">
            {chefDishes.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => setCurrentIndex(idx)}
                className={`text-xs font-medium transition-colors cursor-pointer truncate max-w-[150px] ${
                  currentIndex === idx
                    ? 'text-white font-semibold'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {idx + 1}. {dish.name.split(' ')[0]} {dish.name.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
