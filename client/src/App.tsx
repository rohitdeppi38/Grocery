import { useState } from 'react'
import Header from './components/header/header.tsx'
import {Outlet} from "react-router-dom"
import Footer from "./components/footer/footer.tsx"



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
