import React, { useState, useEffect } from 'react';

// Web version of the app using standard DOM elements
const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // For demonstration purposes, let's use direct mock data
        // This simulates what we would get from the real API
        const mockData = {
          markets: [
            {
              id: "BTC-USDT",
              symbol: "BTC-USDT",
              baseAsset: "BTC",
              quoteAsset: "USDT",
              price: 65432.10,
              percentChange24h: 2.5,
              volume24h: 1200000000
            },
            {
              id: "ETH-USDT",
              symbol: "ETH-USDT",
              baseAsset: "ETH",
              quoteAsset: "USDT",
              price: 3612.45,
              percentChange24h: 1.8,
              volume24h: 650000000
            },
            {
              id: "SOL-USDT",
              symbol: "SOL-USDT",
              baseAsset: "SOL",
              quoteAsset: "USDT",
              price: 79.82,
              percentChange24h: 5.2,
              volume24h: 320000000
            },
            {
              id: "XRP-USDT",
              symbol: "XRP-USDT",
              baseAsset: "XRP",
              quoteAsset: "USDT",
              price: 0.51,
              percentChange24h: -0.8,
              volume24h: 180000000
            },
            {
              id: "DOGE-USDT",
              symbol: "DOGE-USDT",
              baseAsset: "DOGE",
              quoteAsset: "USDT",
              price: 0.142,
              percentChange24h: 3.4,
              volume24h: 240000000
            }
          ]
        };
        
        // In a real app, this would come from the API
        setData(mockData);
        
        // Simulate API fetch delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loader"></div>
        <p className="loading-text">Loading OKX Clone...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error-text">Error: {error}</p>
        <p className="help-text">
          Make sure the Mock API server is running on port 3000.
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-text">OKX Clone</h1>
        <p className="subheader-text">React Native Mobile App Preview</p>
      </div>
      
      <div className="content">
        <div className="section">
          <h2 className="section-title">Market Data</h2>
          {data && data.markets && data.markets.map(market => (
            <div key={market.id} className="market-item">
              <div className="market-header">
                <span className="market-symbol">{market.symbol}</span>
                <span 
                  className={`market-percent ${market.percentChange24h >= 0 ? 'positive' : 'negative'}`}
                >
                  {market.percentChange24h >= 0 ? '+' : ''}{market.percentChange24h}%
                </span>
              </div>
              <div className="market-price">${market.price.toLocaleString()}</div>
              <div className="market-volume">24h Vol: ${(market.volume24h / 1000000).toFixed(2)}M</div>
            </div>
          ))}
        </div>
        
        <div className="info-section">
          <h2 className="info-title">About This App</h2>
          <p className="info-text">
            This is a React Native CLI-based monorepo mobile application that replicates the OKX cryptocurrency exchange. 
            The application is built with a micro-frontend architecture using lazy-loaded components.
          </p>
          <h3 className="features-title">Key Features:</h3>
          <ul className="features-list">
            <li className="feature-item">Authentication with 2FA and PIN setup</li>
            <li className="feature-item">Dashboard with portfolio and asset tracking</li>
            <li className="feature-item">Wallet for deposits, withdrawals, and transfers</li>
            <li className="feature-item">Market trading interface with order books</li>
            <li className="feature-item">Crypto news and price alerts</li>
            <li className="feature-item">Settings and profile management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;