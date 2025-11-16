#!/usr/bin/env python3
"""
Test script for AI Sentiment Analysis API
Tests all endpoints with sample data
"""

import requests
import json
import time
from typing import Dict, Any

# API Configuration
BASE_URL = "http://localhost:8000"

def test_endpoint(endpoint: str, method: str = "GET", data: Dict[str, Any] = None) -> Dict[str, Any]:
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"

    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)

        print(f"\n{'='*50}")
        print(f"Testing: {method} {endpoint}")
        print(f"Status: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"✅ Success!")

            # Pretty print the result
            if isinstance(result, dict):
                for key, value in result.items():
                    if isinstance(value, dict):
                        print(f"  {key}:")
                        for subkey, subvalue in value.items():
                            print(f"    {subkey}: {subvalue}")
                    else:
                        print(f"  {key}: {value}")
            else:
                print(f"  Response: {result}")
        else:
            print(f"❌ Error: {response.text}")

        return response.json() if response.status_code == 200 else {"error": response.text}

    except requests.exceptions.ConnectionError:
        print(f"❌ Connection Error: Make sure the API is running at {BASE_URL}")
        return {"error": "Connection failed"}
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        return {"error": str(e)}

def main():
    """Run all API tests"""
    print("🧪 AI Sentiment Analysis API Test Suite")
    print("=" * 60)

    # Test data
    sample_text = "This product is absolutely amazing! I love everything about it. Highly recommended!"
    negative_text = "Terrible quality. Broke after one day. Do not waste your money."
    suspicious_text = "THIS IS THE BEST PRODUCT EVER!!!!!!! BUY NOW!!!!!!!!!! AMAZING!!!!!!!!"

    # 1. Test basic endpoints
    print("\n🏠 Testing Basic Endpoints")

    test_endpoint("/")
    test_endpoint("/health")
    test_endpoint("/models")
    test_endpoint("/statistics")

    # 2. Test VADER sentiment analysis
    print("\n🎯 Testing Sentiment Analysis")

    vader_result = test_endpoint("/predict/sentiment", "POST", {
        "text": sample_text,
        "model": "vader"
    })

    # 3. Test RoBERTa sentiment analysis
    roberta_result = test_endpoint("/predict/sentiment", "POST", {
        "text": sample_text,
        "model": "roberta"
    })

    # 4. Test negative sentiment
    test_endpoint("/predict/sentiment", "POST", {
        "text": negative_text,
        "model": "roberta"
    })

    # 5. Test batch analysis
    print("\n📦 Testing Batch Analysis")

    batch_result = test_endpoint("/predict/batch", "POST", {
        "texts": [sample_text, negative_text, "It is okay, works as expected."],
        "model": "vader"
    })

    # 6. Test fake review detection
    print("\n🔍 Testing Fake Review Detection")

    fake_result = test_endpoint("/detect/fake", "POST", {
        "text": suspicious_text,
        "rating": 5
    })

    # Test normal review
    normal_fake_result = test_endpoint("/detect/fake", "POST", {
        "text": "Good product with decent quality. Fast shipping and nice packaging.",
        "rating": 4
    })

    # 7. Test helpfulness analysis
    print("\n💡 Testing Helpfulness Analysis")

    helpful_result = test_endpoint("/analyze/helpfulness", "POST", {
        "text": "I've been using this product for 3 months now and it has exceeded my expectations. The build quality is excellent, the features are intuitive, and the customer support was responsive when I had questions. Highly recommend for anyone looking for a reliable solution.",
        "helpful_votes": 25,
        "total_votes": 30
    })

    # 8. Test model comparison
    print("\n⚖️ Testing Model Comparison")

    comparison_result = test_endpoint("/compare", "POST", sample_text)

    # 9. Test error handling
    print("\n❌ Testing Error Handling")

    # Invalid model
    test_endpoint("/predict/sentiment", "POST", {
        "text": sample_text,
        "model": "invalid_model"
    })

    # Empty text
    test_endpoint("/predict/sentiment", "POST", {
        "text": "",
        "model": "vader"
    })

    # Too long text
    long_text = "This is a test. " * 1000
    test_endpoint("/predict/sentiment", "POST", {
        "text": long_text,
        "model": "vader"
    })

    # 10. Performance test
    print("\n⚡ Performance Test")

    start_time = time.time()
    for i in range(10):
        test_endpoint("/predict/sentiment", "POST", {
            "text": f"Test review number {i+1}. This is a positive review.",
            "model": "vader"
        })

    total_time = time.time() - start_time
    avg_time = total_time / 10

    print(f"\n📊 Performance Results:")
    print(f"  Total time for 10 requests: {total_time:.2f} seconds")
    print(f"  Average time per request: {avg_time:.3f} seconds")
    print(f"  Requests per second: {1/avg_time:.1f}")

    # 11. Summary
    print("\n🎉 Test Summary")
    print("=" * 60)
    print("✅ All tests completed!")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔧 Alternative Docs: http://localhost:8000/redoc")
    print("\n💡 Next Steps:")
    print("  1. Start your React frontend")
    print("  2. Make API calls from your components")
    print("  3. Build your awesome UI!")

if __name__ == "__main__":
    main()