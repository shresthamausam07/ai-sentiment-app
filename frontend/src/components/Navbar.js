import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Brain,
  Sun,
  Moon,
  Menu,
  Activity,
  Shield,
  BarChart3,
  GitCompare,
  Database
} from 'lucide-react';

const NavbarContainer = styled.nav`
  background: ${props => props.theme?.colors?.cardBackground || '#ffffff'};
  border-bottom: 1px solid ${props => props.theme?.colors?.border || '#e2e8f0'};
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme?.colors?.primary || '#3b82f6'};
  text-decoration: none;
`;

const LogoIcon = styled(Brain)`
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, ${props => props.theme?.colors?.primary || '#3b82f6'}, ${props => props.theme?.colors?.secondary || '#8b5cf6'});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${props => props.theme?.colors?.text || '#1e293b'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.theme?.colors?.backgroundSecondary || '#f8fafc'};
    color: ${props => props.theme?.colors?.primary || '#3b82f6'};
  }

  &.active {
    background: ${props => props.theme?.colors?.primary || '#3b82f6'};
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(16, 185, 129, 0.15);
  color: ${props => props.status === 'online'
    ? props.theme?.colors?.success || '#10b981'
    : props.status === 'offline'
      ? props.theme?.colors?.error || '#ef4444'
      : props.theme?.colors?.warning || '#f59e0b'};

  @media (max-width: 768px) {
    display: none;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'online'
    ? props.theme?.colors?.success || '#10b981'
    : props.status === 'offline'
      ? props.theme?.colors?.error || '#ef4444'
      : props.theme?.colors?.warning || '#f59e0b'};
  box-shadow: 0 0 8px currentColor;
  animation: ${props => props.status === 'online' ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
    }
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme?.colors?.backgroundSecondary || '#f8fafc'};
  color: ${props => props.theme?.colors?.text || '#1e293b'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme?.colors?.border || '#e2e8f0'};
    color: ${props => props.theme?.colors?.primary || '#3b82f6'};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme?.colors?.backgroundSecondary || '#f8fafc'};
  color: ${props => props.theme?.colors?.text || '#1e293b'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme?.colors?.border || '#e2e8f0'};
    color: ${props => props.theme?.colors?.primary || '#3b82f6'};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const navItems = [
  { path: '/', label: 'Dashboard', icon: Database },
  { path: '/sentiment', label: 'Sentiment', icon: Brain },
  { path: '/fake-detection', label: 'Fake Detection', icon: Shield },
  { path: '/batch-analysis', label: 'Batch', icon: BarChart3 },
  { path: '/model-comparison', label: 'Compare', icon: GitCompare },
  { path: '/statistics', label: 'Statistics', icon: Activity },
];

const Navbar = ({ onToggleSidebar, onToggleTheme, theme, apiStatus }) => {
  const location = useLocation();

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online': return 'API Online';
      case 'offline': return 'API Offline';
      case 'loading': return 'Loading...';
      default: return 'Unknown';
    }
  };

  return (
    <NavbarContainer theme={theme}>
      <LogoSection>
        <IconButton onClick={onToggleSidebar} theme={theme}>
          <Menu />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <LogoIcon />
            <LogoText>AI Sentiment</LogoText>
          </Logo>
        </Link>
      </LogoSection>

      <NavLinks>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={item.path}
                className={isActive ? 'active' : ''}
                theme={theme}
              >
                <Icon />
                {item.label}
              </NavLink>
            </motion.div>
          );
        })}
      </NavLinks>

      <Actions>
        <StatusIndicator status={apiStatus} theme={theme}>
          <StatusDot status={apiStatus} theme={theme} />
          {getStatusText()}
        </StatusIndicator>

        <ThemeToggle onClick={onToggleTheme} theme={theme}>
          {theme === 'light' ? <Moon /> : <Sun />}
        </ThemeToggle>
      </Actions>
    </NavbarContainer>
  );
};

export default Navbar;