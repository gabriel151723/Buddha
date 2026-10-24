import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Navigation,
  Wifi,
  Car,
  Dog,
  Wine,
  Accessibility,
  CheckCircle2,
} from 'lucide-react';
import {
  RESTAURANT_PHONE,
  RESTAURANT_PHONE_DISPLAY,
  INSTAGRAM_URL,
  GOOGLE_MAPS_URL,
  WAZE_URL,
} from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer id="localizacao" className="bg-[#0D0D0D] border-t border-white/10 text-neutral-400 text-sm">
      {/* Amenities Banner */}
      <div className="border-b border-white/5 py-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around gap-6 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-[#F87171]" />
              <span>Estacionamento com Valet</span>
            </div>
            <div className="flex items-center gap-2">
              <Dog className="w-4 h-4 text-[#F87171]" />
              <span>Pet Friendly na Varanda</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#F87171]" />
              <span>Wi-Fi 5G Alta Velocidade</span>
            </div>
            <div className="flex items-center gap-2">
              <Wine className="w-4 h-4 text-[#F87171]" />
              <span>Carta de Vinhos & Saquês</span>
            </div>
            <div className="flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-[#F87171]" />
              <span>Acessibilidade Completa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#991B1B] flex items-center justify-center text-white font-serif text-lg font-bold border border-[#F87171]/20">
                佛
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white uppercase block leading-none">
                  Buddha Bistrô
                </span>
                <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-sans">
                  Asiático · Salvador
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Gastronomia asiática contemporânea que reúne tradição oriental milenar,
              ingredientes frescos do mar da Bahia e uma atmosfera sensorial intimista.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#991B1B] transition-colors"
                title="Instagram Oficial @buddhabistroasiatico"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1C1C1C] border border-white/10 flex items-center justify-center text-neutral-300 hover:text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                title="WhatsApp Oficial"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Horários Oficiais */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F87171]" />
              Horário Oficial de Atendimento
            </h4>
            <div className="space-y-2 text-xs text-neutral-300 font-sans">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Terça a Quinta:</span>
                <span className="font-mono text-neutral-200">12:00–15:30 · 18:30–23:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Sexta e Sábado:</span>
                <span className="font-mono text-neutral-200">12:00–16:00 · 18:30–00:30</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Domingo:</span>
                <span className="font-mono text-neutral-200">12:00–16:30 · 18:30–23:00</span>
              </div>
              <div className="flex justify-between py-1 text-neutral-400">
                <span>Segunda-feira:</span>
                <span className="text-[#F87171]">Fechado (Descanso semanal)</span>
              </div>
            </div>
          </div>

          {/* Endereço & Geolocalização (Google Maps / Waze) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F87171]" />
              Localização em Salvador
            </h4>
            <div className="space-y-1 text-xs text-neutral-300">
              <p className="font-medium text-white">Rio Vermelho Gastronomia</p>
              <p className="text-neutral-400">Salvador - Bahia, CEP 41940-000</p>
              <p className="text-neutral-400">Próximo aos principais pontos do charmoso bairro boêmio.</p>
            </div>

            {/* Navigation buttons: Waze & Google Maps */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#1C1C1C] hover:bg-[#282828] border border-white/10 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F87171]" />
                <span>Google Maps</span>
              </a>

              <a
                href={WAZE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#1C1C1C] hover:bg-[#282828] border border-white/10 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>Abrir no Waze</span>
              </a>
            </div>

            <div className="text-[11px] text-neutral-400 pt-1">
              Contato direto: <strong className="text-white">{RESTAURANT_PHONE_DISPLAY}</strong>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Buddha Bistrô Asiático. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Cardápio Digital Otimizado</span>
            <span aria-hidden="true">·</span>
            <span>Salvador - BA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
