import React, { useState } from 'react';
import { X, Search, UploadCloud, Link as LinkIcon, Check, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { extractDriveFileId, getDirectDriveImageUrl } from '../services/drive';

interface BackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBgName?: string | null;
  onSelectDriveSearch: () => Promise<void>;
  isSearchingDrive: boolean;
  onApplyUrl: (url: string, name: string) => void;
  onResetDefault: () => void;
}

export const BackgroundModal: React.FC<BackgroundModalProps> = ({
  isOpen,
  onClose,
  currentBgName,
  onSelectDriveSearch,
  isSearchingDrive,
  onApplyUrl,
  onResetDefault,
}) => {
  const [driveUrlInput, setDriveUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyLink = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!driveUrlInput.trim()) {
      setErrorMsg('Por favor, cole um link ou ID de arquivo do Google Drive.');
      return;
    }

    const fileId = extractDriveFileId(driveUrlInput.trim());
    if (!fileId) {
      setErrorMsg('Não foi possível identificar o ID do arquivo no link informado.');
      return;
    }

    const directUrl = getDirectDriveImageUrl(fileId);
    onApplyUrl(directUrl, `Google Drive (${fileId.slice(0, 8)}...)`);
    setSuccessMsg('Imagem de fundo aplicada com sucesso!');
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onApplyUrl(result, file.name || 'Buddha Pag1.jpg');
        setSuccessMsg(`Arquivo "${file.name}" carregado com sucesso!`);
        setTimeout(() => {
          onClose();
        }, 900);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Erro ao ler arquivo do computador.');
    };
    reader.readAsDataURL(file);
  };

  const handleDriveSearchClick = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await onSelectDriveSearch();
      setSuccessMsg('Busca no Google Drive concluída!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Falha ao buscar no Google Drive.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-lg bg-[#181818] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black relative text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F87171]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#FCA5A5]">
                Fundo da 1ª Página
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Configurar "Buddha Pag1.jpg"
            </h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Defina a imagem que cobre 100% da primeira página do restaurante.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status */}
        <div className="p-3.5 rounded-2xl bg-[#121212] border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-4 h-4 text-[#F87171]" />
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-mono">Fundo Atual</span>
              <span className="font-medium text-white">{currentBgName || 'Ambiente Autoral Buddha Bistrô (Padrão)'}</span>
            </div>
          </div>
          {currentBgName && (
            <button
              onClick={() => {
                onResetDefault();
                setSuccessMsg('Fundo restaurado para o padrão.');
              }}
              className="text-[11px] text-[#F87171] hover:underline cursor-pointer"
            >
              Restaurar Padrão
            </button>
          )}
        </div>

        {/* Notification alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Option 1: Automatic Drive Search via OAuth */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider block">
            Opção 1 · Buscar no seu Google Drive
          </label>
          <button
            onClick={handleDriveSearchClick}
            disabled={isSearchingDrive}
            className="w-full py-3.5 px-4 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] active:scale-95 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#991B1B]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Search className={`w-4 h-4 ${isSearchingDrive ? 'animate-spin' : ''}`} />
            <span>{isSearchingDrive ? 'Buscando "Buddha Pag1.jpg"...' : 'Conectar e Buscar "Buddha Pag1.jpg"'}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#181818] px-3 text-[10px] uppercase font-mono text-neutral-500 tracking-widest absolute">
            OU
          </span>
        </div>

        {/* Option 2: Paste Google Drive Link or File ID */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-white uppercase tracking-wider block">
            Opção 2 · Colar Link do Google Drive
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={driveUrlInput}
                onChange={(e) => setDriveUrlInput(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full bg-[#121212] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
              />
            </div>
            <button
              onClick={handleApplyLink}
              className="px-4 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Aplicar
            </button>
          </div>
        </div>

        {/* Option 3: Local file upload for Buddha Pag1.jpg */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-white uppercase tracking-wider block">
            Opção 3 · Carregar arquivo do computador
          </label>
          <label className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.05] text-xs text-neutral-300 hover:text-white transition-all cursor-pointer">
            <UploadCloud className="w-4 h-4 text-[#F87171]" />
            <span>Selecionar arquivo "Buddha Pag1.jpg"</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
