"""
AI Sentiment Analysis API
FastAPI backend for Amazon Electronics Reviews sentiment analysis, fake review detection, and helpfulness analysis
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv

# Import our services
from app.models import ModelManager
from app.schemas import (
    SentimentRequest,
    SentimentResponse,
    BatchAnalysisRequest,
    FakeDetectionRequest,
    FakeDetectionResponse,
    HelpfulnessRequest,
    HelpfulnessResponse,
    ModelInfoResponse,
    HealthResponse
)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Sentiment Analysis API",
    description="Advanced sentiment analysis API for Amazon Electronics Reviews",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for production deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model manager (lazy loading)
model_manager = ModelManager()

@app.on_event("startup")
async def startup_event():
    """Initialize models on startup"""
    try:
        await model_manager.initialize()
        print("🚀 All models loaded successfully!")
    except Exception as e:
        print(f"❌ Error initializing models: {e}")

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "AI Sentiment Analysis API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Check API health and model status"""
    try:
        model_status = await model_manager.get_model_status()
        return HealthResponse(
            status="healthy",
            models=model_status,
            uptime="running"
        )
    except Exception as e:
        return HealthResponse(
            status="unhealthy",
            models={},
            uptime=f"error: {str(e)}"
        )

@app.get("/models", response_model=ModelInfoResponse, tags=["Models"])
async def get_model_info():
    """Get information about available models"""
    return await model_manager.get_model_info()

@app.post("/predict/sentiment", response_model=SentimentResponse, tags=["Sentiment Analysis"])
async def predict_sentiment(request: SentimentRequest):
    """
    Predict sentiment for a single review

    Available models:
    - vader: Fast rule-based sentiment analysis
    - roberta: Advanced transformer model (recommended)
    """
    try:
        if request.model not in ["vader", "roberta"]:
            raise HTTPException(
                status_code=400,
                detail="Model must be 'vader' or 'roberta'"
            )

        result = await model_manager.predict_sentiment(
            text=request.text,
            model=request.model
        )

        return SentimentResponse(**result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch", tags=["Sentiment Analysis"])
async def batch_sentiment_analysis(request: BatchAnalysisRequest):
    """
    Analyze multiple reviews in batch

    Best for processing multiple reviews efficiently
    """
    try:
        if request.model not in ["vader", "roberta"]:
            raise HTTPException(
                status_code=400,
                detail="Model must be 'vader' or 'roberta'"
            )

        results = await model_manager.batch_sentiment_analysis(
            texts=request.texts,
            model=request.model
        )

        return {
            "model": request.model,
            "total_analyzed": len(request.texts),
            "results": results
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/detect/fake", response_model=FakeDetectionResponse, tags=["Fake Review Detection"])
async def detect_fake_review(request: FakeDetectionRequest):
    """
    Detect if a review might be fake or suspicious

    Returns risk level and suspicious patterns
    """
    try:
        result = await model_manager.detect_fake_review(
            text=request.text,
            summary=request.summary,
            rating=request.rating
        )

        return FakeDetectionResponse(**result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/helpfulness", response_model=HelpfulnessResponse, tags=["Helpfulness Analysis"])
async def analyze_helpfulness(request: HelpfulnessRequest):
    """
    Analyze review helpfulness and quality

    Predicts how helpful a review might be to other users
    """
    try:
        result = await model_manager.analyze_helpfulness(
            text=request.text,
            helpful_votes=request.helpful_votes,
            total_votes=request.total_votes
        )

        return HelpfulnessResponse(**result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/statistics", tags=["Statistics"])
async def get_statistics():
    """Get dataset statistics and model performance metrics"""
    try:
        stats = await model_manager.get_statistics()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/compare", tags=["Comparison"])
async def compare_models(text: str):
    """
    Compare all models on the same text

    Shows predictions from VADER and RoBERTa side by side
    """
    try:
        comparison = await model_manager.compare_models(text)
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )