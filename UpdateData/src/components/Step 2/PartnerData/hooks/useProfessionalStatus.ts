import { useEffect, useState } from "react";

interface ProfessionalStatus {
  name: string;
}

export const UseProfessionalStatus = () => {
  const [status, setStatus] = useState<ProfessionalStatus[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/c24e6f94-ed60-4ec4-a713-4ad3183be762")
      .then((res) => res.json())
      .then((data) => setStatus(data.status || []))
      .catch((err) => console.error("Error loading status:", err));
  }, []);

  return { status };
};
