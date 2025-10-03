import * as React from 'react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Typography
} from '@mui/material'
import { useAppDispatch } from '../hooks'
import { addUser } from '../usersSlice'
import { useNavigate } from 'react-router-dom'

export default function AddUserPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // required
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // optional
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [street, setStreet] = useState('')
  const [suite, setSuite] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [company, setCompany] = useState('')

  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email) {
      setError('Name and Email are required')
      return
    }

    dispatch(
      addUser({
        id: Date.now(),
        name,
        email,
        phone: phone || 'N/A',
        website: website || 'N/A',
        address: {
          street: street || 'N/A',
          suite: suite || 'N/A',
          city: city || 'N/A',
          zipcode: zipcode || 'N/A'
        },
        company: { name: company || 'Local User' }
      })
    )

    navigate('/')
  }

  return (
    <Stack alignItems="center" mt={4}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              {/* required fields */}
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* optional fields */}
              <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />

              <Typography variant="subtitle1">Address</Typography>
              <TextField
                label="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <TextField
                label="Suite"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
              />
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="Zip"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />

              <TextField
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained">
                Add User
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  )
}
