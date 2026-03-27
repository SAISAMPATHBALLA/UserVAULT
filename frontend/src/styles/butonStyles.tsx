export const activeBtn = {
  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
  color: '#fff',
  boxShadow: '0 4px 12px rgba(167,139,250,0.35)',
  '&:hover': { background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)' },
}
export const inactiveBtn = {
  borderColor: 'rgba(167,139,250,0.25)',
  color: '#c4b5fd',
  '&:hover': { borderColor: '#a78bfa', background: 'rgba(167,139,250,0.08)' },
}

export const fadeSlideUp = {
  '@keyframes fadeSlideUp': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
}