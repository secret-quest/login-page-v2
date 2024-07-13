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
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSelection = (type: string) => {
    setSelectedType(type);
    if (type === 'human') {
      signIn("worldcoin", { callbackUrl: `/lobby?type=human` });
    } else {
      router.push(`/lobby?type=agent`);
    }
  };

  if (!isAuthenticated) {
    return null;
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