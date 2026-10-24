import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  ShoppingBag,
  Store,
  MapPin,
  UtensilsCrossed,
  Info,
} from 'lucide-react';
import { CartItem, OrderType } from '../types';
import {
  formatCurrency,
  generateWhatsAppOrderUrl,
  RESTAURANT_PHONE_DISPLAY,
} from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('mesa');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [includeServiceFee, setIncludeServiceFee] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const subtotal = items.reduce(
    (acc, it) => acc + it.menuItem.price * it.quantity,
    0
  );
  const serviceFee = includeServiceFee ? subtotal * 0.1 : 0;
  const grandTotal = subtotal + serviceFee;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const url = generateWhatsAppOrderUrl({
      items,
      orderType,
      tableNumber,
      customerName: customerName.trim() || 'Cliente Buddha',
      customerPhone: customerPhone.trim() || undefined,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
      notes: generalNotes.trim() || undefined,
      includeServiceFee,
    });

    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              mass: 0.85,
            }}
            className="w-full max-w-md bg-[#181818] border-l border-white/10 h-full flex flex-col shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#991B1B]/20 border border-[#991B1B]/40 flex items-center justify-center text-[#F87171]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Comanda Virtual
              </h2>
              <span className="text-[11px] text-neutral-400 font-sans">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-neutral-400 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                title="Limpar comanda"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Fechar Comanda"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-base font-semibold text-white">
                Sua comanda está vazia
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs">
                Explore nosso cardápio oriental e toque no botão “+” dos pratos para montar seu pedido.
              </p>
            </div>
          ) : (
            <>
              {/* Order Type Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Modalidade do Atendimento
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121212] rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setOrderType('mesa')}
                    className={`py-2 px-1 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'mesa'
                        ? 'bg-[#991B1B] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>No Bistrô</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('retirada')}
                    className={`py-2 px-1 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'retirada'
                        ? 'bg-[#991B1B] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Takeaway</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-1 rounded-lg text-xs font-medium flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#991B1B] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Delivery</span>
                  </button>
                </div>
              </div>

              {/* Contextual Input depending on Order Type */}
              {orderType === 'mesa' && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <label htmlFor="mesa-num" className="text-xs font-medium text-neutral-300">
                    Número da sua Mesa no Buddha
                  </label>
                  <input
                    id="mesa-num"
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ex: Mesa 04 ou Balcão"
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <label htmlFor="delivery-addr" className="text-xs font-medium text-neutral-300">
                    Endereço de Entrega Completo
                  </label>
                  <input
                    id="delivery-addr"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Rua, Número, Apto, Bairro em Salvador"
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Pratos da Comanda
                </span>

                <div className="divide-y divide-white/5">
                  {items.map((cartItem) => {
                    const itemTotal = cartItem.menuItem.price * cartItem.quantity;
                    return (
                      <div
                        key={cartItem.id}
                        className="py-3 flex items-start justify-between gap-3 text-sm"
                      >
                        <div className="flex-1 space-y-1">
                          <h4 className="font-serif font-medium text-white">
                            {cartItem.menuItem.name}
                          </h4>

                          {/* Customizations tags */}
                          {(cartItem.meatPoint ||
                            cartItem.spiceLevel ||
                            cartItem.allergens ||
                            cartItem.notes) && (
                            <div className="text-[11px] text-neutral-400 space-y-0.5 font-light">
                              {cartItem.meatPoint && (
                                <div>Ponto: {cartItem.meatPoint}</div>
                              )}
                              {cartItem.spiceLevel && (
                                <div>Pimenta: {cartItem.spiceLevel}</div>
                              )}
                              {cartItem.allergens && cartItem.allergens.length > 0 && (
                                <div>Obs: {cartItem.allergens.join(', ')}</div>
                              )}
                              {cartItem.notes && (
                                <div className="italic text-neutral-300">
                                  "{cartItem.notes}"
                                </div>
                              )}
                            </div>
                          )}

                          <div className="font-mono text-xs text-neutral-300 tabular-nums">
                            {formatCurrency(cartItem.menuItem.price)} un.
                          </div>
                        </div>

                        {/* Quantity Stepper & Subtotal */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-mono font-bold text-white tabular-nums text-sm">
                            {formatCurrency(itemTotal)}
                          </span>

                          <div className="flex items-center bg-[#222222] rounded-md border border-white/10 p-0.5">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  cartItem.id,
                                  cartItem.quantity - 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
                            >
                              {cartItem.quantity === 1 ? (
                                <Trash2 className="w-3 h-3 text-red-400" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                            </button>
                            <span className="w-6 text-center font-mono text-xs text-white">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  cartItem.id,
                                  cartItem.quantity + 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Contact Inputs */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Dados de Identificação
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu Nome Completo"
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Seu WhatsApp (com DDD)"
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
                  />
                </div>
                <input
                  type="text"
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Observação geral para a cozinha ou garçom..."
                  className="w-full bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#991B1B]"
                />
              </div>

              {/* Service Fee Toggle (Optional 10%) */}
              {orderType === 'mesa' && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <input
                      id="service-fee"
                      type="checkbox"
                      checked={includeServiceFee}
                      onChange={(e) => setIncludeServiceFee(e.target.checked)}
                      className="rounded border-white/20 text-[#991B1B] focus:ring-0 cursor-pointer"
                    />
                    <label
                      htmlFor="service-fee"
                      className="text-xs text-neutral-300 cursor-pointer select-none"
                    >
                      Incluir Taxa de Serviço sugerida (10%)
                    </label>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 tabular-nums">
                    {formatCurrency(subtotal * 0.1)}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with WhatsApp Conversion Button */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#141414] border-t border-white/10 space-y-3">
            {/* Totals */}
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal dos Pratos:</span>
                <span className="font-mono text-neutral-200 tabular-nums">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              {includeServiceFee && (
                <div className="flex justify-between">
                  <span>Serviço (10%):</span>
                  <span className="font-mono text-neutral-200 tabular-nums">
                    {formatCurrency(serviceFee)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span className="font-serif">Total Estimado:</span>
                <span className="font-mono text-lg text-[#F87171] tabular-nums">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            {/* Payment instruction banner */}
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Pagamento direto no restaurante ou via PIX/Cartão na entrega.
              </span>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido para o WhatsApp</span>
            </button>
            <div className="text-[11px] text-neutral-500 text-center font-mono">
              WhatsApp da gerência: {RESTAURANT_PHONE_DISPLAY}
            </div>
          </div>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
