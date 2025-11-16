# AI Sentiment Analysis Frontend

React frontend for the AI Sentiment Analysis API - a modern dashboard for analyzing Amazon product reviews with advanced AI models.

## 🚀 Features

- **Real-time Sentiment Analysis**: Choose between VADER (fast) and RoBERTa (accurate) models
- **Fake Review Detection**: Identify suspicious review patterns and red flags
- **Interactive Dashboard**: Live statistics, charts, and performance metrics
- **Model Comparison**: Side-by-side comparison of different AI models
- **Batch Analysis**: Process multiple reviews at once
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Real-time API Status**: Monitor backend connection and model availability

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template with loading screen
├── src/
│   ├── components/         # React components
│   │   ├── Dashboard.js    # Main dashboard with charts and stats
│   │   ├── SentimentAnalysis.js  # Single review analysis
│   │   ├── FakeReviewDetection.js # Fake review detection
│   │   ├── Navbar.js       # Navigation bar with theme toggle
│   │   ├── Sidebar.js      # Collapsible navigation sidebar
│   │   ├── BatchAnalysis.js  # Batch processing component
│   │   ├── ModelComparison.js # Model comparison interface
│   │   └── Statistics.js    # Detailed analytics page
│   ├── styles/
│   │   └── theme.js        # Light and dark theme configurations
│   ├── App.js              # Main app component with routing
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Installation

### Prerequisites
- Node.js 14+ and npm
- Running FastAPI backend (http://localhost:8000)

### Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🎯 Available Pages

### 1. **Dashboard** (`/`)
- Real-time statistics and metrics
- Sentiment distribution charts
- Model performance comparison
- API request timeline
- Recent activity feed

### 2. **Sentiment Analysis** (`/sentiment`)
- Single review sentiment analysis
- Choose between VADER and RoBERTa models
- Real-time confidence scores
- Probability distributions
- Sample reviews for testing

### 3. **Fake Review Detection** (`/fake-detection`)
- Suspicious pattern detection
- Risk level assessment
- Feature extraction and analysis
- Warning explanations
- Detection tips and guidelines

### 4. **Batch Analysis** (`/batch-analysis`)
- Process multiple reviews
- Export results
- Performance metrics
- Batch statistics

### 5. **Model Comparison** (`/model-comparison`)
- Side-by-side model results
- Performance metrics comparison
- Accuracy and F1 scores
- Confusion matrices

### 6. **Statistics** (`/statistics`)
- Detailed analytics
- Historical data
- Performance trends
- Model statistics

## 🎨 Features

### Interactive Components
- **Responsive Design**: Adapts to all screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Live API status and statistics
- **Smooth Animations**: Professional transitions and hover effects
- **Loading States**: User-friendly loading indicators

### Charts & Visualizations
- **Recharts Integration**: Beautiful, interactive charts
- **Real-time Data**: Live updates from API
- **Responsive Charts**: Adapt to container size
- **Custom Themes**: Consistent with app theme

### User Experience
- **Intuitive Navigation**: Easy-to-use sidebar and navbar
- **Sample Data**: Pre-loaded examples for testing
- **Error Handling**: Graceful error messages and recovery
- **Performance**: Optimized for speed and efficiency

## 🔧 Configuration

The app is configured to connect to the FastAPI backend at `http://localhost:8000`. If your backend is running elsewhere, update the API endpoints in the components.

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_APP_NAME=AI Sentiment Analysis
```

## 🎨 Theming

The app uses a comprehensive theming system with light and dark modes:

### Light Theme
- Clean, bright interface
- High contrast for readability
- Professional blue accent colors

### Dark Theme
- Easy on the eyes for extended use
- Optimized for low-light environments
- Consistent color scheme

## 📊 API Integration

The frontend integrates seamlessly with the FastAPI backend:

### Key Endpoints Used
- `GET /health` - API and model status
- `POST /predict/sentiment` - Sentiment analysis
- `POST /detect/fake` - Fake review detection
- `POST /predict/batch` - Batch analysis
- `POST /compare` - Model comparison
- `GET /statistics` - Performance metrics

### Error Handling
- Graceful API error handling
- User-friendly error messages
- Automatic retry for failed requests
- Fallback content when API is unavailable

## 🚀 Performance

### Optimizations
- **Code Splitting**: Components loaded on demand
- **Lazy Loading**: Charts and heavy components
- **Memoization**: Cached component renders
- **Debounced API Calls**: Prevent excessive requests
- **Optimized Bundle**: Tree-shaking and compression

### Bundle Size
- **Production Build**: Optimized and minified
- **Dependency Management**: Only necessary libraries
- **Asset Optimization**: Compressed images and icons

## 🔒 Security

- **CORS Configuration**: Properly configured for API access
- **Input Validation**: Client-side validation for user inputs
- **Error Sanitization**: Safe error message display
- **API Authentication**: Ready for token-based auth (if needed)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptive Features
- Collapsible sidebar on mobile
- Touch-friendly buttons and inputs
- Optimized charts for small screens
- Readable typography at all sizes

## 🎯 Usage Examples

### Basic Sentiment Analysis
1. Navigate to `/sentiment`
2. Enter a product review
3. Choose model (VADER or RoBERTa)
4. Click "Analyze Sentiment"
5. View results with confidence scores

### Fake Review Detection
1. Go to `/fake-detection`
2. Enter review text and rating
3. Click "Detect Fake Review"
4. Review risk assessment and warnings
5. Check extracted features

### Batch Processing
1. Visit `/batch-analysis`
2. Upload or paste multiple reviews
3. Select analysis model
4. Process and export results

## 🛠️ Development

### Scripts
```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject (one-way operation)
npm run eject
```

### File Organization
- **Components**: Modular React components
- **Styles**: Theme configuration and global styles
- **Assets**: Images, icons, and static files
- **Utils**: Helper functions and utilities

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
- **Netlify**: Drag and drop build folder
- **Vercel**: Connect Git repository
- **GitHub Pages**: Use `gh-pages` branch
- **AWS S3**: Static website hosting

### Environment Configuration
- Update `REACT_APP_API_URL` for production
- Configure CORS on backend
- Set up SSL/HTTPS for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is part of the AI Sentiment Analysis system.

## 🔗 Related Projects

- **Backend**: FastAPI Server with AI models
- **Documentation**: API documentation and guides
- **Dataset**: Amazon Electronics Reviews dataset

## 📞 Support

For issues and questions:
1. Check the [API documentation](http://localhost:8000/docs)
2. Review the [backend README](../backend/README.md)
3. Create an issue in the repository

---

Built with ❤️ using React, Styled Components, and Recharts