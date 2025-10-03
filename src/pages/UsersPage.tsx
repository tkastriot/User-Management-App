import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../usersSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Stack,
  CircularProgress
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((s) => s.users)
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState<'none' | 'name' | 'email'>('none') // 👈 default = none

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

  const filteredAndSorted = useMemo(() => {
    const lower = q.toLowerCase()
    let result = items.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    )

    if (sortBy === 'none') {
      return result // 👈 keep original order (new users stay at top)
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.email.localeCompare(b.email)
    })
  }, [items, q, sortBy])

  if (status === 'loading') {
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    )
  }
  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <Stack gap={2}>
      <TextField
        fullWidth
        label="Search by name or email"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <TextField
        select
        label="Sort by"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'none' | 'name' | 'email')}
      >
        <MenuItem value="none">None (keep order)</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="email">Email</MenuItem>
      </TextField>

      <Grid container spacing={2}>
        {filteredAndSorted.map((u) => (
          <Grid item key={u.id} xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/users/${u.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {u.name}
                </Typography>
                <Typography variant="body2">{u.email}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.company?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
