import React, { useEffect, useState } from "react";
import axios from "axios";

interface Position {
  id: string;
  label: string;
}

const UsePositions: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const { data } = await axios.get<Position[]>(
          "https://run.mocky.io/v3/a8015abb-870d-43a1-a322-0da9e5364221"
        );
        setPositions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Positions.");
      }
    };

    fetchPositions();
  }, []);

  return (
    <div>
      <h3>List of Positions</h3>
      {error && <p>{error}</p>}
      <ul>
        {positions.map((positions) => (
          <li key={positions.label}>{positions.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsePositions;
