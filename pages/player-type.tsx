import { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router';
import Layout from "../components/layout";

export default function PlayerType() {
  const { isAuthenticated, user } = useDynamicContext();
  const { data: session, status } = useSession();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // Redirect to home if not authenticated with Dynamic
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    console.log("NextAuth session status:", status);
    console.log("NextAuth session data:", session);
  }, [session, status]);

  const handleSelection = (type: string) => {
    setSelectedType(type);
    if (type === 'human') {
      signIn("worldcoin", { callbackUrl: '/game' }); // Redirect to game page after Worldcoin verification
    } else {
      // Handle AI agent flow
      console.log("AI agent selected");
      router.push('/game'); // Redirect to game page for AI agents
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
        {status === "authenticated" && (
          <p>Worldcoin verification successful! You are verified as a human.</p>
        )}
      </div>
    </Layout>
  );
}