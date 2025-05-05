import React, { useState } from "react";
import { Button } from "../../components/button.js";
import { Text } from "../../components/text.js";
import { Input } from "../../components/input.js";

function Home() {
  // Local state for the input field
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="p-4 min-h-screen">
      <Text size="large" color="black" content="家ページ" />

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
