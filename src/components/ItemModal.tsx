import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, Flame, ShieldAlert, Sparkles } from 'lucide-react';
import { MenuItem, CartItem } from '../types';
import { formatCurrency } from '../utils/whatsapp';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

interface ItemModalDialogProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

const ItemModalDialog: React.FC<ItemModalDialogProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Suave' | 'Médio' | 'Picante'>('Médio');
  const [meatPoint, setMeatPoint] = useState<'Mal Passado' | 'Ao Ponto' | 'Bem Passado'>('Ao Ponto');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isMeatDish =
    item.id.includes('wagyu') ||
    item.id.includes('mignon') ||
    item.id.includes('costela') ||
    item.ingredients.some(
      (i) => i.toLowerCase().includes('wagyu') || i.toLowerCase().includes('mignon')
    );

  const commonRestrictions = [
    'Sem Coentro',
    'Sem Amendoim',
    'Sem Glúten',
    'Sem Lactose',
    'Pouco Sal',
    'Molho à Parte',
  ];

  const toggleRestriction = (tag: string) => {
    if (selectedAllergens.includes(tag)) {
      setSelectedAllergens(selectedAllergens.filter((t) => t !== tag));
    } else {
      setSelectedAllergens([...selectedAllergens, tag]);
    }
  };

  const handleConfirm = () => {
    const cartEntry: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      notes: notes.trim() || undefined,
      spiceLevel: item.spiciness ? spiceLevel : undefined,
      meatPoint: isMeatDish ? meatPoint : undefined,
      allergens: selectedAllergens.length > 0 ? selectedAllergens : undefined,
    };
    onAddToCart(cartEntry);
    onClose();
  };

  const total = item.price * quantity;

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        key="modal-content"
        initial={{ opacity: 0, y: 45, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 35, scale: 0.94 }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 320,
          mass: 0.85,
        }}
        className="relative w-full max-w-lg bg-[#181818] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="relative aspect-[16/9] w-full bg-[#121212] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-black/40 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded bg-[#991B1B] text-white text-[10px] font-semibold tracking-wider uppercase">
                {item.badge}
              </span>
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4">
            {item.japaneseName && (
              <span className="text-xs font-serif text-[#F87171] tracking-widest block">
                {item.japaneseName}
              </span>
            )}
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-neutral-300 text-sm">
          {/* Description */}
          <p className="text-neutral-400 font-light leading-relaxed">
            {item.description}
          </p>

          {/* Ingredients Pill-less list */}
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-1">
              Ingredientes Principais
            </span>
            <div className="text-xs text-neutral-300 flex flex-wrap gap-x-2 gap-y-1">
              {item.ingredients.map((ing, i) => (
                <span key={i}>
                  {ing}
                  {i < item.ingredients.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Meat Doneness Option */}
          {isMeatDish && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F87171]" />
                Ponto da Carne
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Mal Passado', 'Ao Ponto', 'Bem Passado'] as const).map((point) => (
                  <button
                    key={point}
                    type="button"
                    onClick={() => setMeatPoint(point)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      meatPoint === point
                        ? 'bg-[#991B1B] border-[#F87171] text-white shadow-sm'
                        : 'bg-[#222222] border-white/5 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    {point}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level Option */}
          {item.spiciness !== undefined && item.spiciness > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  Nível de Picância
                </label>
                <span className="text-[11px] font-mono text-neutral-400">
                  {spiceLevel}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Suave', 'Médio', 'Picante'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevel(level)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      spiceLevel === level
                        ? 'bg-[#991B1B] border-[#F87171] text-white shadow-sm'
                        : 'bg-[#222222] border-white/5 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dietary Restrictions Tags */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#F87171]" />
                Restrições & Preferências
              </label>
              <span className="text-[10px] text-neutral-500 font-mono">opcional</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {commonRestrictions.map((tag) => {
                const isSelected = selectedAllergens.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleRestriction(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#991B1B]/40 border-[#F87171] text-white'
                        : 'bg-[#222222] border-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-[#F87171]" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Observations input */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <label
              htmlFor="dish-notes"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
            >
              Observações Especiais
            </label>
            <input
              id="dish-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: pouco gengibre, molho separado..."
              className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-[#222222] rounded-lg border border-white/10 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-semibold text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg shadow-[#991B1B]/20 flex items-center justify-between cursor-pointer active:scale-95"
          >
            <span>Adicionar à Comanda</span>
            <span className="font-mono tabular-nums text-sm font-bold">
              {formatCurrency(total)}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  return (
    <AnimatePresence>
      {item && (
        <ItemModalDialog
          key={item.id}
          item={item}
          onClose={onClose}
          onAddToCart={onAddToCart}
        />
      )}
    </AnimatePresence>
  );
};
