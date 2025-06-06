import React, { useEffect, useState } from "react";
import axios from "axios";

interface Relative {
  id: string;
  label: string;
}

const UseRelatives: React.FC = () => {
  const [relatives, setRelatives] = useState<Relative[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatives = async () => {
      try {
        const { data } = await axios.get<Relative[]>(
          "https://run.mocky.io/v3/496d56cd-d383-4d6c-bd8f-d2ebcaac3a06"
        );
        setRelatives(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load relatives.");
      }
    };

    fetchRelatives();
  }, []);

  return (
    <div>
      <h3>List of Relatives</h3>
      {error && <p>{error}</p>}
      <ul>
        {relatives.map((relatives) => (
          <li key={relatives.label}>{relatives.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseRelatives;
