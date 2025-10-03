import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../usersSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Stack,
  CircularProgress
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector(s => s.users)
  const [q, setQ] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

  const filtered = useMemo(() => {
    const lower = q.toLowerCase()
    return items.filter(
      u =>
        u.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    )
  }, [items, q])

  if (status === 'loading')
    return (
      <Stack alignItems="center">
        <CircularProgress />
      </Stack>
    )
  if (status === 'failed') return <Typography color="error">{error}</Typography>

  return (
    <Stack gap={2}>
      <TextField
        fullWidth
        label="Search by name or email"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <Grid container spacing={2}>
        {filtered.map(u => (
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
