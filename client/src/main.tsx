import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'


import All from './app/items/all'
import Vegetables from './app/items/vegetables'
import Fruits from './app/items/fruites.tsx'
import Dairy from './app/items/dairy.tsx';
import RiceOil from './app/items/rice_oil.tsx'
import Login from './features/authentication/login'
import Signup from './features/authentication/signup'
import WishList from './pages/wishlistPage'
import Cart from './pages/cart'
import store from './app/store'
import { Home } from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path:'/',element:<Home/>},
      { path: '/api/products/all', element: <All /> },
      { path: '/api/products/vegetables', element: <Vegetables /> },
      { path: '/api/products/fruits', element: <Fruits /> },
      {path:'/api/products/dairy',element:<Dairy/>},
      {path:'/api/products/riceOil',element:<RiceOil/>},
      {path:'/user/api/auth/login',element:<Login/>},
      {path:'/user/api/auth/signup',element:<Signup/>},
    ]
  },
  {
    path: '/wishlist',
    element:<WishList/>
  },
  {
    path:'/cart',
    element:<Cart/>
  }
])

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <GoogleOAuthProvider clientId='684059861966-jahprcdnb485pja5n1qu1li3r6iuktrh.apps.googleusercontent.com'>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </GoogleOAuthProvider>
)
