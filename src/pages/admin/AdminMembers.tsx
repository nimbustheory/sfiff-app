import { useState } from 'react';
import { Users, Search, Mail, Star, Plus, Edit2, Trash2, X } from 'lucide-react';

type Tier = 'Cinephile' | 'Patron' | 'Director' | 'Producer';

interface Member {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  joined: string;
  points: number;
}

const SEED_MEMBERS: Member[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', tier: 'Patron', joined: '2024-02-11', points: 4820 },
  { id: '2', name: 'Marcus Alvarado', email: 'marcus.a@example.com', tier: 'Cinephile', joined: '2024-06-03', points: 1240 },
  { id: '3', name: 'Priya Natarajan', email: 'priya.n@example.com', tier: 'Director', joined: '2023-11-22', points: 9340 },
  { id: '4', name: 'Jonah Weiss', email: 'jweiss@example.com', tier: 'Cinephile', joined: '2025-01-09', points: 680 },
  { id: '5', name: 'Aria Park', email: 'aria.park@example.com', tier: 'Producer', joined: '2022-04-17', points: 18420 },
  { id: '6', name: 'Diego Castaneda', email: 'diego.c@example.com', tier: 'Patron', joined: '2024-09-28', points: 3510 },
];

const TIER_COLORS: Record<Tier, string> = {
  Cinephile: 'bg-gray-100 text-gray-700',
  Patron: 'bg-blue-50 text-blue-700',
  Director: 'bg-amber-50 text-amber-700',
  Producer: 'bg-purple-50 text-purple-700',
};

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>(SEED_MEMBERS);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Member | null>(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
  );

  const remove = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));
  const closeModal = () => {
    setEditing(null);
    setShowNew(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-sm text-gray-500 mt-1">{members.length} active SFFILM members</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral transition-colors"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members by name or email"
            className="flex-1 outline-none text-sm"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Member</th>
              <th className="text-left px-4 py-3 font-medium">Tier</th>
              <th className="text-left px-4 py-3 font-medium">Points</th>
              <th className="text-left px-4 py-3 font-medium">Joined</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sf-red to-sf-coral flex items-center justify-center text-white font-semibold">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail size={11} />
                        {m.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TIER_COLORS[m.tier]}`}>
                    {m.tier}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-sf-gold text-sf-gold" />
                    {m.points.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{m.joined}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setEditing(m)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-red-600 hover:bg-red-50 rounded-lg ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  <Users size={24} className="mx-auto mb-2 opacity-50" />
                  No members match "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || showNew) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                {editing ? 'Edit Member' : 'Add Member'}
              </h2>
              <button onClick={closeModal} className="p-1 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                defaultValue={editing?.name}
                placeholder="Full name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="email"
                defaultValue={editing?.email}
                placeholder="Email"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
              />
              <select
                defaultValue={editing?.tier ?? 'Cinephile'}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option>Cinephile</option>
                <option>Patron</option>
                <option>Director</option>
                <option>Producer</option>
              </select>
              <button
                onClick={closeModal}
                className="w-full py-2.5 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
