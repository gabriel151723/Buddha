import React from 'react';
import { Fish, UtensilsCrossed, Flame, HeartHandshake } from 'lucide-react';

export const PillarsBar: React.FC = () => {
  const pillars = [
    {
      number: '01',
      icon: Fish,
      title: 'Ingredientes Nobres',
      subtitle: 'Origem & Frescor Diário',
      description: 'Peixes nobres e frutos do mar inspecionados todas as manhãs no litoral baiano com rastreabilidade sustentável.',
    },
    {
      number: '02',
      icon: UtensilsCrossed,
      title: 'Chefs Especialistas',
      subtitle: 'Precisão Milenar',
      description: 'Mestres na técnica tradicional de corte knife-work do sushi e no calor intenso do wok a alta temperatura.',
    },
    {
      number: '03',
      icon: Flame,
      title: 'Receitas Autorais',
      subtitle: 'Fusão Pan-Asiática',
      description: 'Equilíbrio primoroso entre fermentações orientais (missô, shoyu dashi, yuzu) e toques tropicais marcantes.',
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: 'Hospitalidade Imersiva',
      subtitle: 'Espírito Omotenashi',
      description: 'Atmosfera sensorial acolhedora e iluminação cênica desenhada para momentos memoráveis no Rio Vermelho.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16 relative z-20">
      <div className="bg-[#141414]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 lg:divide-x divide-white/5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`pt-6 sm:pt-0 ${idx > 0 ? 'lg:pl-8' : ''} flex flex-col justify-between text-left space-y-3 group`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#1F1F1F] border border-white/10 flex items-center justify-center text-[#F87171] group-hover:scale-105 group-hover:border-[#991B1B] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                    {pillar.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#FCA5A5] uppercase block">
                    {pillar.subtitle}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                    {pillar.title}
                  </h4>
                </div>

                <p className="text-xs text-neutral-300 font-light leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
