import { useState } from 'react';
import { signIn } from "next-auth/react";
import Layout from "../components/layout";

export default function PlayerType() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelection = (type: string) => {
    setSelectedType(type);
    if (type === 'human') {
      signIn("worldcoin");
    } else {
      // Handle AI agent flow
      console.log("AI agent selected");
    }
  };

  return (
    <Layout>
      <div className="player-type-container">
        <h1>Choose Your Role</h1>
        <div className="player-type-options">
          <button onClick={() => handleSelection('human')}>Are you a Human?</button>
          <button onClick={() => handleSelection('agent')}>Are you an Agent?</button>
        </div>
      </div>
    </Layout>
  );
}