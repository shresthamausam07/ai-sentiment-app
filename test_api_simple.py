import requests
import json

# Test API endpoints
base_url = "http://localhost:8000"

def test_api():
    print("🧪 Testing AI Sentiment Analysis API")
    print("=" * 50)

    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            data = response.json()
            print(f"   API Status: {data['status']}")
            print(f"   Models loaded: {list(data['models'].keys())}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")

    # Test sentiment analysis
    try:
        sentiment_data = {
            "text": "This product is absolutely amazing! I love everything about it.",
            "model": "vader"
        }

        response = requests.post(
            f"{base_url}/predict/sentiment",
            json=sentiment_data,
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            print("✅ Sentiment analysis passed")
            data = response.json()
            print(f"   Sentiment: {data['sentiment']}")
            print(f"   Confidence: {data['confidence']:.3f}")
            print(f"   Model: {data['model']}")
        else:
            print(f"❌ Sentiment analysis failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Sentiment analysis error: {e}")

    # Test fake review detection
    try:
        fake_data = {
            "text": "THIS IS THE BEST PRODUCT EVER!!!!!!! BUY NOW!!!!!!!",
            "rating": 5
        }

        response = requests.post(
            f"{base_url}/detect/fake",
            json=fake_data,
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            print("✅ Fake review detection passed")
            data = response.json()
            print(f"   Risk Level: {data['risk_level']}")
            print(f"   Suspicious: {data['is_suspicious']}")
            print(f"   Score: {data['suspicion_score']}/7")
        else:
            print(f"❌ Fake detection failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Fake detection error: {e}")

if __name__ == "__main__":
    test_api()