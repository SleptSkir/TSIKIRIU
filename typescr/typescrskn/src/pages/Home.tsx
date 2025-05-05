import React, { useState } from "react";
import { Button } from "../components/button";
import { Text } from "../components/text";
import { Input } from "../components/input";
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n';

function Home() {
  const [inputValue, setInputValue] = useState("");
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="p-4 min-h-screen">
      <Text size="large" color="primary" content={t.home + 'ページ'} />
      <div className="my-4">
        <Input
          size="medium"
          color="primary"
          placeholder={t.home}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="my-4">
        <Button size="medium" color="primary" title={t.submit} />
      </div>
    </div>
  );
}

export default Home;