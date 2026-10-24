import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Camila Mendonça',
      role: 'Local Guide · Google Maps',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Há 2 semanas',
      highlightDish: 'Tataki de Salmão com Trufas & Dragon Roll',
      comment:
        'Uma das melhores experiências asiáticas de Salvador! O tataki trufado derrete na boca e a apresentação dos pratos é impecável. Atendimento nota mil do início ao fim.',
    },
    {
      name: 'Rodrigo Tavares',
      role: 'Crítico Gastronômico Independente',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Há 1 mês',
      highlightDish: 'Black Cod Glaceado & Pad Thai Imperial',
      comment:
        'A textura do bacalhau negro marinado no saquê mirin é transcendental. A técnica de cocção no carvão e o equilíbrio dos molhos mostram o alto nível da cozinha.',
    },
    {
      name: 'Larissa Bahia',
      role: 'Cliente Frequente',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Há 3 semanas',
      highlightDish: 'Cocktail Buddha Zen & Trio Mochi',
      comment:
        'O ambiente do terraço é intimista e aconchegante, perfeito para casais. Fazer o pedido pelo WhatsApp agilizou tudo. Recomendo muito o drink com névoa de sakê!',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#141414] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-[#991B1B]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#F87171] uppercase">
              Experiências Reais
            </span>
            <span className="h-px w-5 bg-[#991B1B]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Aprovado por Quem Ama o Oriente
          </h2>

          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-neutral-300">
              <strong className="text-white">4.8 de 5 estrelas</strong> baseado em 2.418 avaliações no Google
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#1C1C1C] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white">{rev.name}</h4>
                    <span className="text-[10px] text-neutral-400 block">{rev.role}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#F87171] block">
                    Pediu:
                  </span>
                  <span className="text-[10px] text-neutral-400 max-w-[120px] truncate block">
                    {rev.highlightDish}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
