import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { EmployeeProvider } from './context/EmployeeContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProfileProvider>
        <EmployeeProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </EmployeeProvider>
      </ProfileProvider>
    </BrowserRouter>
  </StrictMode>,
)
