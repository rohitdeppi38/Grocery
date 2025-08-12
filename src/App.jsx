import { useState } from 'react'
import Header from './components/header/header'
import {Outlet} from "react-router-dom"
import Footer from "./components/footer/footer.jsx"



function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    
    </>
  )
}

export default App
