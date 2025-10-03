import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import UsersPage from './pages/UsersPage'
import UserDetailsPage from './pages/UserDetailsPage'
import AddUserPage from './pages/AddUserPage'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <UsersPage /> },
    { path: 'users/:id', element: <UserDetailsPage /> },
    { path: 'add', element: <AddUserPage /> }
  ] }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
