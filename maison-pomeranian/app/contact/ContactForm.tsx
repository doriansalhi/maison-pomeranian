'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqenpyzz';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <ScrollReveal>
      <div className="bg-pur rounded-cloud p-8 lg:p-12 border-soft shadow-soft">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-peche-100 text-orose-500 mb-6">
                <Check size={28} strokeWidth={2} />
              </div>
              <h2 className="font-serif text-3xl text-terre italic mb-3">
                Message envoyé !
              </h2>
              <p className="text-terre/70 leading-relaxed max-w-md mx-auto">
                Merci pour votre message. Nous vous répondrons sous 48h.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 soft-label text-terre transition-all duration-500 ease-in-out hover:text-orose-500"
              >
                Envoyer un autre message →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
                    Prénom
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre"
                  />
                </label>
                <label className="block">
                  <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
                    Nom
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre"
                  />
                </label>
              </div>

              <label className="block">
                <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre"
                />
              </label>

              <label className="block">
                <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
                  Sujet
                </span>
                <select
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre"
                >
                  <option value="">Choisir un sujet</option>
                  <option value="commande">Une commande</option>
                  <option value="produit">Un produit</option>
                  <option value="presse">Presse &amp; partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </label>

              <label className="block">
                <span className="soft-label text-terre/60 block mb-2 text-[0.65rem]">
                  Votre message
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-creme rounded-soft border-soft focus:border-peche-400 outline-none transition-all duration-500 ease-in-out font-serif text-terre resize-none"
                />
              </label>

              

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-peche-400 text-pur rounded-pill transition-all duration-500 ease-in-out hover:bg-peche-500 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="soft-label">
                  {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
                </span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}