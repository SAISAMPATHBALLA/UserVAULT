import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { Panel, Progress, Tag } from 'rsuite'
import Highcharts from 'highcharts'
import HighchartsReactImport from 'highcharts-react-official'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HighchartsReact = ((HighchartsReactImport as any).default ?? HighchartsReactImport) as typeof HighchartsReactImport
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import AppNav from '../../components/ui/AppNav'
import { useGetAllUsersQuery } from '../../apis/getUserDetails'
import type { User } from '../../types/Users'
import { computeStats } from '../../utils/analytics/computeStats'
import { CHART_COLORS } from '../../constants/authConstants'
import { axisDark, tooltipBase } from '../../config/charts'
import { DeptProgressList, GlassLoader, KpiCard } from '../../components/dashboard/dashboardComponents'




export default function DashboardPage() {
  const navigate = useNavigate()
  const storedUser = localStorage.getItem('user')
  const loggedUser = storedUser ? JSON.parse(storedUser) : {}

  const { data, isFetching, isError } = useGetAllUsersQuery()
  const users = data?.users ?? []

  const { deptEntries, genderMap, ageBuckets, eyeMap, avgAge, deptCount, roleCount, total } = useMemo(
    () => computeStats(users),
    [users]
  )

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/login')
  }

  // ─── Chart options ─────────────────────────────────────────────────────────

  const deptOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent', type: 'bar',
      style: { fontFamily: 'inherit' },
      height: 320,
    },
    title: { text: 'Users by Department', style: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: '0.88rem' } },
    xAxis: { ...axisDark, categories: deptEntries.map(([d]) => d) },
    yAxis: { ...axisDark, title: { text: '' }, allowDecimals: false },
    legend: { enabled: false },
    tooltip: { ...tooltipBase, headerFormat: '', pointFormat: '<b>{point.category}</b>: {point.y} users' },
    plotOptions: { bar: { borderRadius: 4, borderWidth: 0, color: '#a78bfa' } },
    series: [{ type: 'bar', name: 'Users', data: deptEntries.map(([, c]) => c) }],
    colors: CHART_COLORS,
    credits: { enabled: false },
    responsive: {
      rules: [{ condition: { maxWidth: 480 }, chartOptions: { chart: { height: 220 }, xAxis: { labels: { style: { fontSize: '0.6rem' } } } } }],
    },
  }

  const genderOptions: Highcharts.Options = {
    chart: { backgroundColor: 'transparent', type: 'pie', height: 260, style: { fontFamily: 'inherit' } },
    title: { text: 'Gender Distribution', style: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: '0.88rem' } },
    tooltip: { ...tooltipBase, pointFormat: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)' },
    plotOptions: {
      pie: {
        innerSize: '58%',
        borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.0f}%',
          style: { color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', textOutline: 'none', fontWeight: '500' },
        },
      },
    },
    series: [{ type: 'pie', name: 'Users', data: Object.entries(genderMap).map(([name, y]) => ({ name, y })) }],
    colors: ['#a78bfa', '#ec4899', '#10b981'],
    credits: { enabled: false },
    responsive: {
      rules: [{ condition: { maxWidth: 400 }, chartOptions: { chart: { height: 200 } } }],
    },
  }

  const ageOptions: Highcharts.Options = {
    chart: { backgroundColor: 'transparent', type: 'column', height: 260, style: { fontFamily: 'inherit' } },
    title: { text: 'Age Distribution', style: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: '0.88rem' } },
    xAxis: { ...axisDark, categories: Object.keys(ageBuckets) },
    yAxis: { ...axisDark, title: { text: '' }, allowDecimals: false },
    legend: { enabled: false },
    tooltip: { ...tooltipBase, headerFormat: '', pointFormat: '<b>Age {point.category}</b>: {point.y} users' },
    plotOptions: { column: { borderRadius: 5, borderWidth: 0, colorByPoint: true } },
    series: [{ type: 'column', name: 'Users', data: Object.values(ageBuckets) }],
    colors: CHART_COLORS,
    credits: { enabled: false },
    responsive: {
      rules: [{ condition: { maxWidth: 400 }, chartOptions: { chart: { height: 180 } } }],
    },
  }

  const eyeOptions: Highcharts.Options = {
    chart: { backgroundColor: 'transparent', type: 'pie', height: 260, style: { fontFamily: 'inherit' } },
    title: { text: 'Eye Color Distribution', style: { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: '0.88rem' } },
    tooltip: { ...tooltipBase, pointFormat: '<b>{point.name}</b>: {point.y} ({point.percentage:.1f}%)' },
    plotOptions: {
      pie: {
        borderColor: 'rgba(255,255,255,0.06)', borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.0f}%',
          style: { color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem', textOutline: 'none', fontWeight: '500' },
        },
      },
    },
    series: [{ type: 'pie', name: 'Users', data: Object.entries(eyeMap).map(([name, y]) => ({ name, y })) }],
    colors: ['#3b82f6', '#10b981', '#a78bfa', '#f59e0b', '#ec4899', '#06b6d4'],
    credits: { enabled: false },
    responsive: {
      rules: [{ condition: { maxWidth: 400 }, chartOptions: { chart: { height: 200 } } }],
    },
  }

  const subtitle = isFetching ? 'Loading analytics…' : isError ? 'Failed to load data' : `Insights across ${total} users`

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #5d2424 0%, #010000 60%, #303031 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Shared navbar ──────────────────────────────────────────────────── */}
      <AppNav
        currentPage="dashboard"
        userName={loggedUser.name ?? ''}
        onLogout={handleLogout}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 3 } }}>

        {/* Title */}
        <Box sx={{ mb: { xs: 2, sm: 3 }, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.5px', mb: 0.5, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Analytics Dashboard
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>
            {subtitle}
          </Typography>
        </Box>

        {/* ── KPI row ──────────────────────────────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 2, sm: 3 },
        }}>
          {isFetching ? (
            <>
              <GlassLoader height={82} />
              <GlassLoader height={82} />
              <GlassLoader height={82} />
              <GlassLoader height={82} />
            </>
          ) : (
            <>
              <KpiCard icon={<PeopleOutlineIcon />}    label="Total Users"  value={total}     accent="#a78bfa" tag="all" />
              <KpiCard icon={<CakeOutlinedIcon />}     label="Average Age"  value={avgAge}    accent="#ec4899" tag="yrs" />
              <KpiCard icon={<BusinessOutlinedIcon />} label="Departments"  value={deptCount} accent="#10b981" />
              <KpiCard icon={<WorkOutlineIcon />}      label="Roles"        value={roleCount} accent="#f59e0b" />
            </>
          )}
        </Box>

        {/* ── Row 1: Dept bar + Top Depts progress ─────────────────────────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 1.5, sm: 2 },
        }}>
          {isFetching ? <GlassLoader height={320} /> : (
            <Panel
              className="app-glass-panel"
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
            >
              <HighchartsReact highcharts={Highcharts} options={deptOptions} />
            </Panel>
          )}

          {isFetching ? <GlassLoader height={320} /> : (
            <Panel
              header={
                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.88rem' }}>
                  Top Departments
                </Typography>
              }
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
            >
              <DeptProgressList entries={deptEntries} total={total} />
            </Panel>
          )}
        </Box>

        {/* ── Row 2: Gender donut + Age column ─────────────────────────────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 1.5, sm: 2 },
          mb: { xs: 1.5, sm: 2 },
        }}>
          {isFetching ? <GlassLoader height={260} /> : (
            <Panel style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <HighchartsReact highcharts={Highcharts} options={genderOptions} />
            </Panel>
          )}
          {isFetching ? <GlassLoader height={260} /> : (
            <Panel style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <HighchartsReact highcharts={Highcharts} options={ageOptions} />
            </Panel>
          )}
        </Box>

        {/* ── Row 3: Eye color pie (full width on mobile, half on sm) ──────── */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 1.5, sm: 2 },
          pb: 3,
        }}>
          {isFetching ? <GlassLoader height={260} /> : (
            <Panel style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <HighchartsReact highcharts={Highcharts} options={eyeOptions} />
            </Panel>
          )}

          {/* Blood group summary using RSuite Progress */}
          {!isFetching && (
            <Panel
              header={
                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700, fontSize: '0.88rem' }}>
                  Blood Group Distribution
                </Typography>
              }
              style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
            >
              <BloodGroupList users={users} />
            </Panel>
          )}
          {isFetching && <GlassLoader height={260} />}
        </Box>

      </Container>
    </Box>
  )
}

