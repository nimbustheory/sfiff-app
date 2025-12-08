import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Ticket, Tag, Percent, DollarSign, Check } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import type { TicketType, PromoCode } from '../../types';

export default function AdminTickets() {
  const { 
    ticketTypes, addTicketType, updateTicketType, deleteTicketType,
    promoCodes, addPromoCode, updatePromoCode, deletePromoCode 
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState<'types' | 'promos'>('types');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);

  const [ticketForm, setTicketForm] = useState({
    name: '',
    price: 0,
    description: '',
    benefits: [''],
  });

  const [promoForm, setPromoForm] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    validUntil: '',
    usageLimit: 100,
  });

  // Ticket Type handlers
  const handleOpenTicketModal = (ticket?: TicketType) => {
    if (ticket) {
      setEditingTicket(ticket);
      setTicketForm({
        name: ticket.name,
        price: ticket.price,
        description: ticket.description,
        benefits: ticket.benefits,
      });
    } else {
      setEditingTicket(null);
      setTicketForm({ name: '', price: 0, description: '', benefits: [''] });
    }
    setShowTicketModal(true);
  };

  const handleSaveTicket = () => {
    if (!ticketForm.name || ticketForm.price <= 0) {
      alert('Please fill in name and price');
      return;
    }

    const cleanBenefits = ticketForm.benefits.filter(b => b.trim());

    if (editingTicket) {
      updateTicketType(editingTicket.id, { ...ticketForm, benefits: cleanBenefits });
    } else {
      addTicketType({
        id: Date.now().toString(),
        ...ticketForm,
        benefits: cleanBenefits,
      });
    }
    setShowTicketModal(false);
  };

  const handleDeleteTicket = (id: string) => {
    if (confirm('Delete this ticket type?')) {
      deleteTicketType(id);
    }
  };

  // Promo Code handlers
  const handleOpenPromoModal = (promo?: PromoCode) => {
    if (promo) {
      setEditingPromo(promo);
      setPromoForm({
        code: promo.code,
        discount: promo.discount,
        type: promo.type,
        validUntil: promo.validUntil,
        usageLimit: promo.usageLimit,
      });
    } else {
      setEditingPromo(null);
      setPromoForm({ code: '', discount: 0, type: 'percentage', validUntil: '', usageLimit: 100 });
    }
    setShowPromoModal(true);
  };

  const handleSavePromo = () => {
    if (!promoForm.code || promoForm.discount <= 0) {
      alert('Please fill in code and discount');
      return;
    }

    if (editingPromo) {
      updatePromoCode(editingPromo.id, promoForm);
    } else {
      addPromoCode({
        id: Date.now().toString(),
        ...promoForm,
        usageCount: 0,
      });
    }
    setShowPromoModal(false);
  };

  const handleDeletePromo = (id: string) => {
    if (confirm('Delete this promo code?')) {
      deletePromoCode(id);
    }
  };

  const addBenefit = () => {
    setTicketForm({ ...ticketForm, benefits: [...ticketForm.benefits, ''] });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...ticketForm.benefits];
    newBenefits[index] = value;
    setTicketForm({ ...ticketForm, benefits: newBenefits });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = ticketForm.benefits.filter((_, i) => i !== index);
    setTicketForm({ ...ticketForm, benefits: newBenefits });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets & Promos</h1>
          <p className="text-gray-600">Manage ticket types and promotional codes</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('types')}
          className={`pb-3 px-1 font-medium transition-colors relative ${
            activeTab === 'types' ? 'text-sf-red' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Ticket Types
          {activeTab === 'types' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sf-red" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('promos')}
          className={`pb-3 px-1 font-medium transition-colors relative ${
            activeTab === 'promos' ? 'text-sf-red' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Promo Codes
          {activeTab === 'promos' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sf-red" />
          )}
        </button>
      </div>

      {/* Ticket Types Tab */}
      {activeTab === 'types' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => handleOpenTicketModal()}
              className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Ticket Type
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ticketTypes.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Ticket size={20} className="text-sf-red" />
                      <h3 className="font-bold text-gray-900">{ticket.name}</h3>
                    </div>
                    <span className="text-2xl font-bold text-sf-red">${ticket.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{ticket.description}</p>
                  <div className="space-y-1">
                    {ticket.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check size={14} className="text-green-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 p-3 flex justify-end gap-2">
                  <button
                    onClick={() => handleOpenTicketModal(ticket)}
                    className="p-2 text-gray-400 hover:text-sf-red hover:bg-sf-red/10 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Promo Codes Tab */}
      {activeTab === 'promos' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => handleOpenPromoModal()}
              className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-2"
            >
              <Plus size={18} />
              Add Promo Code
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Code</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Discount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Valid Until</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Usage</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {promoCodes.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-sf-red" />
                        <code className="font-mono font-semibold text-gray-900">{promo.code}</code>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {promo.type === 'percentage' ? (
                          <>
                            <Percent size={14} className="text-gray-400" />
                            <span>{promo.discount}% off</span>
                          </>
                        ) : (
                          <>
                            <DollarSign size={14} className="text-gray-400" />
                            <span>${promo.discount} off</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{promo.validUntil}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sf-red rounded-full"
                            style={{ width: `${(promo.usageCount / promo.usageLimit) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{promo.usageCount}/{promo.usageLimit}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenPromoModal(promo)}
                          className="p-2 text-gray-400 hover:text-sf-red hover:bg-sf-red/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePromo(promo.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ticket Type Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTicketModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editingTicket ? 'Edit' : 'Add'} Ticket Type</h2>
              <button onClick={() => setShowTicketModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                  placeholder="e.g., Premium"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  value={ticketForm.price}
                  onChange={(e) => setTicketForm({ ...ticketForm, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="e.g., Enhanced festival experience"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                <div className="space-y-2">
                  {ticketForm.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => updateBenefit(index, e.target.value)}
                        placeholder="e.g., Priority seating"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                      />
                      <button
                        onClick={() => removeBenefit(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addBenefit}
                    className="text-sf-red text-sm font-medium flex items-center gap-1"
                  >
                    <Plus size={16} /> Add benefit
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowTicketModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSaveTicket} className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral">
                {editingTicket ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPromoModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editingPromo ? 'Edit' : 'Add'} Promo Code</h2>
              <button onClick={() => setShowPromoModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <input
                  type="text"
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SFFILM25"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount *</label>
                  <input
                    type="number"
                    value={promoForm.discount}
                    onChange={(e) => setPromoForm({ ...promoForm, discount: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={promoForm.type}
                    onChange={(e) => setPromoForm({ ...promoForm, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={promoForm.validUntil}
                    onChange={(e) => setPromoForm({ ...promoForm, validUntil: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={promoForm.usageLimit}
                    onChange={(e) => setPromoForm({ ...promoForm, usageLimit: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowPromoModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSavePromo} className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral">
                {editingPromo ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
