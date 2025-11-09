import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getImportLogs } from "../services/api";

const ImportHistoryTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getImportLogs().then(setLogs);
  }, []);

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>Feed URL</th>
          <th>Total Fetched</th>
          <th>Total Imported</th>
          <th>New Jobs</th>
          <th>Updated Jobs</th>
          <th>Failed Jobs</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.feedUrl}</td>
            <td>{log.totalFetched}</td>
            <td>{log.totalImported}</td>
            <td>{log.newJobs}</td>
            <td>{log.updatedJobs}</td>
            <td>{log.failedJobs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ImportHistoryTable;
