import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Layout from "../components/layout";

export default function Home() {
  const { data: session } = useSession();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const router = useRouter();

  const handleJoinLobby = () => {
    if (session) {
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
        </div>
      </section>
    </Layout>
  );
}