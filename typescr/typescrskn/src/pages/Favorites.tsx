import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import CommissionCard from "../components/ComissionSpace";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n";

type Commission = {
  id: number;
  image: string;
  title: string;
  link: string;
  price: string;
  description: string;
};

export default function FavoritesPage() {
  const { user, favorites } = useUser();
  const { language } = useLanguage();
  const t = translations[language];

  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [favComms, setFavComms] = useState<Commission[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/commissions')
      .then(res => res.json())
      .then(data => {
        const commissionsWithDesc = data.map((c: any) => ({
          ...c,
          description: c.description || "",
        }));
        setCommissions(commissionsWithDesc);
      });
  }, []);

  useEffect(() => {
    setFavComms(commissions.filter(c => favorites.includes(c.id)));
  }, [commissions, favorites]);

  if (!user) return <div className="p-6 text-center">{t.loginToSeeFavorites}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{t.favorites}</h2>
      {favComms.length === 0 && <div>{t.noFavorites}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favComms.map(c => <CommissionCard key={c.id} commission={c} />)}
      </div>
    </div>
  );
}
