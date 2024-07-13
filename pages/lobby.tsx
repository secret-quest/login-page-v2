import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router';
import Layout from "../components/layout";
import { ethers } from 'ethers';

// Import your ABI and contract addresses
import { crypticAscentABI, mockERC20ABI } from '../constants/abis';
import { CRYPTIC_ASCENT_ADDRESS, MOCK_ERC20_ADDRESS } from '../constants/addresses';

export default function Lobby() {
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [isStaking, setIsStaking] = useState(false);
  const [stakingError, setStakingError] = useState<string | null>(null);

  const playerType = router.query.type as string;

  useEffect(() => {
    if (!isAuthenticated || !playerType) {
      router.push('/');
    }
  }, [isAuthenticated, playerType, router]);

  const handleStake = async () => {
    if (!primaryWallet) {
      setStakingError("Wallet not connected");
      return;
    }

    setIsStaking(true);
    setStakingError(null);

    try {
      const provider = new ethers.providers.Web3Provider(primaryWallet.connector as any);
      const signer = provider.getSigner();

      const mockERC20Contract = new ethers.Contract(MOCK_ERC20_ADDRESS, mockERC20ABI, signer);
      const crypticAscentContract = new ethers.Contract(CRYPTIC_ASCENT_ADDRESS, crypticAscentABI, signer);

      // Approve token spending
      const approvalTx = await mockERC20Contract.approve(CRYPTIC_ASCENT_ADDRESS, ethers.utils.parseEther("100"));
      await approvalTx.wait();

      // Create game and stake
      const createGameTx = await crypticAscentContract.createGame(2);
      const receipt = await createGameTx.wait();
      
      const event = receipt.events.find((event: any) => event.event === 'GameCreated');
      const gameId = event ? event.args.gameId.toNumber() : null;

      if (gameId === null) {
        throw new Error("Failed to create game");
      }

      const stakeTx = await crypticAscentContract.stake(gameId);
      await stakeTx.wait();

      // Redirect to the game
      router.push(`https://secret.quest?gameId=${gameId}&playerType=${playerType}`);
    } catch (error) {
      console.error("Staking error:", error);
      setStakingError("Failed to stake. Please try again.");
    } finally {
      setIsStaking(false);
    }
  };

  if (!isAuthenticated || !playerType) {
    return null;
  }

  return (
    <Layout>
      <div className="lobby-container">
        <h1>Game Lobby</h1>
        <p>Welcome, {user?.username || 'Player'}!</p>
        <p>You are joining as a {playerType === 'human' ? 'Human' : 'AI Agent'}.</p>
        {playerType === 'human' && session && (
          <p>Worldcoin verification: Successful</p>
        )}
        <button onClick={handleStake} disabled={isStaking}>
          {isStaking ? 'Staking...' : 'Stake and Join Game'}
        </button>
        {stakingError && <p className="error">{stakingError}</p>}
      </div>
    </Layout>
  );
}