import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ProfileStats({ address, badges, bestScore, rank }) {
  const navigate = useNavigate();

  const achievements = [
    { level: 'Beginner', medal: '🥉', color: 'from-bronze-400 to-bronze-600', unlocked: badges > 0 },
    { level: 'Intermediate', medal: '🥈', color: 'from-silver-400 to-silver-600', unlocked: badges > 1 },
    { level: 'Advanced', medal: '🥇', color: 'from-gold-400 to-gold-600', unlocked: badges > 2 },
    { level: 'Perfect Score', medal: '👑', color: 'from-purple-400 to-purple-600', unlocked: bestScore === 100 }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-mantle-primary to-mantle-secondary rounded-2xl p-8 mb-8 text-white"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{address}</h2>
            <p className="text-white/80">Joined the Quest for Knowledge</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Badges Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Badges Earned</h3>
          <div className="text-4xl font-bold text-mantle-primary">{badges || 0}</div>
        </motion.div>

        {/* Best Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Best Score</h3>
          <div className="text-4xl font-bold text-mantle-primary">{bestScore || 0}%</div>
        </motion.div>

        {/* Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Rank</h3>
          <div className="text-4xl font-bold text-mantle-primary">{rank || '-'}</div>
        </motion.div>
      </div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <h3 className="text-xl font-bold mb-6">Earned Badges</h3>
        {badges > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.level}
                className={`relative rounded-lg p-6 text-center ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} text-white`
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.medal}</div>
                <div className="font-semibold">{achievement.level}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-4">🎯</div>
            <p>No badges earned yet</p>
          </div>
        )}
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={() => navigate('/quiz')}
          className="bg-gradient-to-r from-mantle-primary to-mantle-secondary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          Start Quiz
        </button>
      </motion.div>

      {/* Achievement Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <h3 className="text-xl font-bold mb-6">Achievement Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.level}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{achievement.medal}</span>
                <div>
                  <div className="font-semibold">{achievement.level}</div>
                  <div className="text-sm text-gray-500">
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileStats; 