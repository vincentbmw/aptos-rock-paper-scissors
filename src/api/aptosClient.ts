import { AptosClient } from 'aptos';

const client = new AptosClient('https://fullnode.testnet.aptoslabs.com/v1');

export const getAccountResources = async (address: string) => {
  try {
    const resources = await client.getAccountResources(address);
    return resources;
  } catch (error) {
    console.error('Error fetching account resources:', error);
    throw error;
  }
};

