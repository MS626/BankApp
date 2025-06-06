import { useEffect, useState } from "react";

interface District {
  name: string;
}

export const useDistricts = () => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/156cb703-dc72-478b-9cb8-bd1fa76e3bc5")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts || []))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  return { districts };
};
