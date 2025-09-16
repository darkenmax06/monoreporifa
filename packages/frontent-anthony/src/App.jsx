import './App.css'
import { Navigate, Route, Routes} from "react-router-dom"
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import useUser from './hooks/useUser'
import Tickets from './pages/Tickets'

function App() {
  const {user} = useUser()

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}  />
        <Route path='/dashboard/:number' element={<Tickets/>}  />
        <Route path='/dashboard/:number' element={user ? <Tickets/> :  <Navigate to={"/login"} />  }  />
        <Route path='/dashboard' element={ <Dashboard/>  }  />
        <Route path='/dashboard' element={ user ? <Dashboard/> :  <Navigate to={"/login"} />  }  />
        <Route path='/login' element={<Login/> }  />
        <Route path='/*' element={<h2>ESTA DIRECCION NO EXISTE</h2>}/>
      </Routes>
    </>
  )
}

export default App
