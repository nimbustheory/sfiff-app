import { useState } from 'react';
import { Save, Globe, CreditCard, Bell, Shield, Palette, Link2 } from 'lucide-react';

export default function AdminSettings() {
  const [festivalName, setFestivalName] = useState('San Francisco International Film Festival');
  const [edition, setEdition] = useState('68th Annual');
  const [startDate, setStartDate] = useState('2025-04-18');
  const [endDate, setEndDate] = useState('2025-04-28');
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [currency, setCurrency] = useState('USD');
  const [notifOptIn, setNotifOptIn] = useState(true);
  const [autoRefund, setAutoRefund] = useState(false);
  const [memberEarlyAccess, setMemberEarlyAccess] = useState(true);

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure festival details and integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-sf-red text-white rounded-lg font-semibold hover:bg-sf-coral transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-4">
        <Section icon={Globe} title="Festival Details">
          <Field label="Festival Name" value={festivalName} onChange={setFestivalName} />
          <Field label="Edition" value={edition} onChange={setEdition} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date" value={startDate} onChange={setStartDate} type="date" />
            <Field label="End Date" value={endDate} onChange={setEndDate} type="date" />
          </div>
          <Field label="Timezone" value={timezone} onChange={setTimezone} />
        </Section>

        <Section icon={CreditCard} title="Payments & Ticketing">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Currency" value={currency} onChange={setCurrency} />
            <Field label="Stripe Account" value="acct_SFFILM_2025" onChange={() => {}} />
          </div>
          <Toggle
            label="Auto-refund cancelled screenings"
            description="Issue refunds immediately when a showtime is cancelled"
            value={autoRefund}
            onChange={setAutoRefund}
          />
        </Section>

        <Section icon={Link2} title="Integrations">
          <Field label="Website URL" value="https://sffilm.org" onChange={() => {}} />
          <Field label="TMDB API Key" value="••••••••••••3af2" onChange={() => {}} />
          <Field label="Mapbox Access Token" value="••••••••••••b91d" onChange={() => {}} />
        </Section>

        <Section icon={Bell} title="Notifications">
          <Toggle
            label="Push notifications for all audiences"
            description="Screening reminders, lineup drops and schedule changes"
            value={notifOptIn}
            onChange={setNotifOptIn}
          />
          <Toggle
            label="Member early-access alerts"
            description="Notify members 48 hours before public ticket release"
            value={memberEarlyAccess}
            onChange={setMemberEarlyAccess}
          />
        </Section>

        <Section icon={Palette} title="Branding">
          <div className="grid grid-cols-3 gap-3">
            <ColorSwatch label="Primary" hex="#C4463A" />
            <ColorSwatch label="Accent" hex="#D4AF37" />
            <ColorSwatch label="Navy" hex="#1E3A5F" />
          </div>
        </Section>

        <Section icon={Shield} title="Security">
          <Field label="Admin Email" value="admin@sffilm.org" onChange={() => {}} />
          <button className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-sm">
            Reset Admin Password
          </button>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-sf-red/10 flex items-center justify-center">
          <Icon size={16} className="text-sf-red" />
        </div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sf-red"
      />
    </label>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-full flex items-start justify-between p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
    >
      <div className="flex-1 pr-4">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 flex-shrink-0 transition-colors ${value ? 'bg-sf-red' : 'bg-gray-300'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-4' : ''}`} />
      </div>
    </button>
  );
}

function ColorSwatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="w-full h-10 rounded-md mb-2" style={{ background: hex }} />
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xs font-mono text-gray-900">{hex}</div>
    </div>
  );
}
