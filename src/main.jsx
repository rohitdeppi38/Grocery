import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import All from './components/component/all.jsx'
import Vegetables from './components/component/vegetables.jsx'
import Fruits from './components/component/fruites.jsx'

const router=createBrowserRouter([
  {path:"",element:<App/>,children:[
    {path:"/",element:<All/>},
    {path:"/vegetables" ,element:<Vegetables/>},
    {path:'/fruits', element:<Fruits/>}
]}])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
 
 ,
)
