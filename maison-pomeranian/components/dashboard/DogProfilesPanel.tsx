'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Weight, Heart, Trash2 } from 'lucide-react';
import type { DogProfile, CreateDogProfileInput } from '@/types';
import { formatDateFR, formatWeight } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export default function DogProfilesPanel() {
  const [profiles, setProfiles] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dogs')
      .then((r) => r.json())
      .then((d) => setProfiles(d.profiles ?? []))
      .catch(() => setProfiles([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data: CreateDogProfileInput) => {
    setError(null);
    const res = await fetch('/api/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      setProfiles((p) => [json.profile, ...p]);
      setShowForm(false);
    } else {
      setError(json.error ?? 'Erreur inconnue');
      console.error('🔴 POST /api/dogs:', json.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce profil ?')) return;
    const res = await fetch(`/api/dogs/${id}`, { method: 'DELETE' });
    if (res.ok) setProfiles((p) => p.filter((x) => x.id !== id));
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="soft-label text-orose-500 mb-2">
            Le Profil du Loulou
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-terre">
            Vos compagnons
          </h2>
        </div>
        <button
          onClick={() => { setShowForm(true); setError(null); }}
          className="inline-flex items-center gap-2 px-5 py-3 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
        >
          <Plus size={14} strokeWidth={1.5} />
          <span className="soft-label">Nouveau profil</span>
        </button>
      </div>

      {error && (
        <div className="px-5 py-3 bg-red-50 border border-red-200 rounded-soft text-red-600 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-64 bg-pur rounded-cloud animate-pulse border-soft"
            />
          ))}
        </div>
      ) : profiles.length === 0 && !showForm ? (
        <div className="bg-pur rounded-cloud p-16 text-center border-soft shadow-soft">
          <Heart
            size={32}
            strokeWidth={1}
            className="mx-auto text-peche-400 mb-4"
          />
          <p className="font-serif text-2xl text-terre mb-3 italic">
            Aucun Loulou enregistré
          </p>
          <p className="text-terre/60 max-w-md mx-auto">
            Enregistrez votre Pomeranian pour recevoir des recommandations
            personnalisées et des soins sur-mesure, avec amour.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {profiles.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group bg-pur p-8 rounded-cloud border-soft border-soft-hover shadow-soft transition-all duration-500 ease-in-out hover:shadow-warm hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="soft-label text-orose-500/70 text-[0.65rem]">
                      Mon Loulou
                    </div>
                    <h3 className="font-serif text-2xl text-terre mt-1 italic">
                      {p.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    aria-label="Supprimer le profil"
                    className="p-2 text-terre/30 rounded-full transition-all duration-500 ease-in-out hover:text-orose-500 hover:bg-peche-50"
                  >
                    <Trash2 size={14} strokeWidth={1.25} />
                  </button>
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-peche-100">
                    <dt className="soft-label text-terre/50 flex items-center gap-2 text-[0.65rem]">
                      <Calendar size={12} strokeWidth={1.5} />
                      Anniversaire
                    </dt>
                    <dd className="text-terre/80">
                      {formatDateFR(p.birth_date)}
                    </dd>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-peche-100">
                    <dt className="soft-label text-terre/50 flex items-center gap-2 text-[0.65rem]">
                      <Weight size={12} strokeWidth={1.5} />
                      Poids
                    </dt>
                    <dd className="text-terre/80">
                      {formatWeight(p.weight)}
                    </dd>
                  </div>
                  {p.color && (
                    <div className="flex justify-between items-center">
                      <dt className="soft-label text-terre/50 text-[0.65rem]">
                        Robe
                      </dt>
                      <dd className="text-terre/80 font-serif italic">
                        {p.color}
                      </dd>
                    </div>
                  )}
                </dl>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <DogForm
            onSubmit={handleCreate}
            onCancel={() => { setShowForm(false); setError(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Formulaire modal doux ────────────────────────────────────────────
function DogForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (d: CreateDogProfileInput) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<CreateDogProfileInput>({
    name: '',
    birthDate: '',
    weight: 2000,
    color: '',
  });

  const fields = [
    {
      key: 'name' as const,
      label: 'Nom',
      type: 'text',
      placeholder: 'Pomponnette',
      required: true,
    },
    {
      key: 'birthDate' as const,
      label: 'Anniversaire',
      type: 'date',
      placeholder: '',
      required: true,
    },
    {
      key: 'weight' as const,
      label: 'Poids (g)',
      type: 'number',
      placeholder: '2000',
      required: true,
    },
    {
      key: 'color' as const,
      label: 'Robe (optionnel)',
      type: 'text',
      placeholder: 'Roux, blanc crème…',
      required: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[80] bg-terre/30 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onCancel}
    >
      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="w-full max-w-lg bg-pur p-10 space-y-6 rounded-cloud shadow-warm"
      >
        <div>
          <div className="soft-label text-orose-500 mb-2">Nouveau profil</div>
          <h3 className="font-serif text-3xl text-terre italic">
            Mon Loulou
          </h3>
        </div>

        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
              {f.label}
            </span>
            <input
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              value={String(form[f.key] ?? '')}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  [f.key]:
                    f.type === 'number'
                      ? Number(e.target.value)
                      : e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre text-lg"
            />
          </label>
        ))}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border-soft text-terre/70 rounded-pill transition-all duration-500 ease-in-out hover:border-peche-400 hover:text-orose-500"
          >
            <span className="soft-label">Annuler</span>
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow"
          >
            <span className="soft-label">Enregistrer</span>
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}