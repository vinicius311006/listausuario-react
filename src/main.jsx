import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Formulario from './components/formulario/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Formulario />
  </StrictMode>,
)
