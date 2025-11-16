import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SentimentAnalysis from './components/SentimentAnalysis';
import FakeReviewDetection from './components/FakeReviewDetection';
import BatchAnalysis from './components/BatchAnalysis';
import ModelComparison from './components/ModelComparison';
import Statistics from './components/Statistics';

// Theme
import { lightTheme, darkTheme } from './styles/theme';

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .card {
    background: ${props => props.theme.colors.cardBackground};
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px ${props => props.theme.colors.shadowColor};
    border: 1px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 8px 25px ${props => props.theme.colors.shadowColor};
    transform: translateY(-2px);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    justify-content: center;
  }

  .btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  .btn-primary:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  .btn-secondary {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
  }

  .btn-secondary:hover {
    background: ${props => props.theme.colors.border};
  }

  .text-area {
    width: 100%;
    min-height: 120px;
    padding: 16px;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    transition: border-color 0.3s ease;
    background: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.text};
  }

  .text-area:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(59, 130, 246, 0.2);
    border-top: 3px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .status-online {
    background-color: #10b981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  }

  .status-offline {
    background-color: #ef4444;
    box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
  }

  .status-warning {
    background-color: #f59e0b;
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.sidebarOpen ? '280px' : '0'};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  duration: 0.3,
  ease: "easeInOut"
};

function App() {
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiStatus, setApiStatus] = useState('loading');

  // Check API status on mount
  useEffect(() => {
    checkApiStatus();

    // Check status periodically
    const interval = setInterval(checkApiStatus, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health`);
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
            apiStatus={apiStatus}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <MainContent sidebarOpen={sidebarOpen}>
            <Content>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/sentiment" element={<SentimentAnalysis />} />
                  <Route path="/fake-detection" element={<FakeReviewDetection />} />
                  <Route path="/batch-analysis" element={<BatchAnalysis />} />
                  <Route path="/model-comparison" element={<ModelComparison />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </motion.div>
            </Content>
          </MainContent>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;