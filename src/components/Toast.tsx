import React, { useEffect, useState } from 'react';
import { Check, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { MenuItem } from '../types';
import { formatCurrency } from '../utils/whatsapp';

export interface ToastData {
  id: string;
  item: MenuItem;
  quantity: number;
  customizationText?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
  onOpenCart: () => void;
  hasFloatingBar?: boolean;
}

export const ToastNotification: React.FC<ToastProps> = ({
  toast,
  onClose,
  onOpenCart,
  hasFloatingBar = false,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) return;

    setProgress(100);
    const duration = 3600; // 3.6 seconds
    const intervalTime = 40;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const itemTotal = toast.item.price * toast.quantity;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed ${
        hasFloatingBar ? 'bottom-22 md:bottom-6' : 'bottom-6'
      } right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100%-2rem)] sm:w-auto animate-in slide-in-from-bottom-5 fade-in duration-300`}
    >
      <div className="bg-[#1C1C1C]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 text-left relative overflow-hidden group">
        {/* Progress bar line at the bottom */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#991B1B] to-[#F87171] transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />

        {/* Thumbnail & Check Indicator */}
        <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-[#242424] border border-white/10">
          <img
            src={toast.item.image}
            alt={toast.item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Item Adicionado</span>
            <span className="text-neutral-500">·</span>
            <span className="font-mono text-neutral-300 tabular-nums">
              +{toast.quantity} {toast.quantity === 1 ? 'un' : 'uns'}
            </span>
          </div>

          <h4 className="font-serif text-sm font-semibold text-white truncate leading-snug">
            {toast.item.name}
          </h4>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 tabular-nums">
            <span className="text-white font-medium">
              {formatCurrency(itemTotal)}
            </span>
            {toast.customizationText && (
              <>
                <span className="text-neutral-600">·</span>
                <span className="text-[11px] text-neutral-400 font-sans truncate max-w-[130px]">
                  {toast.customizationText}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Button: Ver Comanda */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="px-3 py-2 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md shadow-[#991B1B]/20 flex items-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Comanda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            aria-label="Fechar notificação"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
