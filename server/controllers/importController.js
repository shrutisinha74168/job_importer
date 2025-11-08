const axios = require("axios");
const xml2js = require("xml2js");
const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

// ✅ Import ka main function
const importJobs = async (req, res) => {
  const { feedUrl } = req.body;
  console.log(`📥 Importing jobs from: ${feedUrl}`);

  const log = {
    feedUrl,
    totalFetched: 0,
    totalImported: 0,
    newJobs: 0,
    updatedJobs: 0,
    failedJobs: 0,
    failedReasons: [],
  };

  try {
    // 1️⃣ XML data fetch
    const { data } = await axios.get(feedUrl);

    // 2️⃣ XML → JSON convert
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(data);
    const jobs = result?.rss?.channel?.[0]?.item || [];
    log.totalFetched = jobs.length;

    // 3️⃣ Har job insert/update
    for (const job of jobs) {
      try {
        const externalId = job.link?.[0] || job.guid?.[0] || Math.random().toString(36).substring(2);
        const existing = await Job.findOne({ externalId });

        const jobData = {
          title: job.title?.[0] || "Untitled",
          company: job["dc:creator"]?.[0] || "Unknown",
          location: job.location?.[0] || "Remote",
          type: job["jobtype"]?.[0] || "N/A",
          description: job.description?.[0] || "",
          url: job.link?.[0] || "",
          sourceFeed: feedUrl,
          externalId,
        };

        if (existing) {
          await Job.updateOne({ _id: existing._id }, jobData);
          log.updatedJobs++;
        } else {
          await Job.create(jobData);
          log.newJobs++;
        }
        log.totalImported++;
      } catch (err) {
        log.failedJobs++;
        log.failedReasons.push(err.message);
      }
    }

    // 4️⃣ Import logs me entry save
    await ImportLog.create(log);

    res.json({ message: "Import completed", log });
  } catch (err) {
    log.failedReasons.push(err.message);
    await ImportLog.create(log);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { importJobs };
