import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Palette Coucher de Soleil Tropézien ────────────────────────
      colors: {
        // Fonds doux et chauds
        creme: '#FFF9F2',          // crème lumineuse, fond principal
        sable: '#FBF1E4',          // sable doux, fond alternatif
        pur: '#FFFFFF',

        // Pêche (couleur signature)
        peche: {
          DEFAULT: '#F5B79A',
          50: '#FEF6F1',
          100: '#FDE8DB',
          200: '#FACDB1',
          300: '#F7B388',
          400: '#F5B79A',          // pêche signature
          500: '#E89671',
          600: '#D27852',
          700: '#A85A3D',
          800: '#7C402A',
          900: '#502719',
        },

        // Rose poudré (accent féminin)
        rose: {
          DEFAULT: '#F4C8C0',
          50: '#FEF7F5',
          100: '#FCEBE6',
          200: '#F8D7CE',
          300: '#F4C8C0',          // rose tendre signature
          400: '#EDA89C',
          500: '#E08878',
          600: '#C66752',
        },

        // Or rose (chaleur lumineuse, remplace l'or sablé)
        orose: {
          DEFAULT: '#D9A574',
          100: '#F5E6D3',
          200: '#EDD0AE',
          300: '#E2BA8E',
          400: '#D9A574',          // or rose signature
          500: '#C18957',
          600: '#9E6E43',
          700: '#7A5532',
        },

        // Texte (terre cuite très foncée pour douceur, pas du noir)
        terre: {
          DEFAULT: '#3D2817',
          50: '#F5EDE5',
          100: '#E5D2BF',
          200: '#C9A988',
          300: '#A07F5C',
          400: '#6B5036',
          500: '#3D2817',          // texte principal
          600: '#2E1D11',
          700: '#1F130A',
        },
      },

      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        // (mono retiré — trop tech)
      },

      // Transitions soyeuses 500ms partout
      transitionDuration: { DEFAULT: '500ms' },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Arrondis modérés (le "mix doux")
      borderRadius: {
        soft: '0.875rem',   // 14px — cartes
        cloud: '1.5rem',    // 24px — gros blocs
        pill: '9999px',     // boutons en pilule
      },

      backdropBlur: { xs: '2px' },

      // Dégradés coucher de soleil
      backgroundImage: {
        'gradient-sunset':
          'linear-gradient(135deg, #FDE8DB 0%, #F8D7CE 50%, #F5E6D3 100%)',
        'gradient-sunset-soft':
          'linear-gradient(180deg, #FFF9F2 0%, #FDE8DB 100%)',
        'gradient-warm-glow':
          'radial-gradient(circle at 30% 20%, rgba(245,183,154,0.4) 0%, transparent 60%)',
      },

      boxShadow: {
        // Ombres chaudes et douces (pêche au lieu du gris)
        soft: '0 4px 30px rgba(245, 183, 154, 0.15)',
        glow: '0 10px 40px -10px rgba(245, 183, 154, 0.3)',
        warm: '0 20px 60px -20px rgba(217, 165, 116, 0.25)',
      },

      keyframes: {
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-soft': 'floatSoft 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
