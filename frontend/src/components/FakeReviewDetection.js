import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Info,
  Star,
  Loader2
} from 'lucide-react';

const DetectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const DetectionSection = styled.div`
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
  min-height: 120px;
  padding: 16px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s ease;
  background: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const RatingSelector = styled.div`
  margin-bottom: 20px;
`;

const RatingLabel = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 8px;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 8px;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${props => props.filled ? '#f59e0b' : props.theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    color: #f59e0b;
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
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

const RiskBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => props.risk === 'High' && `
    background: ${props.theme.colors.error}20;
    color: ${props.theme.colors.error};
  `}

  ${props => props.risk === 'Medium' && `
    background: ${props.theme.colors.warning}20;
    color: ${props.theme.colors.warning};
  `}

  ${props => props.risk === 'Low' && `
    background: ${props.theme.colors.success}20;
    color: ${props.theme.colors.success};
  `}
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

const SuspicionScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ScoreBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${props => props.theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  margin: 16px 0;
`;

const ScoreFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}dd);
  border-radius: 6px;
  transition: width 0.5s ease;
`;

const WarningsList = styled.div`
  display: grid;
  gap: 8px;
`;

const WarningItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.theme.colors.warning}10;
  border: 1px solid ${props => props.theme.colors.warning}30;
  border-radius: 6px;
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 6px;
  font-size: 13px;
`;

const FeatureLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;

const FeatureValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
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

const TipsSection = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: ${props => props.theme.colors.info}10;
  border: 1px solid ${props => props.theme.colors.info}30;
  border-radius: 8px;
`;

const TipsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${props => props.theme.colors.info};
  margin-bottom: 8px;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;

  li {
    margin-bottom: 4px;
  }
`;

const getRiskColor = (risk) => {
  switch (risk) {
    case 'High': return '#ef4444';
    case 'Medium': return '#f59e0b';
    case 'Low': return '#10b981';
    default: return '#64748b';
  }
};

const getScoreColor = (score) => {
  if (score >= 4) return '#ef4444';
  if (score >= 2) return '#f59e0b';
  return '#10b981';
};

const FakeReviewDetection = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(${process.env.REACT_APP_API_URL}/detect/fake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          rating: rating
        })
      });

      if (!response.ok) {
        throw new Error('Detection failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to detect fake review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const sampleReviews = [
    {
      text: "THIS IS THE BEST PRODUCT EVER!!!!!!! BUY NOW!!!!!!!!!! AMAZING!!!!!!!!",
      rating: 5,
      label: "Suspicious Example"
    },
    {
      text: "Terrible quality. Broke after one day. Do not waste your money. Worst purchase ever!!!",
      rating: 1,
      label: "Negative Suspicious"
    },
    {
      text: "Good product with decent quality. Fast shipping and nice packaging. Works as expected.",
      rating: 4,
      label: "Normal Review"
    }
  ];

  return (
    <DetectionContainer>
      <DetectionSection>
        <InputSection
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle>
            <Shield size={20} />
            Fake Review Detection
          </SectionTitle>

          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a review to check if it might be fake or suspicious..."
            disabled={loading}
          />

          <RatingSelector>
            <RatingLabel>Product Rating:</RatingLabel>
            <RatingStars>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  filled={star <= rating}
                  onClick={() => handleRatingClick(star)}
                >
                  <Star fill={star <= rating ? 'currentColor' : 'none'} />
                </StarButton>
              ))}
            </RatingStars>
          </RatingSelector>

          <AnalyzeButton onClick={handleDetect} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Detecting...
              </>
            ) : (
              <>
                <Eye size={20} />
                Detect Fake Review
              </>
            )}
          </AnalyzeButton>

          <TipsSection>
            <TipsTitle>
              <Info size={16} />
              Detection Tips
            </TipsTitle>
            <TipsList>
              <li>Extremely short reviews with 5-star ratings are often suspicious</li>
              <li>Excessive punctuation and capitalization can indicate fake reviews</li>
              <li>Contact information or URLs in reviews are red flags</li>
              <li>Repetitive phrases or generic language may be suspicious</li>
            </TipsList>
          </TipsSection>
        </InputSection>

        <ResultsSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>
            <AlertTriangle size={20} />
            Detection Results
          </SectionTitle>

          {loading ? (
            <LoadingState>
              <Loader2 size={48} />
              <div>Analyzing review...</div>
            </LoadingState>
          ) : result ? (
            <ResultCard>
              <ResultHeader>
                <RiskBadge risk={result.risk_level}>
                  {result.is_suspicious ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                  {result.risk_level} Risk
                </RiskBadge>
                <SuspicionScore>
                  Score: {result.suspicion_score}/7
                </SuspicionScore>
              </ResultHeader>

              <ScoreBar>
                <ScoreFill
                  color={getRiskColor(result.risk_level)}
                  style={{ width: `${(result.suspicion_score / 7) * 100}%` }}
                />
              </ScoreBar>

              {result.warnings && result.warnings.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: '#f59e0b' }}>
                    Warning Signs:
                  </div>
                  <WarningsList>
                    {result.warnings.map((warning, index) => (
                      <WarningItem key={index}>
                        <AlertTriangle size={14} />
                        {warning}
                      </WarningItem>
                    ))}
                  </WarningsList>
                </div>
              )}

              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
                Extracted Features:
              </div>
              <FeaturesGrid>
                <FeatureItem>
                  <FeatureLabel>Text Length:</FeatureLabel>
                  <FeatureValue>{result.features.text_length} chars</FeatureValue>
                </FeatureItem>
                <FeatureItem>
                  <FeatureLabel>Word Count:</FeatureLabel>
                  <FeatureValue>{result.features.word_count} words</FeatureValue>
                </FeatureItem>
                <FeatureItem>
                  <FeatureLabel>All Caps:</FeatureLabel>
                  <FeatureValue>{Math.round(result.features.all_caps_ratio * 100)}%</FeatureValue>
                </FeatureItem>
                <FeatureItem>
                  <FeatureLabel>Excessive Punctuation:</FeatureLabel>
                  <FeatureValue>{result.features.excessive_punctuation ? 'Yes' : 'No'}</FeatureValue>
                </FeatureItem>
                <FeatureItem>
                  <FeatureLabel>Contains URL:</FeatureLabel>
                  <FeatureValue>{result.features.has_url ? 'Yes' : 'No'}</FeatureValue>
                </FeatureItem>
                <FeatureItem>
                  <FeatureLabel>Very Short:</FeatureLabel>
                  <FeatureValue>{result.features.very_short ? 'Yes' : 'No'}</FeatureValue>
                </FeatureItem>
              </FeaturesGrid>

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid #e2e8f0` }}>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Processing Time: {result.processing_time.toFixed(3)}s
                </div>
              </div>
            </ResultCard>
          ) : (
            <EmptyState>
              <EyeOff size={48} />
              <div>No detection yet</div>
              <div style={{ fontSize: 14 }}>
                Enter a review and click "Detect Fake Review" to get started
              </div>
            </EmptyState>
          )}
        </ResultsSection>
      </DetectionSection>
    </DetectionContainer>
  );
};

export default FakeReviewDetection;