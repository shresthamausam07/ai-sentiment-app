import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Activity,
  TrendingUp,
  Database,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
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
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const ChartCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(${process.env.REACT_APP_API_URL}/statistics');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <div className="loading-spinner" />
        </div>
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Database size={48} style={{ color: '#64748b', marginBottom: 16 }} />
          <h2>No statistics available</h2>
          <p style={{ color: '#64748b' }}>
            Unable to load statistics from the API.
          </p>
        </div>
      </Container>
    );
  }

  // Prepare chart data
  const sentimentData = stats.dataset.sentiment_distribution
    ? Object.entries(stats.dataset.sentiment_distribution).map(([name, value]) => ({
        name,
        value,
        color: name === 'Positive' ? '#10b981' : name === 'Negative' ? '#ef4444' : '#f59e0b'
      }))
    : [];

  const performanceData = stats.model_performance
    ? Object.entries(stats.model_performance).map(([model, data]) => ({
        name: model.toUpperCase(),
        accuracy: data.accuracy * 100,
        precision: data.precision.Positive * 100,
        recall: data.recall.Positive * 100
      }))
    : [];

  const accuracyData = performanceData.map(item => ({
    model: item.name,
    accuracy: item.accuracy
  }));

  const timelineData = [
    { month: 'Jan', requests: 1200, accuracy: 85 },
    { month: 'Feb', requests: 1800, accuracy: 87 },
    { month: 'Mar', requests: 2400, accuracy: 89 },
    { month: 'Apr', requests: 2100, accuracy: 88 },
    { month: 'May', requests: 2800, accuracy: 91 },
    { month: 'Jun', requests: 3200, accuracy: 93 }
  ];

  return (
    <Container>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Statistics Dashboard
      </h1>
      <p style={{ color: '#64748b', marginBottom: 24 }}>
        Detailed analytics and performance metrics
      </p>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatValue>{stats.dataset.total_reviews.toLocaleString()}</StatValue>
          <StatLabel>Total Reviews</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatValue>{stats.dataset.average_text_length.toFixed(0)}</StatValue>
          <StatLabel>Avg. Text Length</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatValue>{(stats.dataset.helpful_reviews_percentage * 100).toFixed(1)}%</StatValue>
          <StatLabel>Helpful Reviews</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatValue>{(stats.dataset.suspicious_reviews_percentage * 100).toFixed(1)}%</StatValue>
          <StatLabel>Suspicious Reviews</StatLabel>
        </StatCard>
      </StatsGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ChartCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ChartTitle>
            <PieChartIcon size={18} />
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
            <BarChart3 size={18} />
            Model Accuracy Comparison
          </ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ gridColumn: '1 / -1' }}
      >
        <ChartTitle>
          <Activity size={18} />
          Performance Timeline
        </ChartTitle>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="requests" fill="#3b82f6" name="Requests" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="accuracy"
              stroke="#10b981"
              strokeWidth={2}
              name="Accuracy %"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ gridColumn: '1 / -1' }}
      >
        <ChartTitle>
          <TrendingUp size={18} />
          Detailed Model Performance
        </ChartTitle>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="precision" fill="#8b5cf6" name="Precision %" />
            <Bar dataKey="recall" fill="#10b981" name="Recall %" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </Container>
  );
};

export default Statistics;