import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, Clock, MapPin, Users, Film, Mic, Music, GraduationCap } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Event } from '../../types';

const CATEGORIES = ['Screenings', 'Q&A', 'Panels', 'Parties', 'Workshops'];
const GRADIENTS = [
  'from-sf-red to-rose-700',
  'from-sf-navy to-blue-800',
  'from-slate-600 to-slate-800',
  'from-purple-600 to-purple-800',
  'from-amber-600 to-orange-700',
  'from-green-600 to-green-800',
];

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Screenings': Film,
  'Q&A': Mic,
  'Panels': Users,
  'Parties': Music,
  'Workshops': GraduationCap,
};

export default function AdminEvents() {
  const { events, venues, addEvent, updateEvent, deleteEvent } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Screenings',
    date: '',
    time: '',
    venue: '',
    price: '',
    maxAttendees: 100,
    image: GRADIENTS[0],
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Screenings',
      date: '',
      time: '',
      venue: '',
      price: '',
      maxAttendees: 100,
      image: GRADIENTS[0],
    });
    setEditingEvent(null);
  };

  const handleOpenModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        date: event.date,
        time: event.time,
        venue: event.venue,
        price: event.price,
        maxAttendees: event.maxAttendees || 100,
        image: event.image,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.time || !formData.venue) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingEvent) {
      updateEvent(editingEvent.id, {
        ...formData,
        attendees: editingEvent.attendees,
      });
    } else {
      addEvent({
        id: Date.now().toString(),
        ...formData,
        attendees: 0,
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Manage festival events, panels, and parties</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const CategoryIcon = CATEGORY_ICONS[event.category] || Film;
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Event Header */}
              <div className={`relative h-24 bg-gradient-to-br ${event.image}`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
                    <CategoryIcon size={12} />
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 line-clamp-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{event.description}</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {event.time}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                  <MapPin size={14} />
                  {event.venue}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {event.attendees || 0}/{event.maxAttendees || 100}
                    </span>
                  </div>
                  <span className="font-semibold text-sf-red">{event.price}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 p-3 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(event)}
                  className="p-2 text-gray-400 hover:text-sf-red hover:bg-sf-red/10 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editingEvent ? 'Edit' : 'Add'} Event</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Event title"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., April 18, 2025"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 6:00 PM"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                <select
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                >
                  <option value="">Select venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.name}>{venue.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., $50"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees</label>
                  <input
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                <div className="flex gap-2 flex-wrap">
                  {GRADIENTS.map((gradient) => (
                    <button
                      key={gradient}
                      onClick={() => setFormData({ ...formData, image: gradient })}
                      className={`w-12 h-8 rounded-lg bg-gradient-to-br ${gradient} ${
                        formData.image === gradient ? 'ring-2 ring-sf-red ring-offset-2' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral">
                {editingEvent ? 'Save Changes' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
