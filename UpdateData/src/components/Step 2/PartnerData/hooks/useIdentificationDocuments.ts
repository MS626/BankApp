import { useEffect, useState } from "react";

interface IdentificationDocument {
  name: string;
}

export const UseIdentificationDocuments = () => {
  const [documents, setDocuments] = useState<IdentificationDocument[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/81691b6b-0c7d-45a9-8d04-00e0c3b6da5e")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || []))
      .catch((err) => console.error("Error loading document types:", err));
  }, []);

  return { documents };
};
