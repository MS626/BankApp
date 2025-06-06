import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProfessionalStatus {
  id: string;
  label: string;
}

const UseProfessionalStatus: React.FC = () => {
  const [status, setStatus] = useState<ProfessionalStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const { data } = await axios.get<ProfessionalStatus[]>(
          "https://run.mocky.io/v3/810e6515-bc64-4b0f-9903-94a4432c3823"
        );
        setStatus(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Professional Status.");
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div>
      <h3>List of Professional Status</h3>
      {error && <p>{error}</p>}
      <ul>
        {status.map((status) => (
          <li key={status.label}>{status.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseProfessionalStatus;
