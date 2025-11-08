const axios = require("axios");
const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const importJobs = async (feedUrl) => {
  const log = {
    feedUrl,
    totalFetched: 0,
    totalImported: 0,
    newJobs: 0,
    updatedJobs: 0,
    failedJobs: 0,
  };

  try {
    const { data } = await axios.get(feedUrl);
    log.totalFetched = data.length;

    for (const jobData of data) {
      try {
        const existing = await Job.findOne({ externalId: jobData.externalId });

        if (existing) {
          await Job.updateOne({ externalId: jobData.externalId }, jobData);
          log.updatedJobs++;
        } else {
          await Job.create(jobData);
          log.newJobs++;
        }

        log.totalImported++;
      } catch (err) {
        log.failedJobs++;
      }
    }

    await ImportLog.create(log);
    console.log("✅ Import completed:", log);
  } catch (err) {
    console.error("❌ Import failed:", err.message);
  }
};

module.exports = importJobs;
