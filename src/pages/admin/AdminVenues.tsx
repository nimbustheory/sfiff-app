import { useState } from 'react';
import { MapPin, Users, Film, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Venue } from '../../types';

export default function AdminVenues() {
  const { venues } = useAdmin();
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [showNew, setShowNew] = useState(false);

  const openEdit = (venue: Venue) => setEditingVenue(venue);
  const closeModal = () => {
    setEditingVenue(null);
    setShowNew(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Venues</h1>
          <p className="text-sm text-gray-500 mt-1">Manage festival screening locations</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral transition-colors"
        >
          <Plus size={18} />
          Add Venue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative h-40 bg-gray-200">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{venue.name}</h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={12} />
                {venue.address}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Film size={12} />
                  {venue.screens} screen{venue.screens !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {venue.capacity} seats
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => openEdit(venue)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editingVenue || showNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                {editingVenue ? 'Edit Venue' : 'Add Venue'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                defaultValue={editingVenue?.name}
                placeholder="Venue name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="text"
                defaultValue={editingVenue?.address}
                placeholder="Address"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  defaultValue={editingVenue?.screens}
                  placeholder="Screens"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                />
                <input
                  type="number"
                  defaultValue={editingVenue?.capacity}
                  placeholder="Capacity"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={closeModal}
                className="w-full py-2.5 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral"
              >
                Save Venue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
