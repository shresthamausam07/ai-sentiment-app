import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Zap,
  CheckCircle,
  Loader2,
  BarChart3,
  Target
} from 'lucide-react';

const SentimentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const AnalysisSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`;

const InputSection = styled(Card)`
  grid-column: 1;
`;

const ResultsSection = styled(Card)`
  grid-column: 2;

  @media (max-width: 968px) {
    grid-column: 1;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModelSelector = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
`;

const ModelOption = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.selected ? props.theme.colors.primary + '10' : props.theme.colors.backgroundSecondary};
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary + '10'};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const AnalyzeButton = styled.button`
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

const ResultCard = styled.div`
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ResultSentiment = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SentimentBadge = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => props.sentiment === 'Positive' && `
    background: ${props.theme.colors.success}20;
    color: ${props.theme.colors.success};
  `}

  ${props => props.sentiment === 'Negative' && `
    background: ${props.theme.colors.error}20;
    color: ${props.theme.colors.error};
  `}

  ${props => props.sentiment === 'Neutral' && `
    background: ${props.theme.colors.warning}20;
    color: ${props.theme.colors.warning};
  `}
`;

const ConfidenceScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}dd);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

const ProbabilityBars = styled.div`
  display: grid;
  gap: 12px;
`;

const ProbabilityBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProbabilityLabel = styled.div`
  min-width: 80px;
  font-weight: 500;
  font-size: 14px;
`;

const ProbabilityValue = styled.div`
  min-width: 50px;
  text-align: right;
  font-weight: 600;
  font-size: 14px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${props => props.theme.colors.textSecondary};

  svg {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const SampleReviews = styled.div`
  margin-top: 24px;
`;

const SampleTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 12px;
`;

const SampleList = styled.div`
  display: grid;
  gap: 8px;
`;

const SampleItem = styled.button`
  text-align: left;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
  }
`;

const sampleReviews = [
  {
    text: "This product is absolutely amazing! I love everything about it. Highly recommended!",
    label: "Positive Example"
  },
  {
    text: "Terrible quality. Broke after one day. Do not waste your money.",
    label: "Negative Example"
  },
  {
    text: "It's okay, works as expected but nothing special. Good value for the price.",
    label: "Neutral Example"
  }
];

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState('roberta');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/predict/sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          model: selectedModel
        })
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (review) => {
    setText(review.text);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return '#10b981';
      case 'Negative': return '#ef4444';
      case 'Neutral': return '#f59e0b';
      default: return '#64748b';
    }
  };

  return (
    <SentimentContainer>
      <AnalysisSection>
        <InputSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle>
            <MessageSquare size={20} />
            Review Analysis
          </SectionTitle>

          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a product review to analyze its sentiment..."
            disabled={loading}
          />

          <ModelSelector>
            <ModelOption
              selected={selectedModel === 'vader'}
              onClick={() => setSelectedModel('vader')}
            >
              <Zap size={20} />
              VADER (Fast)
            </ModelOption>
            <ModelOption
              selected={selectedModel === 'roberta'}
              onClick={() => setSelectedModel('roberta')}
            >
              <Brain size={20} />
              RoBERTa (Advanced)
            </ModelOption>
          </ModelSelector>

          <AnalyzeButton onClick={handleAnalyze} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target size={20} />
                Analyze Sentiment
              </>
            )}
          </AnalyzeButton>

          <SampleReviews>
            <SampleTitle>Sample Reviews</SampleTitle>
            <SampleList>
              {sampleReviews.map((review, index) => (
                <SampleItem
                  key={index}
                  onClick={() => handleSampleClick(review)}
                >
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>
                    {review.label}
                  </div>
                  <div style={{ opacity: 0.8, fontSize: 13 }}>
                    {review.text}
                  </div>
                </SampleItem>
              ))}
            </SampleList>
          </SampleReviews>
        </InputSection>

        <ResultsSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>
            <BarChart3 size={20} />
            Analysis Results
          </SectionTitle>

          {loading ? (
            <LoadingState>
              <Loader2 size={48} />
              <div>Analyzing sentiment...</div>
            </LoadingState>
          ) : result ? (
            <ResultCard>
              <ResultHeader>
                <ResultSentiment>
                  <SentimentBadge sentiment={result.sentiment}>
                    {result.sentiment}
                  </SentimentBadge>
                </ResultSentiment>
                <ConfidenceScore>
                  <CheckCircle size={16} />
                  {Math.round(result.confidence * 100)}% confidence
                </ConfidenceScore>
              </ResultHeader>

              <ProgressBar>
                <ProgressFill
                  color={getSentimentColor(result.sentiment)}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </ProgressBar>

              {result.details.probabilities && (
                <ProbabilityBars>
                  {Object.entries(result.details.probabilities).map(([sentiment, prob]) => (
                    <ProbabilityBar key={sentiment}>
                      <ProbabilityLabel>{sentiment}</ProbabilityLabel>
                      <ProgressBar style={{ flex: 1, margin: 0 }}>
                        <ProgressFill
                          color={getSentimentColor(sentiment)}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </ProgressBar>
                      <ProbabilityValue>{Math.round(prob * 100)}%</ProbabilityValue>
                    </ProbabilityBar>
                  ))}
                </ProbabilityBars>
              )}

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid #e2e8f0` }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                  Model: {result.model.toUpperCase()}
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>
                  Text Length: {result.text_length} characters
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Processing Time: {result.processing_time.toFixed(3)}s
                </div>
              </div>
            </ResultCard>
          ) : (
            <EmptyState>
              <Brain size={48} />
              <div>No analysis yet</div>
              <div style={{ fontSize: 14 }}>
                Enter a review and click "Analyze Sentiment" to get started
              </div>
            </EmptyState>
          )}
        </ResultsSection>
      </AnalysisSection>
    </SentimentContainer>
  );
};

export default SentimentAnalysis;