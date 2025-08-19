import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { lazy,Suspense } from 'react'
const LazyApp =  lazy(()=> import("./App.jsx"))
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/Usercontext.jsx'
import Loading from './components/Loading.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading/>} >
          <LazyApp/>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
