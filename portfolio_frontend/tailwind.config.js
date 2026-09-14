export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.18)',
      },
      backgroundImage: {
        cosmic: 'radial-gradient(circle at top, rgba(56, 189, 248, 0.17), transparent 25%), radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.14), transparent 25%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.14), transparent 22%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(56, 189, 248, 0.2)' },
          '50%': { boxShadow: '0 0 32px rgba(96, 165, 250, 0.3)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
      colors: {
        // Custom brand colors for easy use
        brand: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          dark: '#050816',
        },
      },
    },
  },
  plugins: [],
};

