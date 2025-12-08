import { useState } from 'react';
import { Send, Users, Bell, Tag, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SEGMENTS = [
  { id: 'all', name: 'All Users', count: 15420, icon: Users },
  { id: 'members', name: 'Members Only', count: 2156, icon: Tag },
  { id: 'attendees', name: 'Festival Attendees', count: 8432, icon: Bell },
  { id: 'vip', name: 'VIP Pass Holders', count: 342, icon: Users },
];

const MESSAGE_TYPES = [
  { id: 'info', name: 'Information', color: 'bg-blue-500' },
  { id: 'promo', name: 'Promotion', color: 'bg-green-500' },
  { id: 'reminder', name: 'Reminder', color: 'bg-yellow-500' },
  { id: 'alert', name: 'Alert', color: 'bg-red-500' },
];

interface SentMessage {
  id: string;
  title: string;
  message: string;
  segment: string;
  type: string;
  sentAt: string;
  delivered: number;
  opened: number;
}

export default function AdminBroadcast() {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [messageType, setMessageType] = useState('info');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [sentMessages, setSentMessages] = useState<SentMessage[]>([
    {
      id: '1',
      title: 'Opening Night Tickets Available',
      message: 'Get your tickets for the 68th Annual Gala before they sell out!',
      segment: 'all',
      type: 'promo',
      sentAt: '2 hours ago',
      delivered: 14892,
      opened: 8234,
    },
    {
      id: '2',
      title: 'Screening Reminder',
      message: 'Your screening of "Bay Dreams" starts in 2 hours at Castro Theatre.',
      segment: 'attendees',
      type: 'reminder',
      sentAt: '1 day ago',
      delivered: 245,
      opened: 198,
    },
    {
      id: '3',
      title: 'Exclusive Member Event',
      message: 'You\'re invited to a private Q&A with the festival directors.',
      segment: 'members',
      type: 'info',
      sentAt: '3 days ago',
      delivered: 2102,
      opened: 1567,
    },
  ]);

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    setSending(true);

    // Simulate sending
    setTimeout(() => {
      const segment = SEGMENTS.find(s => s.id === selectedSegment);
      const newMessage: SentMessage = {
        id: Date.now().toString(),
        title,
        message,
        segment: selectedSegment,
        type: messageType,
        sentAt: 'Just now',
        delivered: segment?.count || 0,
        opened: 0,
      };

      setSentMessages([newMessage, ...sentMessages]);
      setTitle('');
      setMessage('');
      setSending(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const selectedSegmentData = SEGMENTS.find(s => s.id === selectedSegment);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Broadcast</h1>
        <p className="text-gray-600">Send push notifications to your users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Segment Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Select Audience</h2>
            <div className="grid grid-cols-2 gap-3">
              {SEGMENTS.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedSegment === segment.id
                      ? 'border-sf-red bg-sf-red/5'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedSegment === segment.id ? 'bg-sf-red' : 'bg-gray-100'
                    }`}>
                      <segment.icon size={20} className={selectedSegment === segment.id ? 'text-white' : 'text-gray-600'} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{segment.name}</p>
                      <p className="text-sm text-gray-500">{segment.count.toLocaleString()} users</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Composition */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Compose Message</h2>

            {/* Message Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <div className="flex gap-2">
                {MESSAGE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMessageType(type.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      messageType === type.id
                        ? `${type.color} text-white`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title"
                maxLength={50}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red"
              />
              <p className="text-xs text-gray-400 mt-1">{title.length}/50 characters</p>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                maxLength={200}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sf-red/20 focus:border-sf-red resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{message.length}/200 characters</p>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || !title.trim() || !message.trim()}
              className="w-full py-3 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send to {selectedSegmentData?.count.toLocaleString()} users
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview & History */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Preview</h2>
            <div className="bg-gray-900 rounded-2xl p-4">
              <div className="bg-gray-800 rounded-xl p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sf-red rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold text-sm">SFIFF</span>
                      <span className="text-gray-400 text-xs">now</span>
                    </div>
                    <p className="text-white text-sm font-medium mt-1">{title || 'Notification title'}</p>
                    <p className="text-gray-300 text-sm mt-0.5 line-clamp-2">{message || 'Your message will appear here...'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Broadcasts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Recent Broadcasts</h2>
            <div className="space-y-3">
              {sentMessages.slice(0, 5).map((msg) => {
                const typeData = MESSAGE_TYPES.find(t => t.id === msg.type);
                const openRate = ((msg.opened / msg.delivered) * 100).toFixed(0);
                return (
                  <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-2 ${typeData?.color}`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{msg.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{msg.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {msg.sentAt}
                          </span>
                          <span>{openRate}% opened</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-up">
          <CheckCircle size={20} />
          <span className="font-medium">Message sent successfully!</span>
        </div>
      )}
    </div>
  );
}
