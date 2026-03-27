import { Box, Typography, Chip, Tooltip } from '@mui/material'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'

const HAIR_COLORS = [
  { label: 'Black',    swatch: '#1c1c1c' },
  { label: 'Brown',    swatch: '#6b3a2a' },
  { label: 'Blonde',   swatch: '#d4a832' },
  { label: 'Red',      swatch: '#c0392b' },
]

interface HairColorFilterProps {
  selected: string | null
  onChange: (color: string | null) => void
  disabled?: boolean
}

export default function HairColorFilter({ selected, onChange, disabled }: HairColorFilterProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
        <ColorLensOutlinedIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }} />
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          Hair
        </Typography>
      </Box>

      {/* All / clear */}
      <Chip
        label="All"
        size="small"
        onClick={() => onChange(null)}
        disabled={disabled}
        sx={{
          height: 26, fontSize: '0.72rem', fontWeight: 600,
          background: selected === null ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'rgba(255,255,255,0.06)',
          color: selected === null ? '#fff' : 'rgba(255,255,255,0.55)',
          border: selected === null ? 'none' : '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          boxShadow: selected === null ? '0 3px 10px rgba(167,139,250,0.3)' : 'none',
          '&:hover': { background: selected === null ? undefined : 'rgba(255,255,255,0.1)' },
        }}
      />

      {HAIR_COLORS.map(({ label, swatch }) => {
        const isActive = selected === label
        return (
          <Tooltip key={label} title={label} placement="top">
            <Chip
              size="small"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: swatch, border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <span>{label}</span>
                </Box>
              }
              onClick={() => onChange(isActive ? null : label)}
              disabled={disabled}
              sx={{
                height: 26, fontSize: '0.72rem', fontWeight: 600,
                background: isActive ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
                border: isActive ? '1px solid rgba(167,139,250,0.45)' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                '&:hover': { background: isActive ? undefined : 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.8)' },
              }}
            />
          </Tooltip>
        )
      })}

      {disabled && (
        <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontStyle: 'italic' }}>
          (disabled while searching)
        </Typography>
      )}
    </Box>
  )
}
