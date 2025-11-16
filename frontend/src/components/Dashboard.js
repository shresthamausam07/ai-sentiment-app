import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Brain,
  Shield,
  TrendingUp,
  Activity,
  Zap,
  Users,
  MessageSquare,
  CheckCircle,
  BarChart3,
  ArrowUp,
  GitCompare
} from 'lucide-react';

const DashboardContainer = styled.div`
  display: grid;
  gap: 24px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const DashboardTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const DashboardSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 4px 0 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color}20;
  color: ${props => props.color};
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 500;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.positive ? props.theme.colors.success : props.theme.colors.error};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const ChartCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: ${props => props.theme.colors.backgroundSecondary};

  &:hover {
    background: ${props => props.theme.colors.border};
  }
`;

const ActivityIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2px;
`;

const ActivityDescription = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textLight};
`;

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [statsResponse, healthResponse] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/statistics`),
        fetch(`${process.env.REACT_APP_API_URL}/health`)
      ]);

      if (statsResponse.ok && healthResponse.ok) {
        const statsData = await statsResponse.json();
        const healthData = await healthResponse.json();
        setStats({ ...statsData, health: healthData });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic sentiment data from API
  const sentimentData = stats?.dataset?.sentiment_distribution ?
    Object.entries(stats.dataset.sentiment_distribution).map(([sentiment, count]) => ({
      name: sentiment,
      value: count,
      color: sentiment === 'Positive' ? '#10b981' :
             sentiment === 'Negative' ? '#ef4444' : '#f59e0b'
    })) : [
      { name: 'Positive', value: 0, color: '#10b981' },
      { name: 'Negative', value: 0, color: '#ef4444' },
      { name: 'Neutral', value: 0, color: '#f59e0b' }
    ];

  // Dynamic model performance data from API
  const performanceData = stats?.model_performance ?
    Object.entries(stats.model_performance).map(([model, data]) => ({
      name: model.toUpperCase(),
      accuracy: (data.accuracy * 100).toFixed(1),
      f1: ((data.f1_score?.Negative || 0) * 100).toFixed(1)
    })) : [
      { name: 'VADER', accuracy: 0, f1: 0 },
      { name: 'ROBERTA', accuracy: 0, f1: 0 }
    ];

  const timelineData = [
    { time: '00:00', requests: 45 },
    { time: '04:00', requests: 23 },
    { time: '08:00', requests: 78 },
    { time: '12:00', requests: 120 },
    { time: '16:00', requests: 95 },
    { time: '20:00', requests: 67 }
  ];

  const recentActivity = [
    {
      icon: Brain,
      color: '#3b82f6',
      title: 'RoBERTa Model Updated',
      description: 'Model performance improved by 40%',
      time: '2 hours ago'
    },
    {
      icon: Shield,
      color: '#8b5cf6',
      title: 'Fake Detection Enhanced',
      description: 'New detection rules implemented',
      time: '5 hours ago'
    },
    {
      icon: TrendingUp,
      color: '#10b981',
      title: 'Accuracy Milestone',
      description: 'Reached 87% overall accuracy',
      time: '1 day ago'
    },
    {
      icon: Users,
      color: '#f59e0b',
      title: 'User Feedback',
      description: 'Collected 500+ user ratings',
      time: '2 days ago'
    }
  ];

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div className="loading-spinner" />
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardHeader>
        <div>
          <DashboardTitle>AI Sentiment Dashboard</DashboardTitle>
          <DashboardSubtitle>Real-time sentiment analysis and review insights</DashboardSubtitle>
        </div>
      </DashboardHeader>

      <StatsGrid>
        <StatCard
          color="#3b82f6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatHeader>
            <div>
              <StatValue>{stats?.dataset?.total_reviews?.toLocaleString() || 'Loading...'}</StatValue>
              <StatLabel>Total Reviews Analyzed</StatLabel>
            </div>
            <StatIcon color="#3b82f6">
              <MessageSquare size={24} />
            </StatIcon>
          </StatHeader>
          <StatChange positive>
            <CheckCircle size={14} />
            Total dataset
          </StatChange>
        </StatCard>

        <StatCard
          color="#10b981"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatHeader>
            <div>
              <StatValue>{stats?.model_performance?.roberta?.accuracy ? `${(stats.model_performance.roberta.accuracy * 100).toFixed(1)}%` : 'Loading...'}</StatValue>
              <StatLabel>Model Accuracy</StatLabel>
            </div>
            <StatIcon color="#10b981">
              <TrendingUp size={24} />
            </StatIcon>
          </StatHeader>
          <StatChange positive>
            <CheckCircle size={14} />
            RoBERTa model
          </StatChange>
        </StatCard>

        <StatCard
          color="#8b5cf6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatHeader>
            <div>
              <StatValue>{stats?.dataset?.helpful_reviews_percentage ? `${stats.dataset.helpful_reviews_percentage.toFixed(1)}%` : 'Loading...'}</StatValue>
              <StatLabel>Helpful Reviews</StatLabel>
            </div>
            <StatIcon color="#8b5cf6">
              <Activity size={24} />
            </StatIcon>
          </StatHeader>
          <StatChange positive>
            <CheckCircle size={14} />
            User-rated reviews
          </StatChange>
        </StatCard>

        <StatCard
          color="#f59e0b"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatHeader>
            <div>
              <StatValue>{stats?.dataset?.suspicious_reviews_percentage ? `${stats.dataset.suspicious_reviews_percentage.toFixed(1)}%` : 'Loading...'}</StatValue>
              <StatLabel>Suspicious Reviews</StatLabel>
            </div>
            <StatIcon color="#f59e0b">
              <Zap size={24} />
            </StatIcon>
          </StatHeader>
          <StatChange positive>
            <CheckCircle size={14} />
            Flagged content
          </StatChange>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChartTitle>
            <BarChart3 size={18} />
            Sentiment Distribution
          </ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ChartTitle>
            <GitCompare size={18} />
            Model Performance Comparison
          </ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
              <Bar dataKey="f1" fill="#10b981" name="F1-Score %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>

      <ChartsGrid>
        <ChartCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ChartTitle>
            <Activity size={18} />
            API Request Timeline
          </ChartTitle>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ActivityCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ChartTitle>
            <Activity size={18} />
            Recent Activity
          </ChartTitle>
          <ActivityList>
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <ActivityItem key={index}>
                  <ActivityIcon color={activity.color}>
                    <Icon size={16} />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityTitle>{activity.title}</ActivityTitle>
                    <ActivityDescription>{activity.description}</ActivityDescription>
                  </ActivityContent>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityItem>
              );
            })}
          </ActivityList>
        </ActivityCard>
      </ChartsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;