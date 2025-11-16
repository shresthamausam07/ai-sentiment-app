import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  GitCompare,
  Brain,
  Zap,
  TrendingUp
} from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const InputSection = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const ResultsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const ResultCard = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CompareButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModelComparison = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleCompare = async () => {
    if (!text.trim()) {
      alert('Please enter some text to compare');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(${process.env.REACT_APP_API_URL}/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(text.trim())
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        alert('Comparison failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to compare models. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sampleReviews = [
    "This product exceeded all my expectations! Highly recommended for anyone looking for quality.",
    "Terrible experience. Broke after just one day of use. Do not waste your money.",
    "It's okay. Does what it says it will do, but nothing exceptional. Good value for the price."
  ];

  return (
    <Container>
      <InputSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <GitCompare size={20} />
          Model Comparison
        </h2>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a product review to compare all models..."
          disabled={loading}
        />

        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            Sample Reviews:
          </h3>
          {sampleReviews.map((review, index) => (
            <button
              key={index}
              onClick={() => setText(review)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                marginBottom: 8,
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: '#f8fafc',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.background = '#3b82f610';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            >
              {review}
            </button>
          ))}
        </div>

        <CompareButton onClick={handleCompare} disabled={loading || !text.trim()}>
          {loading ? 'Comparing...' : 'Compare Models'}
        </CompareButton>
      </InputSection>

      {results && (
        <ResultsSection>
          <ResultCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Zap size={20} />
              VADER Results
            </h3>
            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8 }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Sentiment:</strong> {results.models.vader?.sentiment || 'N/A'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Confidence:</strong> {results.models.vader?.confidence ? `${(results.models.vader.confidence * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                <strong>Model:</strong> VADER (Rule-based)
              </div>
            </div>
          </ResultCard>

          <ResultCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Brain size={20} />
              RoBERTa Results
            </h3>
            <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8 }}>
              <div style={{ marginBottom: 8 }}>
                <strong>Sentiment:</strong> {results.models.roberta?.sentiment || 'N/A'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>Confidence:</strong> {results.models.roberta?.confidence ? `${(results.models.roberta.confidence * 100).toFixed(1)}%` : 'N/A'}
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                <strong>Model:</strong> RoBERTa (Transformer)
              </div>
            </div>
          </ResultCard>

          <ResultCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ gridColumn: '1 / -1' }}
          >
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <TrendingUp size={20} />
              Comparison Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 'bold', color: '#3b82f6', marginBottom: 4 }}>
                  {results.agreement ? '✓' : '✗'}
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Models Agree
                </div>
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                  {results.recommended?.toUpperCase() || 'VADER'}
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Recommended
                </div>
              </div>
              <div style={{ padding: 16, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 4 }}>
                  {Object.keys(results.models).length}
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Models Tested
                </div>
              </div>
            </div>
          </ResultCard>
        </ResultsSection>
      )}
    </Container>
  );
};

export default ModelComparison;