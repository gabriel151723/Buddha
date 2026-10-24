import { CartItem, OrderType, ReservationData } from '../types';

export const RESTAURANT_PHONE = '5571983152006';
export const RESTAURANT_PHONE_DISPLAY = '(71) 98315-2006';
export const INSTAGRAM_URL =
  'https://www.instagram.com/buddhabistroasiatico?stkn=MTlxYXY2eXdtZWt1YQ==';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Buddha+Bistr%C3%B4+Asi%C3%A1tico+Salvador';
export const WAZE_URL =
  'https://waze.com/ul?q=Buddha+Bistro+Asiatico+Salvador';

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function generateWhatsAppOrderUrl(params: {
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  customerName: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  includeServiceFee?: boolean;
}): string {
  const {
    items,
    orderType,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    notes,
    includeServiceFee = false,
  } = params;

  const subtotal = items.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );
  const serviceFee = includeServiceFee ? subtotal * 0.1 : 0;
  const total = subtotal + serviceFee;

  const orderTypeLabels: Record<OrderType, string> = {
    mesa: `Consumo no Restaurante (Mesa ${tableNumber || 'A informar'})`,
    retirada: 'Retirada no Balcão (Takeaway)',
    delivery: 'Delivery Especial Buddha',
  };

  let msg = `🎋 *PEDIDO - BUDDHA BISTRÔ ASIÁTICO*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `👤 *Cliente:* ${customerName.trim() || 'Cliente'}\n`;
  if (customerPhone) {
    msg += `📱 *Telefone:* ${customerPhone}\n`;
  }
  msg += `📍 *Modalidade:* ${orderTypeLabels[orderType]}\n`;

  if (orderType === 'delivery' && deliveryAddress) {
    msg += `🏠 *Endereço de Entrega:* ${deliveryAddress}\n`;
  }
  msg += `\n🍱 *ITENS DA COMANDA:*\n`;

  items.forEach((item, index) => {
    const itemTotal = item.menuItem.price * item.quantity;
    msg += `\n*${index + 1}. ${item.quantity}x ${item.menuItem.name}* (${formatCurrency(itemTotal)})\n`;

    const details: string[] = [];
    if (item.meatPoint) details.push(`Ponto: ${item.meatPoint}`);
    if (item.spiceLevel) details.push(`Pimenta: ${item.spiceLevel}`);
    if (item.allergens && item.allergens.length > 0) {
      details.push(`Restrições: ${item.allergens.join(', ')}`);
    }
    if (item.notes) details.push(`Obs: "${item.notes}"`);

    if (details.length > 0) {
      msg += `   ↳ _${details.join(' | ')}_\n`;
    }
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *Subtotal:* ${formatCurrency(subtotal)}\n`;
  if (includeServiceFee) {
    msg += `✨ *Taxa de Serviço Opcional (10%):* ${formatCurrency(serviceFee)}\n`;
  }
  msg += `💳 *TOTAL ESTIMADO:* ${formatCurrency(total)}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (notes) {
    msg += `📝 *Observações do Pedido:* ${notes}\n\n`;
  }

  msg += `ℹ️ *Formas de Pagamento:* PIX, Cartão de Crédito e Débito.\n`;
  msg += `Aguardando a confirmação da equipe do Buddha Bistrô! 🙏✨`;

  return `https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(msg)}`;
}

export function generateWhatsAppReservationUrl(data: ReservationData): string {
  let msg = `🏮 *RESERVA DE MESA - BUDDHA BISTRÔ ASIÁTICO*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `Olá equipe do Buddha Bistrô! Gostaria de confirmar uma reserva:\n\n`;
  msg += `👤 *Nome:* ${data.name}\n`;
  msg += `📱 *WhatsApp:* ${data.phone}\n`;
  msg += `📅 *Data:* ${data.date}\n`;
  msg += `⏰ *Horário:* ${data.time}\n`;
  msg += `👥 *Pessoas:* ${data.guests} ${data.guests === 1 ? 'pessoa' : 'pessoas'}\n`;
  msg += `🏯 *Espaço Preferido:* ${data.area}\n`;

  if (data.occasion) {
    msg += `🎉 *Ocasião Especial:* ${data.occasion}\n`;
  }
  if (data.specialRequests) {
    msg += `📝 *Observações / Pedidos:* ${data.specialRequests}\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Aguardo a confirmação da disponibilidade. Muito obrigado! 🙏`;

  return `https://wa.me/${RESTAURANT_PHONE}?text=${encodeURIComponent(msg)}`;
}
