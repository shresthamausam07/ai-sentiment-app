import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  X,
  Brain,
  Database,
  Shield,
  BarChart3,
  GitCompare,
  Activity,
  ChevronRight,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0px;
  width: 280px;
  height: 100vh;
  background: ${props => props.theme.colors.cardBackground};
  border-right: 1px solid ${props => props.theme.colors.border};
  z-index: 90;
  overflow-y: auto;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const SidebarSection = styled.div`
  padding: 16px 0;
`;

const SectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 24px;
  margin-bottom: 8px;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  margin: 2px 12px;
  border-radius: 8px;

  &:hover {
    background: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    background: ${props => props.theme.colors.primary};
    color: white;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${props => props.theme.colors.primaryDark};
    }
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

const SidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;
`;

const ApiStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

const StatusLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;

const StatusValue = styled.span`
  font-weight: 500;
  color: ${props => props.status === 'online'
    ? props.theme.colors.success
    : props.status === 'offline'
      ? props.theme.colors.error
      : props.theme.colors.warning};
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.status === 'online'
    ? props.theme.colors.success
    : props.status === 'offline'
      ? props.theme.colors.error
      : props.theme.colors.warning};
  box-shadow: 0 0 6px currentColor;
  animation: ${props => props.status === 'online' ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
`;

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: -280 }
};

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: Database, description: 'Overview and quick stats' },
  { path: '/sentiment', label: 'Sentiment Analysis', icon: Brain, description: 'Analyze review sentiment' },
  { path: '/fake-detection', label: 'Fake Detection', icon: Shield, description: 'Detect suspicious reviews' },
];

const analysisItems = [
  { path: '/batch-analysis', label: 'Batch Analysis', icon: BarChart3, description: 'Process multiple reviews' },
  { path: '/model-comparison', label: 'Model Comparison', icon: GitCompare, description: 'Compare AI models' },
  { path: '/statistics', label: 'Statistics', icon: Activity, description: 'Detailed analytics' },
];

const ThemeToggle = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme?.colors?.border || '#e2e8f0'};
  background: ${props => props.theme?.colors?.backgroundSecondary || '#f8fafc'};
  color: ${props => props.theme?.colors?.text || '#1e293b'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme?.colors?.border || '#e2e8f0'};
  }
`;

const Sidebar = ({ isOpen, onToggle, apiStatus, theme, onToggleTheme }) => {
  const location = useLocation();

  const getStatusText = () => {
    switch (apiStatus) {
      case 'online': return 'Connected';
      case 'offline': return 'Disconnected';
      case 'loading': return 'Connecting...';
      default: return 'Unknown';
    }
  };

  return (
    <SidebarContainer
      isOpen={isOpen}
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <SidebarHeader>
        <SidebarTitle>
          <Cpu size={20} />
          AI Dashboard
        </SidebarTitle>
        <CloseButton onClick={onToggle}>
          <X size={18} />
        </CloseButton>
      </SidebarHeader>

      <SidebarSection>
        <SectionTitle theme={{ colors: { textLight: '#94a3b8' } }}>Main</SectionTitle>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <SidebarItem
              key={item.path}
              to={item.path}
              className={isActive ? 'active' : ''}
              theme={{ colors: { text: '#64748b', backgroundSecondary: '#f8fafc', primary: '#3b82f6' } }}
            >
              <Icon />
              <div>
                <div>{item.label}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{item.description}</div>
              </div>
              <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
            </SidebarItem>
          );
        })}
      </SidebarSection>

      <SidebarSection>
        <SectionTitle theme={{ colors: { textLight: '#94a3b8' } }}>Analysis Tools</SectionTitle>
        {analysisItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <SidebarItem
              key={item.path}
              to={item.path}
              className={isActive ? 'active' : ''}
              theme={{ colors: { text: '#64748b', backgroundSecondary: '#f8fafc', primary: '#3b82f6' } }}
            >
              <Icon />
              <div>
                <div>{item.label}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{item.description}</div>
              </div>
              <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
            </SidebarItem>
          );
        })}
      </SidebarSection>

      <SidebarFooter theme={{ colors: { border: '#e2e8f0' } }}>
        <ApiStatus theme={{ colors: { backgroundSecondary: '#f8fafc', textSecondary: '#64748b', success: '#10b981', error: '#ef4444', warning: '#f59e0b' } }}>
          <StatusRow>
            <StatusLabel>API Status</StatusLabel>
            <StatusValue status={apiStatus}>
              <StatusDot status={apiStatus} style={{ marginRight: '4px' }} />
              {getStatusText()}
            </StatusValue>
          </StatusRow>
          <StatusRow>
            <StatusLabel>Models</StatusLabel>
            <StatusValue status={apiStatus}>
              {apiStatus === 'online' ? '2 Ready' : 'Offline'}
            </StatusValue>
          </StatusRow>
        </ApiStatus>

        {onToggleTheme && (
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
            <ThemeToggle onClick={onToggleTheme} title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </ThemeToggle>
          </div>
        )}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;