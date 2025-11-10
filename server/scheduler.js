const cron = require('node-cron');
const axios = require('axios');
const xml2js = require('xml2js');
const jobQueue = require('./queues/jobQueue');

const FEEDS = [
  'https://jobicy.com/?feed=job_feed',
  // add others...
];

async function enqueueFeed(url) {
  try {
    const { data } = await axios.get(url);
    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(data);
    const raw = parsed?.rss?.channel?.item || [];
    const arr = Array.isArray(raw) ? raw : [raw];
    const items = arr.map(it => ({ title: it.title || '', company: it['dc:creator']||'', location: it.location||'', type: it['job:job_type']||'', description: it.description||'', url: it.link||'', externalId: (it.guid && (it.guid._||it.guid)) || (it.link||'') }));
    await jobQueue.add({ feedUrl: url, items });
    console.log('Enqueued feed', url, items.length);
  } catch (err) { console.error('Scheduler error', url, err.message); }
}

function startScheduler() {
  cron.schedule('0 * * * *', () => { FEEDS.forEach(enqueueFeed); }); // every hour at minute 0
}
module.exports = { startScheduler };
