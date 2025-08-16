import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ProfileProvider } from './context/ProfileProvider.jsx';
import { EmployeeProvider } from './context/EmployeeContext.jsx';

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
