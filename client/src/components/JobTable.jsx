import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getJobs } from "../services/api";
import JobRow from "./JobRow";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Location</th>
          <th>Type</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <JobRow key={job._id} job={job} />
        ))}
      </tbody>
    </Table>
  );
};

export default JobTable;
