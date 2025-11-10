// server/jobWorker.js
const Queue = require('bull');
const mongoose = require('mongoose');
const Job = require('../models/Job');
const ImportLog = require('../models/ImportLog');
require('dotenv').config();

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Worker connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Redis Queue
const importQueue = new Queue('job-import-queue', {
  redis: { host: '127.0.0.1', port: 6379 } // local Redis config
});

importQueue.process(async (job, done) => {
  try {
    console.log(`📦 Processing job import from: ${job.data.feedUrl}`);
    const feedUrl = job.data.feedUrl;

    // Worker process logic yahan likh sakti ho
    // (job data fetch, XML to JSON, DB insert/update)
    // For now just mock success:
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`✅ Job imported successfully from ${feedUrl}`);

    done();
  } catch (err) {
    console.error('❌ Worker failed:', err);
    done(new Error(err.message));
  }
});
