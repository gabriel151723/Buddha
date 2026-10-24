import React from 'react';
import { X, Eye, Check, Sun, Sparkles, Sliders, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  highContrast,
  onToggleHighContrast,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left space-y-6 border transition-colors ${
          highContrast
            ? 'bg-black text-white border-2 border-[#FFFF00]'
            : 'bg-[#181818] text-[#F3F4F6] border-white/15'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Eye
                className={`w-4 h-4 ${
                  highContrast ? 'text-[#FFFF00]' : 'text-[#F87171]'
                }`}
              />
              <span
                className={`text-[11px] font-mono tracking-widest uppercase font-semibold ${
                  highContrast ? 'text-[#FFFF00]' : 'text-[#FCA5A5]'
                }`}
              >
                Acessibilidade & Preferências
              </span>
            </div>
            <h3
              id="accessibility-settings-title"
              className="font-serif text-xl sm:text-2xl font-bold text-white"
            >
              Configurações Visuais
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Personalize a experiência de leitura e navegação no restaurante.
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              highContrast
                ? 'text-white hover:text-black hover:bg-[#FFFF00]'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Fechar configurações"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Contrast Toggle Block */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            highContrast
              ? 'bg-black border-2 border-[#FFFF00] shadow-[0_0_20px_rgba(255,255,0,0.15)]'
              : 'bg-[#121212] border-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 text-left">
              <div className="flex items-center gap-2">
                <Sun
                  className={`w-5 h-5 ${
                    highContrast ? 'text-[#FFFF00]' : 'text-neutral-400'
                  }`}
                />
                <span className="text-sm font-bold text-white tracking-wide">
                  Modo Alto Contraste
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  highContrast ? 'text-neutral-200' : 'text-neutral-400 font-light'
                }`}
              >
                Substitui as cores por fundo preto puro (
                <strong className={highContrast ? 'text-[#FFFF00]' : 'text-white'}>
                  #000000
                </strong>
                ), tipografia branca nítida (
                <strong className={highContrast ? 'text-[#FFFF00]' : 'text-white'}>
                  #FFFFFF
                </strong>
                ) e destaques em amarelo vibrante (
                <strong className={highContrast ? 'text-[#FFFF00]' : 'text-amber-400'}>
                  #FFFF00
                </strong>
                ) para máxima legibilidade (Padrão WCAG AAA).
              </p>
            </div>

            {/* Toggle switch */}
            <button
              role="switch"
              aria-checked={highContrast}
              onClick={onToggleHighContrast}
              className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${
                highContrast
                  ? 'bg-[#FFFF00] border-[#FFFF00] focus:ring-yellow-300'
                  : 'bg-[#2A2A2A] border-white/20 focus:ring-red-400'
              }`}
            >
              <span className="sr-only">Ativar modo alto contraste</span>
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full shadow-lg transition duration-200 ease-in-out ${
                  highContrast
                    ? 'translate-x-6 bg-black'
                    : 'translate-x-1 bg-white'
                }`}
              />
            </button>
          </div>

          {/* Contrast Mode Preview Badge */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span
              className={`font-mono text-[11px] ${
                highContrast ? 'text-[#FFFF00] font-bold' : 'text-neutral-400'
              }`}
            >
              Status: {highContrast ? 'ATIVADO (ALTO CONTRASTE)' : 'DESATIVADO (PADRÃO EDITORIAL)'}
            </span>
            {highContrast && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFFF00] bg-yellow-950/60 px-2 py-0.5 rounded border border-[#FFFF00]/40">
                <Check className="w-3 h-3" /> WCAG AAA
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          {highContrast ? (
            <button
              onClick={onToggleHighContrast}
              className="text-xs font-semibold text-[#FFFF00] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voltar ao Tema Padrão</span>
            </button>
          ) : (
            <div className="text-[11px] text-neutral-400 font-mono">
              💡 Atalho rápido disponível no cabeçalho
            </div>
          )}

          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              highContrast
                ? 'bg-[#FFFF00] text-black hover:bg-[#FFE600] active:scale-95 shadow-md shadow-yellow-500/30'
                : 'bg-[#991B1B] text-white hover:bg-[#B91C1C] active:scale-95 shadow-md shadow-[#991B1B]/20'
            }`}
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
