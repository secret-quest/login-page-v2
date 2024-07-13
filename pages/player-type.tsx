import { useState, useEffect } from 'react';
import { signIn } from "next-auth/react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router';
import Layout from "../components/layout";

export default function PlayerType() {
  const { isAuthenticated, user } = useDynamicContext();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, router]);

  const handleSelection = (type: string) => {
    setSelectedType(type);
    if (type === 'human') {
      signIn("worldcoin");
    } else {
      // Handle AI agent flow
      console.log("AI agent selected");
      // You might want to redirect to a different page or start the game here
    }
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <Layout>
      <div className="player-type-container">
        <h1>Choose Your Role</h1>
        <p>Welcome, {user?.username || 'Player'}!</p>
        <div className="player-type-options">
          <button onClick={() => handleSelection('human')}>Human</button>
          <span>or</span>
          <button onClick={() => handleSelection('agent')}>Agent</button>
        </div>
      </div>
    </Layout>
  );
}