import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Coins,
  ChefHat,
  Crown,
  Layers,
  Share2,
  Check,
} from 'lucide-react';
import { CategoryId, MenuItem } from '../types';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';
import { DishCard } from './DishCard';
import { ChefSuggestionsCarousel } from './ChefSuggestionsCarousel';

export type PriceRangeBracket = 'all' | 'affordable' | 'chef_selection' | 'premium';

const PRICE_RANGES = [
  { id: 'all' as PriceRangeBracket, label: 'Todos', bracket: 'Cardápio', icon: Layers },
  { id: 'affordable' as PriceRangeBracket, label: 'Acessíveis', bracket: 'Até R$ 50', icon: Coins },
  { id: 'chef_selection' as PriceRangeBracket, label: 'Chef Selection', bracket: 'R$ 50–80', icon: ChefHat },
  { id: 'premium' as PriceRangeBracket, label: 'Premium', bracket: 'R$ 80+', icon: Crown },
];

interface MenuSectionProps {
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  onOpenDetails: (item: MenuItem) => void;
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onQuickAdd,
  onOpenDetails,
  onOpenReservation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRangeBracket>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [filterHighlightsOnly, setFilterHighlightsOnly] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShareMenu = async () => {
    const shareUrl = window.location.origin + window.location.pathname + '#cardapio';
    const shareData = {
      title: 'Buddha Bistrô Asiático - Cardápio Autoral',
      text: 'Confira as criações gastronômicas e pratos autorais do Buddha Bistrô Asiático em Salvador!',
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShareFeedback('Compartilhado!');
        setTimeout(() => setShareFeedback(null), 2500);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          copyFallback(shareUrl);
        }
      }
    } else {
      copyFallback(shareUrl);
    }
  };

  const copyFallback = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback('Link copiado!');
      setTimeout(() => setShareFeedback(null), 2500);
    } catch {
      setShareFeedback('Link copiado!');
      setTimeout(() => setShareFeedback(null), 2500);
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Price range bracket filter
      if (selectedPriceRange === 'affordable' && item.price > 50) {
        return false;
      }
      if (
        selectedPriceRange === 'chef_selection' &&
        (item.price <= 50 || item.price > 80)
      ) {
        return false;
      }
      if (selectedPriceRange === 'premium' && item.price <= 80) {
        return false;
      }
      // Vegetarian filter
      if (filterVegetarian && !item.isVegetarian) {
        return false;
      }
      // Gluten free filter
      if (filterGlutenFree && !item.isGlutenFree) {
        return false;
      }
      // Highlights filter
      if (filterHighlightsOnly && !item.badge) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        const matchesJapanese = item.japaneseName?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesJapanese) {
          return false;
        }
      }
      return true;
    });
  }, [
    selectedCategory,
    selectedPriceRange,
    searchQuery,
    filterVegetarian,
    filterGlutenFree,
    filterHighlightsOnly,
  ]);

  return (
    <section id="cardapio" className="py-16 md:py-24 bg-[#141414] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-5 bg-[#991B1B]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[#F87171] uppercase">
                Cardápio Interativo
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Pratos Criados com Perfeição
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl font-light">
              Navegue pelas nossas criações autorais. Adicione pratos à sua comanda
              virtual e envie diretamente para nossa equipe via WhatsApp.
            </p>
          </div>

          {/* Actions: Share Menu & Reserve */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start md:self-auto">
            {/* Native Web Share Button */}
            <button
              onClick={handleShareMenu}
              aria-label="Compartilhar link do cardápio nas redes sociais"
              title="Compartilhar cardápio nas redes sociais ou copiar link"
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all border cursor-pointer ${
                shareFeedback
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-900/30 scale-102'
                  : 'bg-[#1C1C1C] hover:bg-[#252525] border-white/10 hover:border-white/25 text-neutral-200 hover:text-white active:scale-95'
              }`}
            >
              {shareFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-in zoom-in" />
                  <span>{shareFeedback}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#F87171]" />
                  <span>Compartilhar</span>
                </>
              )}
            </button>

            {/* Quick Reserve Link */}
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#991B1B]/20 hover:bg-[#991B1B]/35 border border-[#991B1B]/40 text-xs font-semibold tracking-wider text-[#F87171] hover:text-[#FCA5A5] transition-all uppercase cursor-pointer active:scale-95"
            >
              <span>Reservar mesa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chef Suggestions Carousel (Top of MenuSection) */}
        <ChefSuggestionsCarousel
          onQuickAdd={onQuickAdd}
          onOpenDetails={onOpenDetails}
        />

        {/* Menu Filtering & Category Console (In-flow, non-sticky to leave full screen view unobstructed) */}
        <div className="relative z-10 bg-[#181818] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-white/10 shadow-xl shadow-black/40">
          <div className="space-y-3">
            {/* Horizontal Category Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CategoryId)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#991B1B] text-white shadow-md shadow-[#991B1B]/30'
                        : 'bg-[#1E1E1E] text-neutral-300 hover:text-white hover:bg-[#282828] border border-white/5'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] font-serif transition-opacity ${
                        isActive ? 'text-white/80' : 'text-neutral-500'
                      }`}
                    >
                      {cat.kanji}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar & Quick Toggles */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              {/* Search Field */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por salmão, wagyu, tempura, trufas..."
                  className="w-full bg-[#1C1C1C] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Quick Dietary Filters (Buttons with Click Handlers) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setFilterHighlightsOnly(!filterHighlightsOnly)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterHighlightsOnly
                      ? 'bg-[#991B1B]/30 border-[#F87171] text-white'
                      : 'bg-[#1A1A1A] border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F87171]" />
                  <span>Destaques</span>
                </button>

                <button
                  onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterGlutenFree
                      ? 'bg-amber-950/60 border-amber-400 text-amber-300'
                      : 'bg-[#1A1A1A] border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sem Glúten</span>
                </button>

                <button
                  onClick={() => setFilterVegetarian(!filterVegetarian)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    filterVegetarian
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
                      : 'bg-[#1A1A1A] border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vegetariano</span>
                </button>
              </div>
            </div>

            {/* Price Range Segmented Filter Toggle */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 shrink-0">
                Faixa de Preço:
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-[#1C1C1C] rounded-xl border border-white/10 shrink-0">
                {PRICE_RANGES.map((range) => {
                  const isSelected = selectedPriceRange === range.id;
                  const Icon = range.icon;
                  return (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#991B1B] text-white shadow-sm font-semibold'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{range.label}</span>
                      <span
                        className={`text-[10px] font-mono tabular-nums ${
                          isSelected ? 'text-red-200' : 'text-neutral-500'
                        }`}
                      >
                        ({range.bracket})
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedPriceRange !== 'all' && (
                <button
                  onClick={() => setSelectedPriceRange('all')}
                  className="text-xs text-[#F87171] hover:text-[#FCA5A5] transition-colors whitespace-nowrap px-1 cursor-pointer"
                >
                  Limpar faixa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dishes Grid with Staggered Framer Motion Animation */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-lg text-white">Nenhum prato encontrado</p>
            <p className="text-xs text-neutral-400">
              Tente redefinir sua busca ou alterar os filtros selecionados.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setSelectedPriceRange('all');
                setFilterVegetarian(false);
                setFilterGlutenFree(false);
                setFilterHighlightsOnly(false);
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#222222] text-xs font-medium text-white hover:bg-white/10 cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min((index % 4) * 0.08, 0.24),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >
                  <DishCard
                    item={item}
                    onQuickAdd={onQuickAdd}
                    onOpenDetails={onOpenDetails}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
