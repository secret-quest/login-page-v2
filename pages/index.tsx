import { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/layout";

export default function Home() {
  const { data: session } = useSession();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  const handleJoinLobby = () => {
    if (session) {
      // Redirect to the game lobby or start the game
      console.log("Joining lobby...");
    } else {
      setVerificationStatus("Please sign in to join the lobby.");
    }
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero-content">
          <h1>Towers of Deception</h1>
          <button className="cta-button" onClick={handleJoinLobby}>Join Lobby</button>
          {verificationStatus && <p className="verification-status">{verificationStatus}</p>}
        </div>
      </section>
    </Layout>
  );
}