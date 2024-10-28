import React from 'react'
import Header from './Component/Header'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './Component/Home'
import Footer from './Component/Footer'
import Form from './Component/Form'

const Links =[
  {
    path: '/',
    element : <Home/>
  }
]

const App = () => {
  return (
    <Router>
      <Header />
        <Routes>
            {
              Links.map((item)=>{
                return <Route path={item.path} element={item.element}  />
              })
            }
        </Routes>
        <Footer />
    </Router>    
  )
}

export default App
