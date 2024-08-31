  import './App.css';
  import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
  import { useWallet } from '@aptos-labs/wallet-adapter-react';
  import GameBoard from './components/GameBoard';


  function App() {
    const { connected, account } = useWallet();

    return (
      <div className="App">
        <div className="App-header">
          {!connected && <WalletSelector /> }
          {connected &&
            <div>
              <GameBoard />
            </div>
          }
        </div>
      </div>
    );
  }

  export default App;
