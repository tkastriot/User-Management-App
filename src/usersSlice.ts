import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
}

export interface Company {
  name: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  address: Address
  company: Company
}

interface UsersState {
  items: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

const initialState: UsersState = {
  items: [],
  status: 'idle'
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetch',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    return (await res.json()) as User[]
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      // new user at the top
      state.items.unshift(action.payload)
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.items.findIndex(u => u.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.items = state.items.filter(u => u.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addUser, updateUser, deleteUser } = usersSlice.actions
export default usersSlice.reducer
