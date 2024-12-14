import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { formatDistanceToNow } from 'date-fns';
import { mantleQuestLeaderboardABI } from '../contracts/abis';
import { LEADERBOARD_ADDRESS } from '../contracts/addresses';

function Leaderboard() {
  const { address } = useAccount();
  const [timeFrame, setTimeFrame] = useState('all'); // 'all', 'daily', 'weekly'

  // Fetch top scores
  const { data: topScores = [], isLoading } = useContractRead({
    address: LEADERBOARD_ADDRESS,
    abi: mantleQuestLeaderboardABI,
    functionName: 'getTopScores',
    watch: true,
  });

  // Fetch user's best score
  const { data: userBestScore } = useContractRead({
    address: LEADERBOARD_ADDRESS,
    abi: mantleQuestLeaderboardABI,
    functionName: 'playerBestScores',
    args: [address],
    enabled: !!address,
    watch: true,
  });

  const filteredScores = React.useMemo(() => {
    if (timeFrame === 'all') return topScores;

    const now = Date.now();
    const timeLimit = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
    }[timeFrame];

    return topScores.filter(score => 
      now - (Number(score.timestamp) * 1000) <= timeLimit
    );
  }, [topScores, timeFrame]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Leaderboard</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFrame('all')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'all' 
                  ? 'bg-mantle-primary text-white' 
                  : 'bg-gray-200'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFrame('daily')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'daily' 
                  ? 'bg-mantle-primary text-white' 
                  : 'bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'weekly' 
                  ? 'bg-mantle-primary text-white' 
                  : 'bg-gray-200'
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {address && (
          <div className="bg-mantle-primary/10 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Best Score</h3>
            <p className="text-2xl font-bold">{Number(userBestScore || 0)}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">Loading scores...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredScores.map((score, index) => (
                  <tr 
                    key={index}
                    className={score.player === address ? 'bg-yellow-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {score.player === address 
                          ? 'You'
                          : `${score.player.slice(0, 6)}...${score.player.slice(-4)}`
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {Number(score.score)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(Number(score.timestamp) * 1000, { addSuffix: true })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard; 