const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Helper to read JSON files
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
};

// Authentication routes
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = readJsonFile('auth.json');
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/auth/verify-2fa', (req, res) => {
  const { code } = req.body;
  
  // For demo purposes, any 6-digit code works
  if (code && code.length === 6 && /^\d+$/.test(code)) {
    res.json({ success: true, message: '2FA verification successful' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid 2FA code' });
  }
});

app.post('/auth/set-pin', (req, res) => {
  const { pin } = req.body;
  
  // For demo purposes, any 6-digit pin works
  if (pin && pin.length === 6 && /^\d+$/.test(pin)) {
    res.json({ success: true, message: 'PIN set successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid PIN format' });
  }
});

app.get('/auth/status', (req, res) => {
  // For demo purposes, return authenticated
  res.json({ authenticated: true });
});

// User routes
app.get('/user', (req, res) => {
  const userData = readJsonFile('user.json');
  res.json(userData);
});

app.put('/user', (req, res) => {
  const { name, email, phone, country } = req.body;
  
  // In a real app, you'd update the user data in a database
  res.json({ success: true, message: 'User updated successfully' });
});

// Balance routes
app.get('/balances', (req, res) => {
  const balancesData = readJsonFile('balances.json');
  res.json(balancesData);
});

// Transaction routes
app.get('/transactions', (req, res) => {
  const transactionsData = readJsonFile('transactions.json');
  res.json(transactionsData);
});

// Market routes
app.get('/markets', (req, res) => {
  const marketsData = readJsonFile('markets.json');
  res.json(marketsData);
});

app.get('/markets/:symbol', (req, res) => {
  const { symbol } = req.params;
  const marketsData = readJsonFile('markets.json');
  
  const market = marketsData.markets.find(m => m.symbol === symbol);
  
  if (market) {
    // Add additional market data for the detailed view
    res.json({
      ...market,
      lastPrice: 65432.10,
      priceChangePercent: 2.5,
      high24h: 66000.00,
      low24h: 64000.00,
      volume24h: 1200000000,
      orderBook: {
        asks: [
          ["65500.00", "0.5"],
          ["65550.00", "1.2"],
          ["65600.00", "0.8"],
          ["65650.00", "2.3"],
          ["65700.00", "1.5"],
          ["65750.00", "0.7"],
          ["65800.00", "1.1"],
          ["65850.00", "0.6"]
        ],
        bids: [
          ["65450.00", "0.9"],
          ["65400.00", "1.8"],
          ["65350.00", "1.2"],
          ["65300.00", "0.5"],
          ["65250.00", "2.1"],
          ["65200.00", "1.0"],
          ["65150.00", "0.8"],
          ["65100.00", "1.5"]
        ]
      },
      klines: Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        open: 64000 + Math.random() * 2000,
        high: 64500 + Math.random() * 2000,
        low: 63500 + Math.random() * 2000,
        close: 64200 + Math.random() * 2000,
        volume: 50000000 + Math.random() * 50000000
      }))
    });
  } else {
    res.status(404).json({ success: false, message: 'Market not found' });
  }
});

// Wallet routes
app.get('/wallet/deposit-address', (req, res) => {
  const { currency } = req.query;
  
  // Generate a fake deposit address based on the currency
  const addresses = {
    BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    USDT: 'TPucrXcBEmC8L6N7cseBU3zJTAZkMhQFSn',
    SOL: 'FHKVMjicMjJGPKK4jVgxFxWusdGkeDVY7xB7vAAfSVQz',
    XRP: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh'
  };
  
  res.json({
    currency,
    address: addresses[currency] || '0x0000000000000000000000000000000000000000',
    network: currency === 'USDT' ? 'TRC20' : currency
  });
});

app.get('/wallet/withdrawal-fee', (req, res) => {
  const { currency } = req.query;
  
  // Return fake withdrawal fees based on the currency
  const fees = {
    BTC: 0.0001,
    ETH: 0.005,
    USDT: 1,
    SOL: 0.01,
    XRP: 0.25
  };
  
  res.json({
    currency,
    fee: fees[currency] || 0,
    network: currency === 'USDT' ? 'TRC20' : currency
  });
});

app.post('/wallet/withdraw', (req, res) => {
  const { currency, address, amount } = req.body;
  
  if (!currency || !address || !amount) {
    res.status(400).json({ success: false, message: 'Missing required fields' });
    return;
  }
  
  // In a real app, you'd process the withdrawal request
  res.json({ success: true, message: 'Withdrawal request submitted successfully' });
});

// News routes
app.get('/news', (req, res) => {
  const newsData = readJsonFile('news.json');
  res.json({ articles: newsData });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mock API server running on http://0.0.0.0:${PORT}`);
});
