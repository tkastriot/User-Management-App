import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from './types'

export interface UsersState {
  items: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}
const initialState: UsersState = { items: [], status: 'idle' }

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    return await res.json() as User[]
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserToTop(state, action: PayloadAction<User>) {
      state.items = [action.payload, ...state.items]
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.items.findIndex(u => u.id === action.payload.id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.items = state.items.filter(u => u.id !== action.payload)
    }
  },
  extraReducers: b => {
    b.addCase(fetchUsers.pending, s => { s.status = 'loading' })
     .addCase(fetchUsers.fulfilled, (s,a) => { s.status='succeeded'; s.items=a.payload })
     .addCase(fetchUsers.rejected, (s,a) => { s.status='failed'; s.error=a.error.message })
  }
})

export const { addUserToTop, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
