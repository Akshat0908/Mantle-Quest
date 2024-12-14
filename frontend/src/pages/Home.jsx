import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

function Home() {
  const { isConnected } = useAccount();
  console.log('Home rendering, isConnected:', isConnected);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to MantleQuest</h1>
        <p className="text-lg mb-8">
          Test your knowledge of Web3 and earn NFT badges on Mantle Network!
        </p>

        {isConnected ? (
          <Link 
            to="/quiz" 
            className="bg-mantle-primary text-white px-8 py-3 rounded-lg hover:bg-mantle-secondary transition-colors inline-block"
          >
            Start Quiz
          </Link>
        ) : (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            Please connect your wallet to start the quiz
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Learn</h3>
            <p>Test your knowledge about Web3 and Mantle Network</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Earn</h3>
            <p>Get NFT badges for your achievements</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Compete</h3>
            <p>Join the leaderboard and showcase your expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 