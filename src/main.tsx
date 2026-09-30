import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource-variable/newsreader/opsz.css'
import './index.css'
import Design from './pages/Design.tsx'

const router = createBrowserRouter([
  { path: '/', element: <p className="p-8">Lab Enigma</p> },
  { path: '/design', element: <Design /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
