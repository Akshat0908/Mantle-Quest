import React from 'react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import ProfileStats from '../components/ProfileStats';

function Profile() {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  // Format address for display
  const displayAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <ProfileStats
      address={displayAddress}
      badges={0} // Replace with actual badge count from contract
      bestScore={0} // Replace with actual best score from contract
      rank="-" // Replace with actual rank from contract/leaderboard
    />
  );
}

export default Profile; 