// ─── Blood group progress list ────────────────────────────────────────────────
function BloodGroupList({ users }: { users: User[] }) {
  const bgMap: Record<string, number> = {}
  users.forEach(u => { bgMap[u.bloodGroup] = (bgMap[u.bloodGroup] ?? 0) + 1 })
  const entries = Object.entries(bgMap).sort((a, b) => b[1] - a[1])
  const total = users.length

  const bgColors = ['#a78bfa', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#f97316', '#c4b5fd', '#06b6d4']

  return (
    <Box>
      {entries.map(([bg, count], i) => (
        <Box key={bg} sx={{ mb: i < entries.length - 1 ? 1.2 : 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <Tag size="sm" style={{ background: `${bgColors[i % bgColors.length]}25`, color: bgColors[i % bgColors.length], border: 'none', fontWeight: 700, fontSize: '0.7rem', minWidth: 36, textAlign: 'center' }}>
                {bg}
              </Tag>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.73rem' }}>
              {count} · {Math.round((count / total) * 100)}%
            </Typography>
          </Box>
          <Progress.Line
            percent={Math.round((count / total) * 100)}
            strokeColor={bgColors[i % bgColors.length]}
            trailColor="rgba(255,255,255,0.08)"
            showInfo={false}
            strokeWidth={5}
            style={{ padding: 0 }}
          />
        </Box>
      ))}
    </Box>
  )
}
