import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getJobs = async () => {
  const res = await axios.get(`${API_BASE}/jobs`);
  return res.data;
};

export const getImportLogs = async () => {
  const res = await axios.get(`${API_BASE}/import-logs`);
  return res.data;
};
