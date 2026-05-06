// ─── Catalogue ────────────────────────────────────────────────────────
export type CollectionSlug =
  | 'soins-cosmetiques'
  | 'art-de-vivre';

export interface Collection {
  slug: CollectionSlug;
  icon: string;
  name: string;
  tagline: string;
  description: string;
  spec: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Prix en centimes (Stripe convention) */
  price: number;
  currency: 'EUR';
  images: string[];
  collection: string;
  collectionSlug: CollectionSlug;
  /** Badge éditorial (ex. "Édition limitée") */
  tag?: string;
  /** Spec technique courte */
  spec?: string;
  inStock: boolean;
  /** ID du Stripe Price object (mode catalogue Stripe) — facultatif */
  stripePriceId?: string;
  createdAt: string;

  /** Variantes de couleurs (optionnel) */
  colors?: {
    name: string;
    hex: string;
    images?: string[];
  }[];
}

// ─── Panier ───────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  slug: string;
  name: string;
  /** Prix unitaire en centimes */
  price: number;
  image?: string;
  quantity: number;
  stripePriceId?: string;
  selectedColor?: string;
}

// ─── Le Cercle (Supabase) ─────────────────────────────────────────────
export interface DogProfile {
  id: string;
  user_id: string;
  name: string;
  birth_date: string;
  weight: number;
  color?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerProfile {
  id: string;
  clerk_id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  stripe_customer_id?: string | null;
  created_at: string;
}

// ─── API contracts ────────────────────────────────────────────────────
export interface CheckoutRequestBody {
  items: CartItem[];
}
export interface CheckoutResponse {
  url: string | null;
  id: string;
}
export interface CheckoutErrorResponse {
  error: string;
}

export interface CreateDogProfileInput {
  name: string;
  birthDate: string;
  weight: number;
  color?: string;
  notes?: string;
}