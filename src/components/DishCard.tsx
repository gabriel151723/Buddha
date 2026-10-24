import React, { useState } from 'react';
import { Plus, Check, Flame, Leaf, Utensils } from 'lucide-react';
import { MenuItem } from '../types';
import { formatCurrency } from '../utils/whatsapp';

interface DishCardProps {
  item: MenuItem;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  item,
  onQuickAdd,
  onOpenDetails,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustAdded(true);
    onQuickAdd(item, e);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="group flex flex-col bg-[#1A1A1A] hover:bg-[#202020] border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/40 cursor-pointer text-left"
    >
      {/* Image Container with 4:3 Ratio */}
      <div className="relative aspect-[4/3] bg-[#141414] overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1E1E] to-[#121212] p-4 text-center">
            <Utensils className="w-8 h-8 text-[#991B1B]/60 mb-2" />
            <span className="text-xs font-serif text-neutral-400">{item.name}</span>
          </div>
        )}

        {/* Gradient Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Badge on Image */}
        {item.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded bg-[#991B1B]/90 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase">
              {item.badge}
            </span>
          </div>
        )}

        {/* Dietary / Spicy micro indicators */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {item.isVegetarian && (
            <span
              className="p-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs backdrop-blur-sm"
              title="Vegetariano"
            >
              <Leaf className="w-3.5 h-3.5" />
            </span>
          )}
          {item.spiciness && item.spiciness > 0 && (
            <span
              className="p-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs backdrop-blur-sm flex items-center"
              title={`Nível de Pimenta: ${item.spiciness}`}
            >
              <Flame className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        {/* Preparation time subtle indicator */}
        {item.preparationTime && (
          <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-neutral-300/80 drop-shadow">
            ⏱ {item.preparationTime}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Japanese Subtitle */}
          {item.japaneseName && (
            <span className="text-[11px] font-serif tracking-widest text-[#F87171]/70 block -mb-0.5">
              {item.japaneseName}
            </span>
          )}

          {/* Dish Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-white group-hover:text-[#FCA5A5] transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Ingredients / Description */}
          <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2 mt-1 font-light">
            {item.description}
          </p>
        </div>

        {/* Bottom Bar: Price & Add Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-mono">
              Valor
            </span>
            <span className="text-base sm:text-lg font-bold font-mono tabular-nums text-white">
              {formatCurrency(item.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Adicionar ${item.name} à comanda`}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white scale-110 shadow-lg shadow-emerald-600/30'
                : 'bg-[#2A2A2A] hover:bg-[#991B1B] text-neutral-200 hover:text-white border border-white/10 hover:border-[#991B1B]'
            }`}
          >
            {justAdded ? (
              <Check className="w-5 h-5 animate-in zoom-in" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
