#  Job Importer

A full-stack MERN project that imports job listings from external RSS/JSON feeds (like Jobicy), stores them in MongoDB, and displays them on a dashboard with import logs.

---

##  Features

- Fetch and import jobs from an external feed URL
- Prevent duplicate jobs using unique `externalId`
- Maintain import logs showing fetched, imported, updated, and failed jobs
- Display jobs and import history in a React dashboard
- Built with Node.js, Express, MongoDB, and React

---

##  Project Structure

job_importer/
│
├── client/ # React frontend (port 3000)
│ ├── src/
│ ├── package.json
│ └── ...
│
├── server/ # Node.js backend (port 5000)
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── .env # Environment variables
├── .gitignore
└── README.md


---

##  Setup Instructions

###  1. Clone the repository
```bash
git clone https://github.com/shrutisinha74168/job_importer
cd job_importer

## Install dependencies
## 1. Backend
cd server
npm install

## 1. frontend
cd ../client
npm install




