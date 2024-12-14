import { useContractWrite } from 'wagmi';
import { mantleQuestABI } from '../contracts/abis.js';
import { MANTLEQUEST_ADDRESS } from '../contracts/addresses.js';
import { useAccount } from 'wagmi';

export function useContract() {
  const { address: userAddress } = useAccount();

  const { write: startQuizWrite } = useContractWrite({
    address: MANTLEQUEST_ADDRESS,
    abi: mantleQuestABI,
    functionName: 'startQuiz',
    onSuccess(data) {
      console.log('Start quiz success:', data);
    },
    onError(error) {
      console.error('Start quiz error:', error);
    }
  });

  const { write: completeQuizWrite } = useContractWrite({
    address: MANTLEQUEST_ADDRESS,
    abi: mantleQuestABI,
    functionName: 'completeQuiz',
    onSuccess(data) {
      console.log('Complete quiz success:', data);
    },
    onError(error) {
      console.error('Complete quiz error:', error);
    }
  });

  const startQuiz = async (difficulty) => {
    try {
      if (!userAddress) {
        throw new Error('Wallet not connected');
      }

      if (!startQuizWrite) {
        throw new Error('Write function not available');
      }

      startQuizWrite({
        args: [difficulty],
        overrides: {
          from: userAddress,
          gasLimit: BigInt(2100000),
        }
      });

      // Return true immediately after sending transaction
      return true;
    } catch (error) {
      console.error('Error in startQuiz:', error);
      throw error;
    }
  };

  const completeQuiz = async (score) => {
    try {
      if (!userAddress) {
        throw new Error('Wallet not connected');
      }

      if (!completeQuizWrite) {
        throw new Error('Write function not available');
      }

      completeQuizWrite({
        args: [score],
        overrides: {
          from: userAddress,
          gasLimit: BigInt(2100000),
        }
      });

      // Return true immediately after sending transaction
      return true;
    } catch (error) {
      console.error('Error in completeQuiz:', error);
      throw error;
    }
  };

  return {
    startQuiz,
    completeQuiz,
  };
}

// Custom hook with retry logic
export function useContractRead(config) {
  return wagmiContractRead({
    ...config,
    cacheTime: 30_000,
    staleTime: 30_000,
    retry: true,
    retryDelay: 1000,
    retryCount: 3,
  });
}