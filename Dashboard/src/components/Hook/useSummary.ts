import { useEffect, useState } from "react";

interface AccountSummary {
  account: {
    bankName: string;
    bankId: string;
    availableBalance: string;
    bookBalance: string;
  };
  entries: {
    today: string;
    thisMonth: string;
  };
  exits: {
    today: string;
    thisMonth: string;
  };
}

export const useAccountSummary = () => {
  const [summary, setSummary] = useState<AccountSummary | null>(null);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f704f450-d02f-49e2-b9ae-351a38d2d21a")
      .then((res) => res.json())
      .then((data) => setSummary(data.summary || null))
      .catch((err) => console.error("Error loading Summury:", err));
  }, []);

  return { summary };
};
