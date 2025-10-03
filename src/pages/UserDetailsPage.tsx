import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
import { Card, CardContent, Typography, Stack, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import type { User } from '../types'
import { updateUser } from '../usersSlice'

export default function UserDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(s => s.users.items.find(u => String(u.id) === id))
  const [form, setForm] = useState<User | null>(null)

  useEffect(() => { if (user) setForm(user) }, [user])

  if (!user) return <Typography>User not found.</Typography>

  const handleChange = (field: keyof User, value: any) => {
    if (!form) return
    setForm({ ...form, [field]: value })
  }

  const save = () => {
    if (!form) return
    dispatch(updateUser(form))
    navigate('/')
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>Edit User</Typography>
        <Stack gap={2}>
          <TextField label="Name" value={form?.name ?? ''} onChange={e => handleChange('name', e.target.value)} />
          <TextField label="Email" value={form?.email ?? ''} onChange={e => handleChange('email', e.target.value)} />
          <TextField label="Phone" value={form?.phone ?? ''} onChange={e => handleChange('phone', e.target.value)} />
          <TextField label="Website" value={form?.website ?? ''} onChange={e => handleChange('website', e.target.value)} />
          <Typography variant="subtitle1">Address</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
            <TextField label="Street" value={form?.address?.street ?? ''} onChange={e => setForm(f => f ? ({ ...f, address: { ...f.address, street: e.target.value }}) : f)} />
            <TextField label="Suite" value={form?.address?.suite ?? ''} onChange={e => setForm(f => f ? ({ ...f, address: { ...f.address, suite: e.target.value }}) : f)} />
            <TextField label="City" value={form?.address?.city ?? ''} onChange={e => setForm(f => f ? ({ ...f, address: { ...f.address, city: e.target.value }}) : f)} />
            <TextField label="Zip" value={form?.address?.zipcode ?? ''} onChange={e => setForm(f => f ? ({ ...f, address: { ...f.address, zipcode: e.target.value }}) : f)} />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button variant="contained" onClick={save}>Save</Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
          </Stack>
        </Stack>

        <Typography sx={{ mt: 4 }} variant="h6">Read-only details</Typography>
        <Typography>Company: {user.company?.name}</Typography>
      </CardContent>
    </Card>
  )
}
