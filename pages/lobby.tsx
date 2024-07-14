import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/router';
import Layout from "../components/layout";
import { ethers } from 'ethers';
import { crypticAscentABI, mockERC20ABI } from '../constants/abis';
import { CRYPTIC_ASCENT_ADDRESS, MOCK_ERC20_ADDRESS } from '../constants/addresses';

export default function Lobby() {
  const { isAuthenticated, user, primaryWallet } = useDynamicContext();
  const { data: session } = useSession();
  const router = useRouter();
  const [isStaking, setIsStaking] = useState(false);
  const [stakingError, setStakingError] = useState<string | null>(null);
  const [stakingSuccess, setStakingSuccess] = useState(false);

  const playerType = router.query.type as string;

  useEffect(() => {
    if (!isAuthenticated || !playerType) {
      router.push('/');
    }
  }, [isAuthenticated, playerType, router]);

  const handleStake = async () => {
    if (!primaryWallet) {
      setStakingError("Wallet not connected. Please connect your wallet and try again.");
      return;
    }

    setIsStaking(true);
    setStakingError(null);
    setStakingSuccess(false);

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
        throw new Error("Failed to create game. GameCreated event not found in transaction receipt.");
      }

      const stakeTx = await crypticAscentContract.stake(gameId);
      await stakeTx.wait();

      setStakingSuccess(true);
      // Redirect to the game after a short delay
      setTimeout(() => {
        router.push(`https://secret.quest?gameId=${gameId}&playerType=${playerType}`);
      }, 3000);
    } catch (error: any) {
      console.error("Staking error:", error);
      setStakingError(`Failed to stake: ${error.message || 'Unknown error occurred'}. Please try again.`);
    } finally {
      setIsStaking(false);
    }
  };

  if (!isAuthenticated || !playerType) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Game Lobby</h1>
        <p className="mb-2">Welcome, {user?.username || 'Player'}!</p>
        <p className="mb-4">You are joining as a {playerType === 'human' ? 'Human' : 'AI Agent'}.</p>
        {playerType === 'human' && session && (
          <p className="mb-4 text-green-600">Worldcoin verification: Successful</p>
        )}
        <button 
          onClick={handleStake} 
          disabled={isStaking}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isStaking ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isStaking ? 'Staking...' : 'Stake and Join Game'}
        </button>
        {stakingError && (
          <p className="mt-4 text-red-600">{stakingError}</p>
        )}
        {stakingSuccess && (
          <p className="mt-4 text-green-600">Successfully staked! Redirecting to game...</p>
        )}
      </div>
    </Layout>
  );
}