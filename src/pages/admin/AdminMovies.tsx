import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Download, Film, Star, Calendar } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { tmdbApi } from '../../utils/tmdb';
import type { Movie } from '../../types';

export default function AdminMovies() {
  const { movies, addMovie, updateMovie, deleteMovie } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [tmdbResults, setTmdbResults] = useState<Movie[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [importing, setImporting] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    release_date: '',
    vote_average: 0,
  });

  const handleTmdbSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await tmdbApi.searchMovies(query);
      setTmdbResults(results);
    } else {
      setTmdbResults([]);
    }
  };

  const handleImportMovie = (movie: Movie) => {
    // Check if already imported
    if (movies.find(m => m.id === movie.id)) {
      alert('This movie is already in your collection');
      return;
    }
    addMovie(movie);
    setShowImportModal(false);
    setSearchQuery('');
    setTmdbResults([]);
  };

  const handleEditClick = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingMovie) {
      updateMovie(editingMovie.id, formData);
      setShowEditModal(false);
      setEditingMovie(null);
    }
  };

  const handleDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete this movie? This will also delete associated showtimes.')) {
      deleteMovie(id);
    }
  };

  const loadPopularMovies = async () => {
    setImporting(true);
    try {
      const popular = await tmdbApi.getPopular();
      popular.slice(0, 10).forEach(movie => {
        if (!movies.find(m => m.id === movie.id)) {
          addMovie(movie);
        }
      });
    } catch (error) {
      console.error('Error importing popular movies:', error);
    }
    setImporting(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Movies</h1>
          <p className="text-gray-600">Manage your festival film collection</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadPopularMovies}
            disabled={importing}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Download size={18} />
            {importing ? 'Importing...' : 'Import Popular'}
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Movie
          </button>
        </div>
      </div>

      {/* Movies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
            />
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="p-12 text-center">
            <Film size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-2">No movies in your collection yet</p>
            <p className="text-gray-400 text-sm">Click "Add Movie" to import from TMDB</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Movie</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Release Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {movie.poster_path ? (
                          <img
                            src={tmdbApi.getImageUrl(movie.poster_path, 'w92')}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{movie.title}</p>
                        <p className="text-gray-500 text-sm line-clamp-1 max-w-md">{movie.overview}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      {movie.release_date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(movie)}
                        className="p-2 text-gray-400 hover:text-sf-red hover:bg-sf-red/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(movie.id)}
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
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowImportModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">Import Movie from TMDB</h2>
              <button onClick={() => setShowImportModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a movie..."
                  value={searchQuery}
                  onChange={(e) => handleTmdbSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                />
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto px-4 pb-4">
              {tmdbResults.length > 0 ? (
                <div className="space-y-2">
                  {tmdbResults.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer border border-gray-100"
                      onClick={() => handleImportMovie(movie)}
                    >
                      <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {movie.poster_path ? (
                          <img
                            src={tmdbApi.getImageUrl(movie.poster_path, 'w92')}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{movie.title}</p>
                        <p className="text-gray-500 text-sm">{movie.release_date?.slice(0, 4)}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        {movie.vote_average?.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 2 ? (
                <p className="text-center text-gray-500 py-8">No results found</p>
              ) : (
                <p className="text-center text-gray-400 py-8">Type to search for movies</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">Edit Movie</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                <textarea
                  rows={3}
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
                  <input
                    type="date"
                    value={formData.release_date}
                    onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.vote_average}
                    onChange={(e) => setFormData({ ...formData, vote_average: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-sf-red text-white rounded-lg hover:bg-sf-coral transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
