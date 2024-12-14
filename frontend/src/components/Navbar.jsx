import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { Link } from 'react-router-dom';

function Navbar() {
  const { connect, connectors, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  console.log('Navbar rendering:', { isConnected, address });

  return (
    <nav className="bg-mantle-dark text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MantleQuest</Link>
        
        <div className="flex space-x-6">
          <Link to="/quiz" className="hover:text-mantle-primary">Quiz</Link>
          <Link to="/leaderboard" className="hover:text-mantle-primary">Leaderboard</Link>
          <Link to="/profile" className="hover:text-mantle-primary">Profile</Link>
        </div>

        {isConnected ? (
          <button 
            onClick={() => disconnect()}
            className="bg-mantle-primary px-4 py-2 rounded hover:bg-mantle-secondary transition-colors"
          >
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </button>
        ) : (
          <button 
            onClick={() => connect({ connector: connectors[0] })}
            disabled={isLoading}
            className="bg-mantle-primary px-4 py-2 rounded hover:bg-mantle-secondary transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 