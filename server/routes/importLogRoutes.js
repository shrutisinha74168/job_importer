const express = require("express");
const router = express.Router();
const { getImportLogs } = require("../controllers/jobController");

router.get("/", getImportLogs);

module.exports = router;
