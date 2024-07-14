import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import Layout from "../components/layout";

export default function Home() {
  const { user, isAuthenticated, handleLogOut } = useDynamicContext();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log('Authentication status:', isAuthenticated);
    console.log('User:', user);
  }, [isAuthenticated, user]);

  const handleJoinLobby = () => {
    console.log('Join Lobby clicked. isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      router.push('/player-type');
    } else {
      setVerificationStatus("Please sign in to join the lobby.");
    }
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero-content">
          <h1 className="game-title">Tower of Secrets</h1>
          <button className="cta-button" onClick={handleJoinLobby}>Join Lobby</button>
          {verificationStatus && <p className="verification-status">{verificationStatus}</p>}
          <p>Authentication Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
          {isAuthenticated && (
            <button onClick={handleLogOut} className="logout-button">Log Out</button>
          )}
        </div>
      </section>
    </Layout>
  );
}
