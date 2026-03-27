import { Panel, Loader, Progress, Tag } from 'rsuite'
import { Box, Typography } from '@mui/material'

export function KpiCard({ icon, label, value, accent, tag }: {
  icon: React.ReactNode; label: string; value: string | number; accent: string; tag?: string
}) {
  return (
    <Panel
      className="app-glass-panel kpi-card"
      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5, md: 2 },
      }}>
        <Box sx={{
          width: { xs: 34, sm: 40, md: 46 },
          height: { xs: 34, sm: 40, md: 46 },
          borderRadius: { xs: 2, sm: 2.5 },
          flexShrink: 0,
          background: `${accent}20`,
          border: `1px solid ${accent}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent,
          '& svg': { fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' } },
        }}>
          {icon}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.2, flexWrap: 'wrap' }}>
            <Typography sx={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.68rem' },
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>
              {label}
            </Typography>
            {tag && (
              <Tag size="sm" style={{
                background: `${accent}25`, color: accent, border: 'none',
                fontSize: '0.58rem', padding: '0 4px', lineHeight: '16px',
              }}>
                {tag}
              </Tag>
            )}
          </Box>
          <Typography sx={{
            color: '#fff',
            fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.55rem' },
            fontWeight: 800,
            lineHeight: 1.15,
          }}>
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