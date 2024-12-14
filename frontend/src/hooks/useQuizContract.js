import { useContract } from './useContract';
import { useContractRead } from 'wagmi';
import { mantleQuestABI } from '../contracts/abis';
import { MANTLEQUEST_ADDRESS } from '../contracts/addresses';
import { useAccount } from 'wagmi';

export function useQuizContract() {
  const { address } = useAccount();
  const { startQuiz: startQuizContract, completeQuiz: completeQuizContract } = useContract();

  // Get active session with shorter polling interval
  const { data: activeSession, refetch: refetchSession } = useContractRead({
    address: MANTLEQUEST_ADDRESS,
    abi: mantleQuestABI,
    functionName: 'getActiveSession',
    args: [address],
    enabled: !!address,
    watch: true,
    cacheTime: 5000, // 5 seconds cache
    staleTime: 2000, // Refetch after 2 seconds
  });

  const startQuiz = async (difficulty) => {
    try {
      // Start quiz transaction
      const tx = await startQuizContract(difficulty);
      console.log('Quiz start transaction:', tx);

      // Start quiz immediately without waiting for confirmation
      return true;
    } catch (error) {
      console.error('Error in startQuiz:', error);
      throw error;
    }
  };

  const completeQuiz = async (score) => {
    try {
      if (!activeSession?.isActive) {
        throw new Error('No active quiz session');
      }

      const tx = await completeQuizContract(score);
      console.log('Quiz completion transaction:', tx);
      return true;
    } catch (error) {
      console.error('Error in completeQuiz:', error);
      throw error;
    }
  };

  return {
    startQuiz,
    completeQuiz,
    activeSession,
  };
} 