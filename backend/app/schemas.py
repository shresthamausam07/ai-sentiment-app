"""
Pydantic schemas for API request/response models
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

# Enums
class SentimentEnum(str, Enum):
    POSITIVE = "Positive"
    NEGATIVE = "Negative"
    NEUTRAL = "Neutral"

class ModelEnum(str, Enum):
    VADER = "vader"
    ROBERTA = "roberta"

class RiskLevelEnum(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

# Request Models
class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Review text to analyze")
    model: ModelEnum = Field(ModelEnum.ROBERTA, description="Model to use for sentiment analysis")

class BatchAnalysisRequest(BaseModel):
    texts: List[str] = Field(..., min_items=1, max_items=100, description="List of review texts to analyze")
    model: ModelEnum = Field(ModelEnum.ROBERTA, description="Model to use for batch analysis")

class FakeDetectionRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Review text to analyze")
    summary: Optional[str] = Field(None, max_length=500, description="Review summary (if available)")
    rating: int = Field(5, ge=1, le=5, description="Product rating (1-5)")

class HelpfulnessRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Review text to analyze")
    helpful_votes: int = Field(0, ge=0, description="Number of helpful votes")
    total_votes: int = Field(0, ge=0, description="Total number of votes")

# Response Models
class SentimentDetails(BaseModel):
    """Model-specific sentiment details"""
    confidence: float = Field(..., ge=0, le=1, description="Confidence score")
    probabilities: Optional[Dict[str, float]] = Field(None, description="Probability distribution")
    processing_time: float = Field(..., description="Processing time in seconds")

class SentimentResponse(BaseModel):
    """Sentiment analysis response"""
    sentiment: SentimentEnum = Field(..., description="Predicted sentiment")
    confidence: float = Field(..., ge=0, le=1, description="Overall confidence")
    model: ModelEnum = Field(..., description="Model used for analysis")
    details: SentimentDetails = Field(..., description="Model-specific details")
    text_length: int = Field(..., description="Length of analyzed text")
    processing_time: float = Field(..., description="Total processing time")

class FakeReviewFeatures(BaseModel):
    """Features used for fake review detection"""
    text_length: int
    word_count: int
    excessive_punctuation: bool
    all_caps_ratio: float
    has_url: bool
    has_email: bool
    has_phone: bool
    very_short: bool
    single_sentence: bool
    repeated_phrases: int
    extreme_rating: bool

class FakeDetectionResponse(BaseModel):
    """Fake review detection response"""
    is_suspicious: bool = Field(..., description="Whether review is flagged as suspicious")
    risk_level: RiskLevelEnum = Field(..., description="Risk level classification")
    suspicion_score: int = Field(..., ge=0, le=7, description="Suspicion score (0-7)")
    warnings: List[str] = Field(default_factory=list, description="Specific warning flags")
    features: FakeReviewFeatures = Field(..., description="Extracted features")
    processing_time: float = Field(..., description="Processing time in seconds")

class HelpfulnessFeatures(BaseModel):
    """Features used for helpfulness analysis"""
    text_length: int
    word_count: int
    sentence_count: int
    exclamation_count: int
    question_count: int
    uppercase_ratio: float
    textblob_polarity: float
    textblob_subjectivity: float

class HelpfulnessResponse(BaseModel):
    """Helpfulness analysis response"""
    predicted_helpfulness_ratio: float = Field(..., ge=0, le=1, description="Predicted helpfulness ratio")
    helpfulness_category: str = Field(..., description="Helpfulness category")
    quality_score: float = Field(..., ge=0, le=1, description="Overall quality score")
    features: HelpfulnessFeatures = Field(..., description="Extracted features")
    recommendations: List[str] = Field(default_factory=list, description="Improvement recommendations")
    processing_time: float = Field(..., description="Processing time in seconds")

class ModelStatus(BaseModel):
    """Model loading status"""
    loaded: bool
    loading_time: Optional[float] = None
    error: Optional[str] = None

class ModelInfoResponse(BaseModel):
    """Information about available models"""
    models: Dict[str, Dict[str, Any]] = Field(..., description="Model information")
    total_models: int = Field(..., description="Total number of models")
    recommended_model: str = Field(..., description="Recommended model for production")

class HealthResponse(BaseModel):
    """Health check response"""
    status: str = Field(..., description="API health status")
    models: Dict[str, ModelStatus] = Field(..., description="Model status")
    uptime: str = Field(..., description="Server uptime information")

class ModelComparison(BaseModel):
    """Model comparison response"""
    text: str = Field(..., description="Analyzed text")
    models: Dict[str, SentimentResponse] = Field(..., description="Results from each model")
    agreement: bool = Field(..., description="Whether models agree")
    recommended: ModelEnum = Field(..., description="Recommended model for this text")

# Statistics Response
class DatasetStatistics(BaseModel):
    """Dataset statistics"""
    total_reviews: int
    sentiment_distribution: Dict[str, int]
    average_text_length: float
    helpful_reviews_percentage: float
    suspicious_reviews_percentage: float

class ModelPerformance(BaseModel):
    """Model performance metrics"""
    accuracy: float
    precision: Dict[str, float]
    recall: Dict[str, float]
    f1_score: Dict[str, float]
    confusion_matrix: List[List[int]]

class StatisticsResponse(BaseModel):
    """Comprehensive statistics response"""
    dataset: DatasetStatistics
    model_performance: Dict[str, ModelPerformance]
    last_updated: str