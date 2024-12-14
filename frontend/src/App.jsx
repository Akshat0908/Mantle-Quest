import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { WagmiConfig, createConfig } from 'wagmi';
import { mantleTestnet } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { QuizProvider } from './contexts/QuizContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';

// Create a Viem Public Client
const publicClient = createPublicClient({
  chain: mantleTestnet,
  transport: http('https://rpc.sepolia.mantle.xyz')
});

// Create Wagmi Config
const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains: [mantleTestnet],
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
});

console.log('Wagmi config initialized:', config);

function App() {
  console.log('App rendering');
  return (
    <ErrorBoundary>
      <WagmiConfig config={config}>
        <ChakraProvider>
          <QuizProvider>
            <Router>
              <div className="min-h-screen bg-mantle-light">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </div>
            </Router>
          </QuizProvider>
        </ChakraProvider>
      </WagmiConfig>
    </ErrorBoundary>
  );
}

export default App; 