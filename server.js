require('dotenv').config();

const express      = require('express');
const { sequelize, testConnection } = require('./config/database');
const userRoutes   = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check Route ───────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Task 02 API - Persistent Storage with Database Integration',
    version: '1.0.0',
    endpoints: {
      'GET    /api/users':     'Fetch all users',
      'GET    /api/users/:id': 'Fetch user by ID',
      'POST   /api/users':     'Create new user',
      'PUT    /api/users/:id': 'Update user by ID',
      'DELETE /api/users/:id': 'Delete user by ID'
    }
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/users', userRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.url} not found`
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    // 1. Test DB connection
    await testConnection();

    // 2. Sync all models (alter: true updates table without dropping it)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully.');

    // 3. Start listening
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV}`);
      console.log(`🗄️  Database:    ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT}`);
      console.log('\n📋 Available Routes:');
      console.log('   GET    /api/users');
      console.log('   GET    /api/users/:id');
      console.log('   POST   /api/users');
      console.log('   PUT    /api/users/:id');
      console.log('   DELETE /api/users/:id\n');
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
