import { Film, Ticket, Users, DollarSign, TrendingUp, Calendar, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

export default function AdminDashboard() {
  const { movies } = useAdmin();

  const stats = [
    { 
      label: 'Total Revenue', 
      value: '$124,500', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      label: 'Tickets Sold', 
      value: '8,432', 
      change: '+8.2%', 
      trend: 'up',
      icon: Ticket,
      color: 'bg-blue-500'
    },
    { 
      label: 'Active Members', 
      value: '2,156', 
      change: '+5.7%', 
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    { 
      label: 'Films Showing', 
      value: movies.length.toString() || '24', 
      change: '-2', 
      trend: 'down',
      icon: Film,
      color: 'bg-sf-red'
    },
  ];

  const recentActivity = [
    { action: 'Ticket purchased', detail: '2x VIP - Opening Night Gala', time: '2 min ago' },
    { action: 'New member signup', detail: 'Patron tier - Sarah Chen', time: '15 min ago' },
    { action: 'Event RSVP', detail: 'Documentary Panel - 3 guests', time: '1 hour ago' },
    { action: 'Showtime added', detail: 'Castro Theatre - 8:00 PM', time: '2 hours ago' },
    { action: 'Promo code used', detail: 'SFFILM25 - $25 discount', time: '3 hours ago' },
  ];

  const upcomingShowtimes = [
    { movie: 'The Last Horizon', venue: 'Castro Theatre', time: '2:00 PM', tickets: 234 },
    { movie: 'Bay Dreams', venue: 'Roxie Theater', time: '4:30 PM', tickets: 89 },
    { movie: 'Golden Gate Stories', venue: 'SFMOMA', time: '7:00 PM', tickets: 156 },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with the festival.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Clock size={18} />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.action}</p>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                  <span className="text-gray-400 text-xs whitespace-nowrap">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Showtimes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} />
              Today's Showtimes
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {upcomingShowtimes.map((show, index) => (
              <div key={index} className="p-4">
                <p className="font-medium text-gray-900 text-sm">{show.movie}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-gray-600 text-xs">{show.venue}</p>
                  <span className="text-sf-red font-semibold text-sm">{show.time}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-sf-red rounded-full"
                      style={{ width: `${Math.min(show.tickets / 3, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{show.tickets} sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Add Movie', icon: Film, color: 'bg-sf-red' },
          { label: 'Create Showtime', icon: Calendar, color: 'bg-blue-500' },
          { label: 'New Event', icon: Users, color: 'bg-purple-500' },
          { label: 'Send Broadcast', icon: TrendingUp, color: 'bg-green-500' },
        ].map((action) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
              <action.icon size={20} className="text-white" />
            </div>
            <span className="font-medium text-gray-900">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
