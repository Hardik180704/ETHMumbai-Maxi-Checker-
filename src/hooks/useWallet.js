import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          handleAccountChanged(accounts[0]);
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsConnecting(true);
      setError(null);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await handleAccountChanged(accounts[0]);
      } catch (err) {
        console.error("Error connecting wallet:", err);
        setError("Failed to connect wallet.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError("MetaMask not found. Please install it!");
      alert("MetaMask nahi hai kya boss? Install kar lo!");
    }
  };

  const handleAccountChanged = async (newAccount) => {
    setAccount(newAccount);
    setEnsName(null); // Reset ENS while fetching
    
    // Try to resolve ENS
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const name = await provider.lookupAddress(newAccount);
      if (name) {
        setEnsName(name);
      }
    } catch (err) {
      console.log("ENS lookup failed or no ENS found:", err);
    }
  };

  useEffect(() => {
    checkConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          handleAccountChanged(accounts[0]);
        } else {
          setAccount(null);
          setEnsName(null);
        }
      });
    }

    return () => {
      // Cleanup listeners if needed (mostly auto-handled by window.ethereum)
    };
  }, []);

  return { account, ensName, connectWallet, isConnecting, error };
}
