import { useEffect, useState } from "react";

interface SexType {
  label: string;
  value: string;
}

export const useSexTypes = () => {
  const [sexTypes, setSexTypes] = useState<SexType[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/456f6626-e176-43c5-950a-6d8d9f53afeb")
      .then((response) => response.json())
      .then((res) => setSexTypes(res.sex))
      .catch((error) => console.log(error));
  }, []);

  return { sexTypes };
};
