import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TeamForm from "./Component/TeamForm.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TeamForm />
  </StrictMode>,
)
