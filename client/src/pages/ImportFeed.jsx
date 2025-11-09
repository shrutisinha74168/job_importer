import React, { useState } from "react";
import axios from "axios";

function ImportFeed() {
  const [url, setUrl] = useState("");

  const handleImport = async () => {
    await axios.post("http://localhost:5000/api/import", { feedUrl: url });
    alert("Import started! Refresh after few seconds.");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Import Jobs from Feed</h2>
      <input
        type="text"
        placeholder="Enter Feed URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleImport} className="bg-green-600 text-white px-3 py-1 rounded">
        Import Now
      </button>
    </div>
  );
}

export default ImportFeed;
