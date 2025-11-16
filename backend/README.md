# AI Sentiment Analysis API Backend

FastAPI backend for Amazon Electronics Reviews sentiment analysis, fake review detection, and helpfulness analysis.

## 🚀 Features

- **Sentiment Analysis**: VADER (baseline) and RoBERTa (advanced transformer) models
- **Fake Review Detection**: Identifies suspicious review patterns
- **Helpfulness Analysis**: Predicts how helpful reviews will be to other users
- **Batch Processing**: Analyze multiple reviews efficiently
- **Real-time Processing**: Fast predictions for live applications
- **Auto Documentation**: Interactive API docs with Swagger UI

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application and endpoints
│   ├── models.py        # AI model management and services
│   └── schemas.py       # Pydantic request/response models
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
├── .env                # Environment variables (create this)
└── README.md           # This file
```

## 🛠️ Installation

### 1. Create Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Setup Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Running the API

### Development Mode

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at:
- **API Base URL**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 📚 API Endpoints

### Health & Info
- `GET /` - Welcome message
- `GET /health` - Health check and model status
- `GET /models` - Available model information

### Sentiment Analysis
- `POST /predict/sentiment` - Single review sentiment analysis
- `POST /predict/batch` - Batch sentiment analysis
- `POST /compare` - Compare all models on same text

### Advanced Analysis
- `POST /detect/fake` - Fake review detection
- `POST /analyze/helpfulness` - Helpfulness analysis
- `GET /statistics` - Dataset and performance statistics

## 🎯 Usage Examples

### Sentiment Analysis

```bash
curl -X POST "http://localhost:8000/predict/sentiment" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This product is absolutely amazing! I love everything about it.",
    "model": "roberta"
  }'
```

### Fake Review Detection

```bash
curl -X POST "http://localhost:8000/detect/fake" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "THIS IS THE BEST PRODUCT EVER!!!!!!! BUY NOW!!!!!!!",
    "rating": 5
  }'
```

### Batch Analysis

```bash
curl -X POST "http://localhost:8000/predict/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "texts": [
      "Great product, works perfectly!",
      "Terrible quality, broke immediately.",
      "It is okay, does what it says."
    ],
    "model": "vader"
  }'
```

## 🔧 Configuration

Key environment variables in `.env`:

```bash
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# CORS (React frontend)
CORS_ORIGINS=http://localhost:3000

# Model Configuration
ROBERTA_MODEL_NAME=roberta-base
MAX_TEXT_LENGTH=5000

# Device
DEVICE=auto  # auto, cpu, or cuda
```

## 📊 Model Performance

| Model | Accuracy | Speed | Best For |
|-------|----------|-------|----------|
| VADER | 46.5% | Very Fast | Quick prototyping |
| RoBERTa | ~87% | Medium | Production use |

## 🔒 Security

- CORS configured for React frontend
- Input validation and sanitization
- Request timeout protection
- Error handling and logging

## 📈 Performance

- **Single prediction**: ~50ms (VADER), ~200ms (RoBERTa)
- **Batch processing**: Optimized for multiple texts
- **Concurrent requests**: Worker processes support
- **Memory management**: Model caching and lazy loading

## 🐛 Troubleshooting

### Common Issues

1. **Model loading fails**
   - Check internet connection (downloads models on first run)
   - Verify sufficient disk space
   - Check system RAM requirements

2. **CORS errors**
   - Update `CORS_ORIGINS` in `.env`
   - Verify React app URL is correct

3. **Slow performance**
   - Use GPU if available (CUDA)
   - Reduce batch size
   - Use VADER for real-time needs

### Logging

Check console output for detailed error messages and model loading status.

## 🚀 Deployment

### Docker

```dockerfile
FROM python:3.9

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Platforms

- **Heroku**: Ready for deployment with Procfile
- **AWS**: Compatible with ECS and Lambda
- **Google Cloud**: Works with Cloud Run
- **Azure**: Supports App Service

## 🔗 Integration with React

```javascript
// Example React component
const analyzeSentiment = async (text, model = 'roberta') => {
  const response = await fetch('http://localhost:8000/predict/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model })
  });
  return response.json();
};
```

## 📝 API Development

The API follows REST principles:
- `GET` for retrieving data
- `POST` for creating/analyzing
- JSON request/response format
- HTTP status codes for errors
- Comprehensive error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## 📄 License

This project is part of the AI Sentiment Analysis system.