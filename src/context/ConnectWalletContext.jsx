import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const connectWalletContext = createContext();

export function useConnectWalletContext() {
  const context = useContext(connectWalletContext);
  if (!context) {
    throw new Error(
      "connectWalletContext must be used within a connectWalletContextProvider"
    );
  }
  return context;
}

function ConnectWalletContext(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null)

  useEffect(() => {
    if (window.ethereum) {
      getNetwork();
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);

    }
    const account = localStorage.getItem("account");

    if (account) {
      setAccount(account);
      getBalance(account)
    }
  }, []);

  const getNetwork = async() => {
    const networkId = await window.ethereum.request({ method: 'net_version' });
    setChainId(networkId)
    //console.log(networkId)
  }

  const getBalance = async (acc) => {
    const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [acc.toString(), "latest"],
      });
    setBalance(ethers.utils.formatEther(balance));
  }

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("--->", res[0])
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    // console.log("accc", newAccount)
    const accountStr = typeof(newAccount) === 'object' ? newAccount[0] : newAccount
    localStorage.removeItem("account")
    localStorage.setItem("account", accountStr);
    setAccount(accountStr);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accountStr.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const discconect = () => {
    localStorage.removeItem("account")
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  }

  const chainChanged = () => {
    getNetwork();
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };
  return (
    <connectWalletContext.Provider
      value={{ account, balance, chainId, errorMessage, connectHandler, discconect }}
    >
      {props.children}
    </connectWalletContext.Provider>
  );
}

export default ConnectWalletContext;
