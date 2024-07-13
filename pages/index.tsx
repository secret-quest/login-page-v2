import { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import Layout from "../components/layout";
import styles from "./index.module.css";

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
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Towers of Deception</h1>
          <button className={styles.ctaButton} onClick={handleJoinLobby}>Join Lobby</button>
          {verificationStatus && <p className={styles.verificationStatus}>{verificationStatus}</p>}
        </div>
      </section>
    </Layout>
  );
}