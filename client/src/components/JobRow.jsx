import React from "react";

const JobRow = ({ job }) => {
  return (
    <tr>
      <td>{job.title}</td>
      <td>{job.company}</td>
      <td>{job.location}</td>
      <td>{job.type}</td>
      <td>
        <a href={job.url} target="_blank" rel="noopener noreferrer">View</a>
      </td>
    </tr>
  );
};

export default JobRow;
