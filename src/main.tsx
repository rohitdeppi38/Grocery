import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import All from './components/component/all'
import Vegetables from './components/component/vegetables'
import Fruits from './components/component/fruites'
import Tea from './components/component/dairy'
import RiceOil from './components/component/rice_oil'
import Login from './authentication/login'
import Signup from './authentication/signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <All /> },
      { path: '/vegetables', element: <Vegetables /> },
      { path: '/fruits', element: <Fruits /> },
      {path:'/dairy',element:<Tea/>},
      {path:'/riceOil',element:<RiceOil/>},
      {path:'/login',element:<Login/>},
      {path:'/signup',element:<Signup/>}
    ]
  }
])

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <GoogleOAuthProvider clientId='684059861966-jahprcdnb485pja5n1qu1li3r6iuktrh.apps.googleusercontent.com'>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
)
