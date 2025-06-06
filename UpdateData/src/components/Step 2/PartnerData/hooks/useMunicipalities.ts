import { useEffect, useState } from "react";

interface MunicipalityData {
  district: string;
  municipalities: string[];
}

interface Municipality {
  name: string;
}

export const useMunicipalities = (districtName: string) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    if (!districtName) {
      setMunicipalities([]);
      return;
    }

    fetch("https://run.mocky.io/v3/63f59659-9656-4b1c-b1f8-7cc0a0ce5d7c")
      .then((res) => res.json())
      .then((data: MunicipalityData[]) => {
        const districtData = data.find((d) => d.district === districtName);
        if (districtData) {
          const formatted = districtData.municipalities.map((m) => ({
            name: m,
          }));
          setMunicipalities(formatted);
        } else {
          setMunicipalities([]);
        }
      })
      .catch((err) => {
        console.error("Error loading Municipalities:", err);
        setMunicipalities([]);
      });
  }, [districtName]);

  return { municipalities };
};
