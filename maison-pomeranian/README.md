# Maison Pomeranian

> L'Art de Vivre au Frais — E-commerce Neo-Luxe pour Spitz nain.
> Saint-Tropez × Lab textile.

## Stack

- **Next.js 15** (App Router, React 19 RC)
- **Tailwind CSS** + **Framer Motion** (transitions 500ms, scroll reveal)
- **Clerk** v6 — auth + dashboard "Le Cercle"
- **Supabase** — profils chiens (table `dog_profiles`)
- **Stripe Checkout** — paiement
- **Zustand** — state du panier (persisted localStorage)

## Architecture

```
maison-pomeranian/
├── app/
│   ├── layout.tsx              # ClerkProvider + fonts (Cormorant, Inter, JetBrains)
│   ├── page.tsx                # Homepage (Hero + Collections + Heritage)
│   ├── globals.css             # Utilitaires hairline / glass / tech-label
│   ├── le-cercle/page.tsx      # Dashboard membre (protégé Clerk)
│   ├── collections/[slug]/     # PLP par collection (à venir)
│   └── api/
│       ├── checkout/route.ts   # Stripe Checkout Session
│       └── dogs/               # CRUD profils chiens (GET, POST, PATCH, DELETE)
├── components/
│   ├── Header.tsx              # Smart-Riviera glassmorphism
│   ├── Hero.tsx                # "L'Innovation au Sommet"
│   ├── CollectionsGrid.tsx     # 4 collections signature
│   ├── ExpertiseSection.tsx    # Heritage & Lab (fond marine)
│   ├── Footer.tsx
│   ├── ProductCard.tsx         # Carte avec hover gold-glow + quick-add
│   ├── CartDrawer.tsx          # Drawer latéral glassmorphism
│   ├── ui/ScrollReveal.tsx     # Wrapper Framer Motion réutilisable
│   └── dashboard/DogProfilesPanel.tsx
├── lib/
│   ├── stripe.ts               # SDK Stripe Node
│   ├── supabase.ts             # Clients browser + server (@supabase/ssr)
│   ├── store.ts                # Cart Zustand persisted
│   ├── collections.ts          # Données 4 collections
│   └── utils.ts                # cn(), formatPrice, formatWeight
├── types/
│   ├── index.ts                # Product, CartItem, DogProfile, ...
│   └── supabase.ts             # Database typing
├── middleware.ts               # Clerk route protection
├── tailwind.config.ts          # Palette Riviera-Tech
└── supabase-schema.sql         # Schéma DB à exécuter dans Supabase
```

## Setup

```bash
# 1. Install
npm install

# 2. Créer .env.local depuis le template
cp .env.example .env.local
# Renseigner :
#   - Clerk : clés depuis dashboard.clerk.com
#   - Supabase : URL + anon key + service role key
#   - Stripe : clé secrète

# 3. Créer les tables Supabase
# Dans le SQL Editor Supabase, coller le contenu de supabase-schema.sql

# 4. Dev
npm run dev
```

## Directives design respectées

- **Transitions 500ms** : `transition-all duration-500 ease-in-out` partout grâce à `transitionDuration.DEFAULT = 500ms` dans `tailwind.config.ts` (override).
- **Glassmorphism** : `glass` (Header) et `glass-drawer` (Cart) avec `backdrop-filter: blur(20px) saturate(180%)`. La saturation est ce qui donne la sensation Apple-grade.
- **Bordures hairline 0.5px** : utilitaires `.border-hairline` et `.border-hairline-gold`. Les cartes "objet technologique" utilisent `.border-tech` (gradient or→marine→or via `mask-composite`).
- **Scroll reveal** : composant `<ScrollReveal>` avec Framer Motion `whileInView` + slide-up + opacity, et `useReducedMotion` pour l'accessibilité.
- **Typo mixte** :
  - `font-serif` → Cormorant Garamond (titres, prix en marquise)
  - `font-sans` → Inter (corps de texte)
  - `font-mono` + `.tech-label` → JetBrains Mono (specs, IDs, badges)
- **Palette** : `ivoire #FDFCF8`, `marine #001F3F` (avec scale 50→900), `or #C5A059`, `pur #FFFFFF`.

## Stripe

La route `/api/checkout` accepte deux modes :
- **`stripePriceId`** sur le `CartItem` → utilise `price` (catalogue Stripe centralisé).
- Sans `stripePriceId` → `price_data` inline avec montant en centimes.

Vous pouvez démarrer en mode inline puis migrer vers le catalogue Stripe quand vous aurez créé vos SKUs.

## Sécurité Supabase + Clerk

L'auth est gérée par **Clerk uniquement** (pas Supabase Auth). Les routes API Next.js :
1. Valident `auth()` Clerk côté serveur.
2. Filtrent toutes les queries par `user_id = clerkUserId`.
3. RLS est activée mais aucune policy permissive — seul le service role (server-side) accède aux données.

## Déploiement

Vercel est recommandé (Next 15 natif). Variables d'environnement à configurer dans le dashboard Vercel.

```bash
vercel deploy
```

## Roadmap

- [ ] Webhook Stripe `/api/stripe/webhook` → persistance commandes en Supabase
- [ ] PLP `/collections/[slug]` avec ProductCard
- [ ] PDP `/products/[slug]` avec galerie + tech specs
- [ ] Preview mockup iPhone (réutilisable depuis editeur-v7)
- [ ] Page Heritage longform avec photos lab + Spitz
- [ ] Internationalisation (FR/EN)
