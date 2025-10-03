import * as React from 'react'
import { useEffect } from 'react'
import { fetchUsers } from '../usersSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  Card,
  CardContent,
  Typography,
  Stack,
  CircularProgress
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((s) => s.users)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchUsers())
  }, [dispatch, status])

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
      <Typography variant="h5">Users</Typography>
      <Grid container spacing={2}>
        {items.map((u) => (
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
