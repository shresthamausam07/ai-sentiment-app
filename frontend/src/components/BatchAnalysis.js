import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const UploadArea = styled(motion.div)`
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: ${props => props.theme.colors.backgroundSecondary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary}10;
  }
`;

const ResultList = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 24px;
`;

const ResultItem = styled(motion.div)`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 16px;
`;

const BatchAnalysis = () => {
  const [reviews, setReviews] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState([]);

  const handleAddReview = () => {
    setReviews([...reviews, '']);
  };

  const handleRemoveReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleReviewChange = (index, value) => {
    const newReviews = [...reviews];
    newReviews[index] = value;
    setReviews(newReviews);
  };

  const handleAnalyze = async () => {
    if (reviews.filter(r => r.trim()).length === 0) {
      alert('Please add at least one review to analyze');
      return;
    }

    setIsAnalyzing(true);
    setResults([]);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/predict/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          texts: reviews.filter(r => r.trim()),
          model: 'vader'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        alert('Analysis failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze reviews. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Container>
      <UploadArea
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleAddReview}
      >
        <Upload size={48} style={{ color: '#64748b', marginBottom: 16 }} />
        <h3>Click to Add Reviews</h3>
        <p style={{ color: '#64748b', margin: '8px 0' }}>
          Add multiple reviews for batch sentiment analysis
        </p>
      </UploadArea>

      {reviews.map((review, index) => (
        <ResultItem
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <FileText size={20} style={{ color: '#3b82f6' }} />
          <textarea
            value={review}
            onChange={(e) => handleReviewChange(index, e.target.value)}
            placeholder={`Review ${index + 1}`}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontFamily: 'inherit',
              fontSize: '14px',
              resize: 'vertical',
              minHeight: '60px'
            }}
          />
          <button
            onClick={() => handleRemoveReview(index)}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </ResultItem>
      ))}

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || reviews.length === 0}
        style={{
          background: isAnalyzing ? '#94a3b8' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px'
        }}
      >
        {isAnalyzing ? (
          <>
            <div className="loading-spinner" style={{ width: 20, height: 20 }} />
            Analyzing...
          </>
        ) : (
          <>
            <BarChart3 size={20} />
            Analyze Batch
          </>
        )}
      </button>

      {results.length > 0 && (
        <ResultList>
          <h3>Analysis Results</h3>
          {results.map((result, index) => (
            <ResultItem key={index}>
              {result.error ? (
                <>
                  <AlertCircle size={20} style={{ color: '#ef4444' }} />
                  <span style={{ color: '#ef4444' }}>{result.error}</span>
                </>
              ) : (
                <>
                  <CheckCircle size={20} style={{ color: '#10b981' }} />
                  <span>{result.sentiment}</span>
                  <span style={{ color: '#64748b', fontSize: '14px' }}>
                    {(result.confidence * 100).toFixed(1)}% confident
                  </span>
                </>
              )}
            </ResultItem>
          ))}
        </ResultList>
      )}
    </Container>
  );
};

export default BatchAnalysis;