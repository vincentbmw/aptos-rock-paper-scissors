import { AptosClient } from "aptos";

const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const startGame = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::start_game`,
        type_arguments: [],
        functionArguments: [],
      },
    });

    await client.waitForTransaction(response.hash);
    await delay(1000); 
    return response.hash;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};

const setPlayerMove = async (accountAddress: string, move: number, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::set_player_move`,
        typeArguments: [],
        functionArguments: [move],
      },
    });

    await client.waitForTransaction(response.hash);
    await delay(1000); 
    return response.hash;
  } catch (error) {
    console.error("Error setting player move:", error);
    throw error;
  }
};

const randomlySetComputerMove = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::randomly_set_computer_move`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    await client.waitForTransaction(response.hash);
    await delay(1000); 
    return response.hash;
  } catch (error) {
    console.error("Error setting computer move:", error);
    throw error;
  }
};

const finalizeGameResults = async (accountAddress: string, signAndSubmitTransaction: Function) => {
  try {
    const response = await signAndSubmitTransaction({
      sender: accountAddress,
      data: {
        function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::finalize_game_results`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    await client.waitForTransaction(response.hash);
    await delay(1000); 
    return response.hash;
  } catch (error) {
    console.error("Error finalizing game results:", error);
    throw error;
  }
};

const getGameResults = async (accountAddress: string) => {
  try {
    const result = await client.view({
      function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::get_game_results`,
      type_arguments: [],
      arguments: [accountAddress],
    });
    return result[0];
  } catch (error) {
    console.error("Error getting game results:", error);
    throw error;
  }
};

const getComputerMove = async (accountAddress: string) => {
  try {
    const result = await client.view({
      function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::get_computer_move`,
      type_arguments: [],
      arguments: [accountAddress],  
    });
    return parseInt(result[0].toString());
  } catch (error) {
    console.error("Error getting game results:", error);
    throw error;
  }
};

const getScore = async (accountAddress: string) => {
  try {
    const result = await client.view({
      function: `0x7ca56fbfdbb012a325706dcaf0f125e3a0fb1cec583291e013fac893de0ed4b9::RockPaperScissors::get_player_score`,
      type_arguments: [],
      arguments: [accountAddress],  
    });
    return parseInt(result[0].toString());
  } catch (error) {
    console.error("Error getting game results:", error);
    throw error;
  }
};

export {
  startGame,
  setPlayerMove,
  randomlySetComputerMove,
  finalizeGameResults,
  getGameResults,
  getComputerMove,
  getScore
};
