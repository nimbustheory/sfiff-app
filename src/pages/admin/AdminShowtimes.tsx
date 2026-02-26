import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, Clock, MapPin, Film } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { tmdbApi } from '../../utils/tmdb';
import type { Showtime } from '../../types';

export default function AdminShowtimes() {
  const { showtimes, movies, venues, addShowtime, updateShowtime, deleteShowtime } = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  
  const [formData, setFormData] = useState({
    movieId: 0,
    venue: '',
    screen: 'Screen 1',
    date: '',
    time: '',
    price: 16,
    capacity: 200,
  });

  const resetForm = () => {
    setFormData({
      movieId: 0,
      venue: '',
      screen: 'Screen 1',
      date: '',
      time: '',
      price: 16,
      capacity: 200,
    });
    setEditingShowtime(null);
  };

  const handleOpenModal = (showtime?: Showtime) => {
    if (showtime) {
      setEditingShowtime(showtime);
      setFormData({
        movieId: showtime.movieId,
        venue: showtime.venue,
        screen: showtime.screen,
        date: showtime.date,
        time: showtime.time,
        price: showtime.price,
        capacity: showtime.capacity,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.movieId || !formData.venue || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const movie = movies.find(m => m.id === formData.movieId);

    if (editingShowtime) {
      updateShowtime(editingShowtime.id, {
        ...formData,
        movie,
      });
    } else {
      addShowtime({
        id: Date.now().toString(),
        ...formData,
        movie,
        sold: 0,
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this showtime?')) {
      deleteShowtime(id);
    }
  };

  // Group showtimes by date
  const groupedShowtimes = showtimes.reduce((acc, showtime) => {
    const date = showtime.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Showtimes</h1>
          <p className="text-gray-600">Schedule screenings for your festival</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Showtime
        </button>
      </div>

      {/* Showtimes List */}
      <div className="space-y-6">
        {Object.keys(groupedShowtimes).length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No showtimes scheduled</p>
            <p className="text-gray-400 text-sm">Add movies first, then create showtimes</p>
          </div>
        ) : (
          Object.entries(groupedShowtimes)
            .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
            .map(([date, dateShowtimes]) => (
              <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">{new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {dateShowtimes.map((showtime) => {
                    const movie = movies.find(m => m.id === showtime.movieId);
                    return (
                      <div key={showtime.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                              {movie?.poster_path ? (
                                <img
                                  src={tmdbApi.getImageUrl(movie.poster_path, 'w92')}
                                  alt={movie?.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Film size={24} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{movie?.title || 'Unknown Movie'}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {showtime.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {showtime.venue}
                                </span>
                                <span>{showtime.screen}</span>
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm font-semibold text-sf-red">${showtime.price}</span>
                                <span className="text-sm text-gray-500">
                                  {showtime.sold}/{showtime.capacity} sold
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenModal(showtime)}
                              className="p-2 text-gray-400 hover:text-sf-red hover:bg-sf-red/10 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(showtime.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">{editingShowtime ? 'Edit' : 'Add'} Showtime</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movie *</label>
                <select
                  value={formData.movieId}
                  onChange={(e) => setFormData({ ...formData, movieId: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                >
                  <option value={0}>Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>{movie.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue *</label>
                <select
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                >
                  <option value="">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.name}>{venue.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Screen</label>
                  <select
                    value={formData.screen}
                    onChange={(e) => setFormData({ ...formData, screen: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  >
                    <option>Screen 1</option>
                    <option>Screen 2</option>
                    <option>Screen 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors"
              >
                {editingShowtime ? 'Save Changes' : 'Create Showtime'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
