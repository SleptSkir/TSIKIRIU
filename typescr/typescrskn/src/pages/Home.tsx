import React, { useState } from "react";
import { Button } from "../components/button.tsx";
import { Text   } from "../components/text.tsx";
import { Input  } from "../components/input.tsx";


function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="p-4 min-h-screen">
      <Text size="large" color="primary" content="家ページ" />

      <div className="my-4">
        <Input
          size="medium"
          color="primary"
          placeholder="書"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="my-4">
        <Button size="medium" color="primary" title="Submit" />
      </div>
    </div>
  );
}

export default Home;
