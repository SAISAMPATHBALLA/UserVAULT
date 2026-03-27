import { Panel, Loader, Progress, Tag } from 'rsuite'
import { Box, Typography } from '@mui/material'

export function KpiCard({ icon, label, value, accent, tag }: {
  icon: React.ReactNode; label: string; value: string | number; accent: string; tag?: string
}) {
  return (
    <Panel
      className="app-glass-panel"
      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          width: 46, height: 46, borderRadius: 2.5, flexShrink: 0,
          background: `${accent}20`, border: `1px solid ${accent}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent,
        }}>
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.7 }}>
              {label}
            </Typography>
            {tag && <Tag size="sm" style={{ background: `${accent}25`, color: accent, border: 'none', fontSize: '0.6rem', padding: '0 5px' }}>{tag}</Tag>}
          </Box>
          <Typography sx={{ color: '#fff', fontSize: '1.55rem', fontWeight: 800, lineHeight: 1.2 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Panel>
  )
}

export function DeptProgressList({ entries, total }: { entries: [string, number][]; total: number }) {
  const top = entries.slice(0, 6)
  return (
    <Box>
      {top.map(([dept, count], i) => (
        <Box key={dept} sx={{ mb: i < top.length - 1 ? 1.5 : 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontWeight: 500 }}>
              {dept}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
              {count}
            </Typography>
          </Box>
          <Progress.Line
            percent={Math.round((count / total) * 100)}
            strokeColor="#a78bfa"
            trailColor="rgba(255,255,255,0.08)"
            showInfo={false}
            strokeWidth={6}
            style={{ padding: 0 }}
          />
        </Box>
      ))}
    </Box>
  )
}

export function GlassLoader({ height }: { height: number }) {
  return (
    <Panel
      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Loader size="md" content="Loading…" vertical />
    </Panel>
  )
}