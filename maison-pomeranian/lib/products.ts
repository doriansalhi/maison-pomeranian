import type { Product, CollectionSlug } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'p001',
    slug: 'elixir-de-purete',
    name: 'Elixir de Pureté',
    description:
      "L'Élixir de Pureté a été conçu comme un véritable soin de haute cosmétique canine pour sublimer la fourrure vaporeuse de votre petit lion.",
    price: 3500,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777379578/Elixire_sw9ks3.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777570442/elixir_b8a8z5.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Essentiel',
    spec: '99% naturel',
    inStock: true,
    createdAt: '2026-04-29',
  },
  {
    id: 'p003',
    slug: 'baume-douceur-infini',
    name: 'Baume Douceur Infini',
    description:
      "Un soin d'exception conçu comme un rituel de tendresse pour les pattes de votre Pomeranian.",
    price: 2800,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777570137/Gemini_Generated_Image_a1ozsya1ozsya1oz_srcdxc.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777569990/ChatGPT_Image_28_avr._2026_21_39_27_fd2m6g.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777573218/Votre_texte_de_paragraphe_1088_x_1324_px_4_ynrdil.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Essentiel',
    spec: '100% Naturel · Saint-Tropez · 30g',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p004',
    slug: 'brosse-nuage-de-soie',
    name: 'Brosse Nuage de Soie',
    description:
      "L'accessoire ultime pour sublimer le pelage vaporeux de votre Pomeranian.",
    price: 4200,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777553376/ChatGPT_Image_28_avr._2026_20_11_14_zi781j.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777553376/ChatGPT_Image_28_avr._2026_20_08_26_x6l9zn.png',
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Nouveauté',
    spec: 'Bois naturel & Acier poli',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p005',
    slug: 'brosse-cocon-de-soin',
    name: 'Brosse Cocon de Soin',
    description:
      "Un véritable moment de spa à la maison.",
    price: 3800,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777553519/ChatGPT_Image_28_avr._2026_21_18_22_a5oemm.png',
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Essentiel',
    spec: "Coussin d'air anti-statique · Bois d'Érable",
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p006',
    slug: 'brume-de-soie-demelante',
    name: 'Brume de Soie Démêlante',
    description:
      "Le secret d'un brossage sans effort.",
    price: 3200,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777382332/Huile-de-soin_kqyxs4.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777572127/Votre_texte_de_paragraphe_1088_x_1324_px_2_nqcu67.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Essentiel',
    spec: 'Format 120ml · Pureté garantie',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p007',
    slug: 'shampoing-art-de-vivre',
    name: 'Shampoing "Art de Vivre" à la Française',
    description:
      "Bien plus qu'un simple nettoyage, ce shampoing est un véritable soin haute couture.",
    price: 4500,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777382606/shampoing_a0gvvs.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777571882/Votre_texte_de_paragraphe_1088_x_1324_px_1_b9ithg.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Nouveauté',
    spec: 'Fait avec amour à Saint-Tropez · Full Effect · Pureté garantie',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p008',
    slug: 'eclat-du-regard',
    name: 'Éclat du Regard',
    description:
      "Retrouvez la pureté du regard de votre Loulou avec ce soin ciblé haute performance.",
    price: 2400,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777554354/soins-des-yeux_rts7cm.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777573064/Votre_texte_de_paragraphe_1088_x_1324_px_3_aqukxn.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Essentiel',
    spec: 'Application précise · Formule Douce · Pureté garantie',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p009',
    slug: 'stylo-nettoyage-dentaire',
    name: 'Le Stylo de Nettoyage Dentaire',
    description:
      "Un sourire éblouissant pour un Loulou rayonnant.",
    price: 3900,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777554436/Stylo-netoyage-dentaire_smfxc0.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777570680/Brosse%C3%A0dent_dq72aj.png'
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Nouveauté',
    spec: 'Format 5ml · Contrôle du tartre · Pureté garantie',
    inStock: true,
    createdAt: '2026-04-30',
  },
  {
    id: 'p010',
    slug: 'peigne-or-signature',
    name: "Peigne d'Or Signature",
    description:
      "L'excellence au service de la beauté de votre Pomeranian.",
    price: 2500,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777574100/28_avr._2026_20_04_08_wqtxf9.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777558888/Gemini_Generated_Image_69ynk469ynk469yn_frik1h.png',
    ],
    collection: 'Soins & Cosmétiques',
    collectionSlug: 'soins-cosmetiques',
    tag: 'Édition limitée',
    spec: 'Fini Doré Haute Brillance · Précision Ultime',
    inStock: true,
    createdAt: '2026-05-01',
  },
  {
    id: 'p002',
    slug: 'escalier-nuage',
    name: 'Escalier Nuage',
    description:
      "Un escalier élégant et moelleux pour permettre à votre Pomeranian d'accéder à vos moments de complicité en toute sécurité.",
    price: 18900,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777575758/Votre_texte_de_paragraphe_1088_x_1324_px_5_kwfpri.png',
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777577343/Votre_texte_de_paragraphe_1088_x_1324_px_7_yxk4sl.png',
    ],
    collection: 'Art de vivre',
    collectionSlug: 'art-de-vivre',
    tag: 'Nouveauté',
    spec: 'Structure mousse haute densité',
    inStock: true,
    createdAt: '2026-04-29',
    colors: [
      {
        name: 'Ivoire',
        hex: '#FDFCF8',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777575758/Votre_texte_de_paragraphe_1088_x_1324_px_5_kwfpri.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777577343/Votre_texte_de_paragraphe_1088_x_1324_px_7_yxk4sl.png',
        ],
      },
      {
        name: 'Sable',
        hex: '#E6D5B8',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777582668/Votre_texte_de_paragraphe_1088_x_1324_px_8_u2f0iv.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777577343/Votre_texte_de_paragraphe_1088_x_1324_px_7_yxk4sl.png',
        ],
      },
      {
        name: 'Gris Nuage',
        hex: '#D1D1D1',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777576404/Votre_texte_de_paragraphe_1088_x_1324_px_6_aloa8n.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777577343/Votre_texte_de_paragraphe_1088_x_1324_px_7_yxk4sl.png',
        ],
      },
    ],
  },
  {
    id: 'p011',
    slug: 'petit-escalier-nuage',
    name: 'Petit Escalier Nuage',
    description:
      "Sécurisez les montées et descentes de votre petit compagnon avec cet escalier au design soigné.",
    price: 13900,
    currency: 'EUR',
    images: [
      'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641501/Votre_texte_de_paragraphe_1088_x_1324_px_11_kxmi1n.png',
    ],
    collection: 'Art de vivre',
    collectionSlug: 'art-de-vivre',
    tag: 'Nouveauté',
    spec: 'Structure mousse haute densité · Made in France',
    inStock: true,
    createdAt: '2026-05-01',
    colors: [
      {
        name: 'Ivoire',
        hex: '#FDFCF8',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641501/Votre_texte_de_paragraphe_1088_x_1324_px_11_kxmi1n.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641459/Votre_texte_de_paragraphe_1088_x_1324_px_13_hjxdms.png'
        ],
      },
      {
        name: 'Sable',
        hex: '#E6D5B8',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641500/Votre_texte_de_paragraphe_1088_x_1324_px_12_yyosqk.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641459/Votre_texte_de_paragraphe_1088_x_1324_px_13_hjxdms.png',
        ],
      },
      {
        name: 'Gris Nuage',
        hex: '#D1D1D1',
        images: [
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641501/Votre_texte_de_paragraphe_1088_x_1324_px_10_hgbu00.png',
          'https://res.cloudinary.com/dci5mreqo/image/upload/v1777641459/Votre_texte_de_paragraphe_1088_x_1324_px_13_hjxdms.png',
        ],
      },
    ],
  },
];

export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return PRODUCTS.filter((p) => p.collectionSlug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getNewProducts(limit = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}