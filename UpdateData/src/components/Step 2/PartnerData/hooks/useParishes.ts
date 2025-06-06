import { useEffect, useState } from "react";

interface ParishData {
  nome: string;
  freguesias: string[];
}

interface Parish {
  name: string;
}

export const useParishes = (municipalityName: string) => {
  const [parishes, setParishes] = useState<Parish[]>([]);

  useEffect(() => {
    if (!municipalityName) {
      setParishes([]);
      return;
    }

    fetch("https://run.mocky.io/v3/54e4903a-eda6-4034-826e-ffa2a3fb5767")
      .then((res) => res.json())
      .then((data: ParishData[]) => {
        const municipalityData = data.find((m) => m.nome === municipalityName);
        if (municipalityData) {
          const formatted = municipalityData.freguesias.map((p) => ({
            name: p,
          }));
          setParishes(formatted);
        } else {
          setParishes([]);
        }
      })
      .catch((err) => {
        console.error("Error loading Parishes:", err);
        setParishes([]);
      });
  }, [municipalityName]);

  return { parishes };
};
