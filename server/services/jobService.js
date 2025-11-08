const axios = require("axios");
const xml2js = require("xml2js");

const fetchJobsFromAPI = async (feedUrl) => {
  try {
    const res = await axios.get(feedUrl);
    const xmlData = res.data;
    const json = await xml2js.parseStringPromise(xmlData, { explicitArray: false });
    // Example: adapt depending on API structure
    const jobs = json.rss.channel.item.map(item => ({
      title: item.title,
      company: item.company || "N/A",
      location: item.location || "N/A",
      type: item.type || "N/A",
      description: item.description || "",
      url: item.link,
      externalId: item.guid,
      sourceFeed: feedUrl
    }));
    return jobs;
  } catch (err) {
    console.error("API Fetch Error:", err.message);
    return [];
  }
};

module.exports = { fetchJobsFromAPI };
