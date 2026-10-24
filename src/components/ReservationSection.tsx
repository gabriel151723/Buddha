import React, { useState } from 'react';
import { Calendar, Clock, Users, Send, UtensilsCrossed, Sparkles } from 'lucide-react';
import { ReservationData } from '../types';
import { generateWhatsAppReservationUrl, RESTAURANT_PHONE_DISPLAY } from '../utils/whatsapp';

export const ReservationSection: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    guests: 2,
    date: todayStr,
    time: '19:30',
    area: 'Salão Nobre Climatizado',
    occasion: 'Jantar Gastronômico',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Por favor, informe seu nome e telefone para a reserva.');
      return;
    }
    const url = generateWhatsAppReservationUrl(formData);
    setSubmitted(true);
    window.open(url, '_blank');
  };

  return (
    <section id="reservas" className="py-16 md:py-24 bg-[#121212] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Book Your Table Card (Styled like reference mockup) */}
          <div className="lg:col-span-6 relative">
            <div className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black overflow-hidden text-left">
              {/* Cherry blossom floral decoration SVG in top-right corner */}
              <svg
                className="absolute top-0 right-0 w-48 h-48 opacity-25 pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M180 20 Q140 60 110 110 Q90 140 60 170"
                  stroke="#991B1B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="160" cy="40" r="8" fill="#F87171" opacity="0.8" />
                <circle cx="130" cy="70" r="7" fill="#F87171" opacity="0.7" />
                <circle cx="105" cy="115" r="9" fill="#DC2626" opacity="0.9" />
                <circle cx="80" cy="145" r="6" fill="#F87171" opacity="0.6" />
                <circle cx="175" cy="65" r="5" fill="#EF4444" opacity="0.7" />
              </svg>

              <div className="relative z-10 space-y-6">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold tracking-[0.25em] text-[#F87171] uppercase font-sans">
                    Reservas Online
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Reserve Sua Mesa
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light">
                    Junte-se a nós para uma experiência gastronômica inesquecível em Salvador.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="res-name" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        Seu Nome
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Gabriela Lima"
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#991B1B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="res-phone" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        WhatsApp (com DDD)
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(71) 98888-7777"
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#991B1B]"
                      />
                    </div>
                  </div>

                  {/* Date, Time, Guests Trio matching reference */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="res-date" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F87171]" />
                        Data
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={todayStr}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#991B1B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="res-time" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F87171]" />
                        Horário
                      </label>
                      <select
                        id="res-time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#991B1B]"
                      >
                        <optgroup label="Almoço">
                          <option value="12:00">12:00</option>
                          <option value="12:30">12:30</option>
                          <option value="13:00">13:00</option>
                          <option value="13:30">13:30</option>
                          <option value="14:00">14:00</option>
                        </optgroup>
                        <optgroup label="Jantar">
                          <option value="19:00">19:00</option>
                          <option value="19:30">19:30</option>
                          <option value="20:00">20:00</option>
                          <option value="20:30">20:30</option>
                          <option value="21:00">21:00</option>
                          <option value="21:30">21:30</option>
                          <option value="22:00">22:00</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="res-guests" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#F87171]" />
                        Pessoas
                      </label>
                      <select
                        id="res-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#991B1B]"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Area & Occasion */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="res-area" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        Ambiente Preferido
                      </label>
                      <select
                        id="res-area"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#991B1B]"
                      >
                        <option value="Salão Nobre Climatizado">Salão Nobre Climatizado</option>
                        <option value="Terraço Jardim Zen">Terraço Jardim Zen (Ar Livre)</option>
                        <option value="Balcão Omotenashi do Sushiman">Balcão Omotenashi do Sushiman</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="res-occasion" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        Ocasião Especial
                      </label>
                      <select
                        id="res-occasion"
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#991B1B]"
                      >
                        <option value="Jantar Gastronômico">Jantar Gastronômico Casual</option>
                        <option value="Encontro Romântico / Casal">Encontro Romântico / Casal</option>
                        <option value="Aniversário / Celebração">Aniversário / Celebração</option>
                        <option value="Reunião de Negócios">Almoço / Jantar de Negócios</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1">
                    <label htmlFor="res-notes" className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                      Pedidos Especiais / Alergias
                    </label>
                    <input
                      id="res-notes"
                      type="text"
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      placeholder="Ex: mesa em canto silencioso, aniversário de casamento..."
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#991B1B]/30 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar Reserva via WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-neutral-500 text-center font-sans">
                    Confirmação instantânea com a recepção: {RESTAURANT_PHONE_DISPLAY}
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: About Us & Chef Presentation (Styled like reference mockup) */}
          <div id="sobre" className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-[#991B1B]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#F87171] uppercase">
                Sobre o Buddha Bistrô
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Enraizado na Tradição, Inspirado pela Paixão
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              <p>
                No Buddha Bistrô Asiático, honramos a pureza e a ancestralidade das cozinhas japonesa, tailandesa e chinesa, reinterpretando-as com a vibração contemporânea e os melhores insumos do litoral da Bahia.
              </p>
              <p>
                Cada corte de sashimi, cada defumação do wok e cada infusão de especiarias refletem nossa obsessão por equilíbrio, estética refinada e hospitalidade calorosa.
              </p>
            </div>

            {/* Chef Signature Block */}
            <div className="pt-2 flex items-center justify-between border-t border-white/5">
              <div>
                <span className="font-script text-3xl sm:text-4xl text-[#F87171] block">
                  Buddha Bistrô
                </span>
                <span className="text-xs text-neutral-400 font-sans tracking-wider uppercase">
                  Equipe & Sushiman Executivo
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">Salvador · Bahia</div>
                  <div className="text-[11px] text-[#FCA5A5]">Rio Vermelho Gastronomia</div>
                </div>
              </div>
            </div>

            {/* Chef Portrait / Atmosphere Card with Video Preview Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[16/9] bg-[#1A1A1A]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80"
                alt="Ambiente e cozinha de alta gastronomia no Buddha Bistrô"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#F87171] tracking-widest uppercase">
                      Experiência Imersiva
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Cozinha Aberta & Balcão Omotenashi
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#991B1B] text-white flex items-center justify-center shadow-lg shadow-[#991B1B]/40 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
