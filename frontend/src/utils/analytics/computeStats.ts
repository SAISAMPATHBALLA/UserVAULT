import type { User } from "../../types/Users"

export function computeStats(users: User[]) {
  const deptMap: Record<string, number> = {}
  const genderMap: Record<string, number> = {}
  const eyeMap: Record<string, number> = {}
  const ageBuckets: Record<string, number> = { '20–29': 0, '30–39': 0, '40–49': 0, '50–59': 0, '60+': 0 }
  const roleSet = new Set<string>()

  users.forEach(u => {
    deptMap[u.company.department] = (deptMap[u.company.department] ?? 0) + 1
    genderMap[u.gender] = (genderMap[u.gender] ?? 0) + 1
    eyeMap[u.eyeColor] = (eyeMap[u.eyeColor] ?? 0) + 1
    roleSet.add(u.role)
    if (u.age < 30) ageBuckets['20–29']++
    else if (u.age < 40) ageBuckets['30–39']++
    else if (u.age < 50) ageBuckets['40–49']++
    else if (u.age < 60) ageBuckets['50–59']++
    else ageBuckets['60+']++
  })

  const deptEntries = Object.entries(deptMap).sort((a, b) => b[1] - a[1])
  const avgAge = users.length ? Math.round(users.reduce((s, u) => s + u.age, 0) / users.length) : 0

  return {
    deptEntries,
    genderMap,
    ageBuckets,
    eyeMap,
    avgAge,
    deptCount: Object.keys(deptMap).length,
    roleCount: roleSet.size,
    total: users.length,
  }
}