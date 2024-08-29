import './App.css';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import GameBoard from './components/GameBoard';

function App() {
   const { connected, account, network } = useWallet();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aptos Rock Paper Scissors Game</h1>
        <WalletSelector />
        {connected && account ? (
          <div>
            <GameBoard />
          </div>
        ) : (
          <p> No wallet connected</p>
        )}
      </header>
    </div>
  );
}

export default App;
