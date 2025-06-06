import React, { useEffect, useState } from "react";
import axios from "axios";

interface IdentificationDocument {
  id: string;
  label: string;
}

const UseIdentificationDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<IdentificationDocument[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await axios.get<IdentificationDocument[]>(
          "https://run.mocky.io/v3/a5e63435-f578-47b6-b9cb-0650b6922a2b"
        );
        setDocuments(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load identification Documents.");
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h3>List of identification Documents</h3>
      {error && <p>{error}</p>}
      <ul>
        {documents.map((documents) => (
          <li key={documents.label}>{documents.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseIdentificationDocuments;
