const axios = require("axios");
const xml2js = require("xml2js");
const jobQueue = require("../queues/jobQueue"); // ✅ Redis Queue import

// ✅ Import API — bas job enqueue karega
const importJobs = async (req, res) => {
  const { feedUrl } = req.body;

  if (!feedUrl) {
    return res.status(400).json({ message: "feedUrl is required" });
  }

  console.log(`📥 Received request to import from: ${feedUrl}`);

  try {
    // 1️⃣ XML data fetch
    const { data } = await axios.get(feedUrl);

    // 2️⃣ XML → JSON convert
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(data);
    const items = result?.rss?.channel?.item;

    // 3️⃣ Normalize jobs array
    const jobs = Array.isArray(items) ? items : [items];
    const totalFetched = jobs.length;

    // 4️⃣ Convert har job to simplified object
    const formattedJobs = jobs.map((job) => ({
      title: job.title || "Untitled",
      company: job["dc:creator"] || job["job:company_name"] || "Unknown",
      location: job.location || "Remote",
      type: job["job:job_type"] || "N/A",
      description: job.description || "",
      url: job.link || "",
      sourceFeed: feedUrl,
      externalId:
        (job.guid && (job.guid._ || job.guid)) ||
        job.link ||
        Math.random().toString(36).substring(2),
    }));

    // 5️⃣ Queue me ek batch job enqueue karo (background processing)
    await jobQueue.add({ feedUrl, items: formattedJobs });

    console.log(`🧩 ${totalFetched} jobs fetched and queued for processing`);
    return res.json({
      message: "Feed enqueued successfully",
      totalFetched,
    });
  } catch (err) {
    console.error("❌ Import error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { importJobs };
