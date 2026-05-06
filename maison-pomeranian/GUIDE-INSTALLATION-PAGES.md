# Guide — Ajouter les nouvelles pages au site

Vous allez ajouter **toutes les pages manquantes** à votre projet Maison Pomeranian.

⏱️ Comptez 10-15 minutes.

---

## Étape 1 — Préparation

1. **Arrêtez le serveur** : dans VS Code, terminal en bas, faites `Ctrl+C`
2. **Téléchargez et dézippez `nouvelles-pages.zip`** sur votre Bureau
3. Vous obtenez un dossier `nouvelles-pages` avec cette structure :

```
nouvelles-pages/
├── app/
│   ├── collections/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── products/
│   │   └── [slug]/page.tsx
│   ├── heritage/page.tsx
│   ├── journal/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── livraison/page.tsx
│   ├── cgv/page.tsx
│   ├── mentions/page.tsx
│   ├── retours/page.tsx
│   ├── commande/confirmee/page.tsx
│   └── not-found.tsx
├── components/
│   ├── AddToCartButton.tsx
│   ├── ClearCartOnMount.tsx
│   └── LegalPageLayout.tsx
└── lib/
    ├── products.ts
    └── journal.ts
```

---

## Étape 2 — Méthode rapide (glisser-déposer)

**Le plus simple : on va copier-coller les dossiers entiers.**

### A. Copier les composants
1. Sur votre Bureau, ouvrez `nouvelles-pages/components/`
2. Sélectionnez les 3 fichiers : `AddToCartButton.tsx`, `ClearCartOnMount.tsx`, `LegalPageLayout.tsx`
3. Faites `Ctrl+C` (copier)
4. Naviguez vers `Bureau/maison-pomeranian/maison-pomeranian/components/`
5. Faites `Ctrl+V` (coller)

### B. Copier les fichiers `lib`
1. Sur votre Bureau, ouvrez `nouvelles-pages/lib/`
2. Sélectionnez les 2 fichiers : `products.ts` et `journal.ts`
3. `Ctrl+C` puis collez dans `Bureau/maison-pomeranian/maison-pomeranian/lib/`

### C. Copier les pages `app`
1. Sur votre Bureau, ouvrez `nouvelles-pages/app/`
2. Sélectionnez **TOUS les sous-dossiers** : `collections`, `products`, `heritage`, `journal`, `contact`, `livraison`, `cgv`, `mentions`, `retours`, `commande`
3. Sélectionnez aussi le fichier `not-found.tsx`
4. `Ctrl+C`
5. Naviguez vers `Bureau/maison-pomeranian/maison-pomeranian/app/`
6. Faites `Ctrl+V`

⚠️ **Si Windows demande "Remplacer les fichiers ?"** → il ne devrait pas y avoir de conflit, mais si oui, cliquez **`Ignorer`** ou **`Non`** (on ne veut pas écraser `app/page.tsx` ou `app/layout.tsx`).

---

## Étape 3 — Configurer Formspree (optionnel, pour le formulaire contact)

Le formulaire de contact utilise **Formspree** (la même chose que pour vos faire-part).

1. Dans VS Code, ouvrez `app/contact/page.tsx`
2. Trouvez la ligne 9 :
   ```ts
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/VOTRE_ENDPOINT_ICI';
   ```
3. Remplacez `VOTRE_ENDPOINT_ICI` par votre endpoint Formspree (ex: `meepjgae` que vous utilisez déjà)
4. Sauvegardez (`Ctrl+S`)

---

## Étape 4 — Relancer le site

Dans le terminal VS Code :

```
npm run dev
```

Ouvrez **http://localhost:3000** en navigation privée et testez les nouvelles URLs :

- ✅ `/collections` — index des 4 collections
- ✅ `/collections/escale-fraicheur` (et les 3 autres)
- ✅ `/heritage` — Notre histoire
- ✅ `/journal` — Le Journal avec 4 articles
- ✅ `/journal/le-spitz-nain-une-histoire-de-tendresse` (article)
- ✅ `/contact` — Formulaire
- ✅ `/livraison`, `/cgv`, `/mentions`, `/retours`
- ✅ `/n-importe-quoi-qui-existe-pas` — Page 404 personnalisée tendre

---

## Étape 5 — Plus tard, ajouter vos vrais produits

Ouvrez `lib/products.ts`. Le fichier contient un commentaire avec un **template d'exemple**.

Pour ajouter votre premier produit, remplacez le tableau vide par :

```ts
export const PRODUCTS: Product[] = [
  {
    id: 'p001',
    slug: 'tapis-pampelonne',
    name: 'Tapis Rafraîchissant Pampelonne',
    description: 'Un tapis tout doux, frais comme une brise du large...',
    price: 8900, // 89,00 € en centimes
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/votre-compte/image/upload/v1/tapis-1.jpg',
    ],
    collection: "L'Escale Fraîcheur",
    collectionSlug: 'escale-fraicheur',
    tag: 'Nouveauté',
    spec: '100% coton bio',
    inStock: true,
    createdAt: '2026-04-26',
  },
  // ... ajoutez d'autres produits ici
];
```

Une fois sauvegardé, les produits apparaîtront automatiquement sur `/collections/escale-fraicheur` et chacun aura sa propre page sur `/products/tapis-pampelonne`.

---

## Pages créées — récapitulatif

| URL | Description |
|---|---|
| `/collections` | Index des 4 collections |
| `/collections/[slug]` | Page d'une collection avec ses produits |
| `/products/[slug]` | Fiche produit individuelle |
| `/heritage` | Notre histoire (placeholders pour vos textes) |
| `/journal` | Index du Journal avec 4 articles fictifs |
| `/journal/[slug]` | Article individuel |
| `/contact` | Formulaire de contact (Formspree) |
| `/livraison` | Tarifs et engagements livraison |
| `/cgv` | Conditions Générales de Vente |
| `/mentions` | Mentions légales |
| `/retours` | Politique de retours |
| `/commande/confirmee` | Page de succès après paiement Stripe |
| 404 | Page introuvable personnalisée |

Tout est dans la même palette pêche/rose tendre cohérente avec le reste du site.

---

## En cas de problème

Si vous voyez une erreur en rouge dans le terminal au lancement :
1. Copiez les premières lignes d'erreur
2. Envoyez-les-moi en texte (pas de capture du `.env.local` !)
3. Je vous corrige.

Si une page reste blanche dans le navigateur :
1. Ouvrez la console (F12 → Console)
2. Envoyez-moi les erreurs en rouge
