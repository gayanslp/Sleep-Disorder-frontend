export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#F5F7FB',
        surface: '#FFFFFF',
        ink: '#0F172A',
        muted: '#526077',
        subtle: '#7C879B',
        line: '#E2E7F0',
        field: '#F9FAFC',
        brand: {
          50: '#EEF1FF',
          100: '#E0E6FF',
          200: '#C7D0FE',
          500: '#5B67F1',
          600: '#4B4FE0',
          700: '#3E3FC0',
        },
        insomnia: { bg: '#FFF6E8', fg: '#A15C07', bar: '#E8940F', ring: '#F6D9A8' },
        apnea: { bg: '#FDEFF2', fg: '#B4233F', bar: '#DE3B5B', ring: '#F5C4CF' },
        healthy: { bg: '#EAF8F1', fg: '#16774D', bar: '#1FA36A', ring: '#BDE7D2' },
        danger: { bg: '#FEF1F1', fg: '#B42318', ring: '#F7C8C4' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -16px rgba(15, 23, 42, 0.14)',
        button: '0 1px 2px rgba(62, 63, 192, 0.25), 0 6px 16px -6px rgba(75, 79, 224, 0.45)',
      },
      transitionTimingFunction: {
        snappy: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
