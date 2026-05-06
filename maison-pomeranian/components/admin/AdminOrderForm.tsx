'use client';

import { useState } from 'react';

interface Props {
  orderId: string;
  initialStatus: string;
  initialCarrier: string;
  initialNumber: string;
  initialUrl: string;
  initialNotes: string;
}

const STATUSES = [
  { value: 'paid', label: 'Payée' },
  { value: 'processing', label: 'En préparation' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' },
];

export default function AdminOrderForm({
  orderId,
  initialStatus,
  initialCarrier,
  initialNumber,
  initialUrl,
  initialNotes,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [carrier, setCarrier] = useState(initialCarrier);
  const [number, setNumber] = useState(initialNumber);
  const [url, setUrl] = useState(initialUrl);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        tracking_carrier: carrier,
        tracking_number: number,
        tracking_url: url,
        admin_notes: notes,
      }),
    });

    const json = await res.json();
    setSaving(false);

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError(json.error ?? 'Erreur inconnue');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-pur rounded-cloud p-8 border-soft shadow-soft space-y-6">
      <h2 className="font-serif text-2xl text-terre italic">Gestion</h2>

      <label className="block">
        <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">Statut</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none font-serif text-terre"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">Transporteur</span>
        <input
          type="text"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          placeholder="Colissimo, Chronopost…"
          className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none font-serif text-terre"
        />
      </label>

      <label className="block">
        <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">N° de suivi</span>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="1Z999AA10123456784"
          className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none font-serif text-terre"
        />
      </label>

      <label className="block">
        <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">URL de suivi</span>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none font-serif text-terre"
        />
      </label>

      <label className="block">
        <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">Notes internes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Notes visibles uniquement en admin…"
          className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none font-serif text-terre resize-none"
        />
      </label>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {saved && (
        <p className="text-sm text-green-600">Enregistré ✓</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-peche-400 text-pur rounded-pill transition-all duration-500 hover:bg-peche-500 hover:shadow-glow disabled:opacity-50"
      >
        <span className="soft-label">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </span>
      </button>
    </form>
  );
}