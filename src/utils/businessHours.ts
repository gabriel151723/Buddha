import { BusinessStatus } from '../types';

interface TimeRange {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

interface DaySchedule {
  dayName: string;
  isOpenDay: boolean;
  shifts: TimeRange[];
}

const SCHEDULE: Record<number, DaySchedule> = {
  0: {
    // Domingo
    dayName: 'Domingo',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 16, endMinute: 30 },
      { startHour: 18, startMinute: 30, endHour: 23, endMinute: 0 },
    ],
  },
  1: {
    // Segunda-feira (Fechado)
    dayName: 'Segunda-feira',
    isOpenDay: false,
    shifts: [],
  },
  2: {
    // Terça-feira
    dayName: 'Terça-feira',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 15, endMinute: 30 },
      { startHour: 18, startMinute: 30, endHour: 23, endMinute: 30 },
    ],
  },
  3: {
    // Quarta-feira
    dayName: 'Quarta-feira',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 15, endMinute: 30 },
      { startHour: 18, startMinute: 30, endHour: 23, endMinute: 30 },
    ],
  },
  4: {
    // Quinta-feira
    dayName: 'Quinta-feira',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 15, endMinute: 30 },
      { startHour: 18, startMinute: 30, endHour: 23, endMinute: 30 },
    ],
  },
  5: {
    // Sexta-feira
    dayName: 'Sexta-feira',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 16, endMinute: 0 },
      { startHour: 18, startMinute: 30, endHour: 24, endMinute: 30 }, // 00:30 next day
    ],
  },
  6: {
    // Sábado
    dayName: 'Sábado',
    isOpenDay: true,
    shifts: [
      { startHour: 12, startMinute: 0, endHour: 16, endMinute: 0 },
      { startHour: 18, startMinute: 30, endHour: 24, endMinute: 30 },
    ],
  },
};

function formatMinutes(hour: number, minute: number): string {
  const h = hour >= 24 ? hour - 24 : hour;
  return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function getBusinessStatus(customDate?: Date): BusinessStatus {
  const now = customDate || new Date();
  const day = now.getDay();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = SCHEDULE[day];

  if (todaySchedule && todaySchedule.isOpenDay) {
    for (const shift of todaySchedule.shifts) {
      const startMin = shift.startHour * 60 + shift.startMinute;
      const endMin = shift.endHour * 60 + shift.endMinute;

      if (currentTotalMinutes >= startMin && currentTotalMinutes < endMin) {
        const closeTimeStr = formatMinutes(shift.endHour, shift.endMinute);
        return {
          isOpen: true,
          statusLabel: 'Aberto Agora',
          detail: `Até às ${closeTimeStr}`,
          badgeColor: 'emerald',
        };
      }
    }

    // Check if opening later today
    for (const shift of todaySchedule.shifts) {
      const startMin = shift.startHour * 60 + shift.startMinute;
      if (currentTotalMinutes < startMin) {
        const openTimeStr = formatMinutes(shift.startHour, shift.startMinute);
        return {
          isOpen: false,
          statusLabel: `Abre às ${openTimeStr}`,
          detail: 'Atendimento hoje',
          badgeColor: 'amber',
        };
      }
    }
  }

  // Next opening day calculation
  let nextDayIndex = (day + 1) % 7;
  let daysForward = 1;
  while (daysForward <= 7) {
    const nextSched = SCHEDULE[nextDayIndex];
    if (nextSched.isOpenDay && nextSched.shifts.length > 0) {
      const firstShift = nextSched.shifts[0];
      const openTimeStr = formatMinutes(firstShift.startHour, firstShift.startMinute);
      const dayWord = daysForward === 1 ? 'Amanhã' : nextSched.dayName;
      return {
        isOpen: false,
        statusLabel: `Abre ${dayWord} às ${openTimeStr}`,
        detail: daysForward === 1 ? 'Prepare seu pedido' : 'Aguardamos sua visita',
        badgeColor: 'rose',
      };
    }
    nextDayIndex = (nextDayIndex + 1) % 7;
    daysForward++;
  }

  return {
    isOpen: false,
    statusLabel: 'Abre às 18:30',
    detail: 'Terça a Domingo',
    badgeColor: 'amber',
  };
}
