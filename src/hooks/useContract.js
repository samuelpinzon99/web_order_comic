import React, { useMemo } from "react";
import { ethers } from "ethers";

export function useContract({ abiContract }) {
  const { address, abi } = abiContract;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const colect = useMemo(() => {
    if (!address || !abi || !signer) return null;
    return new ethers.Contract(address, abi, signer);
  }, [address, abi, signer]);

  return { colect };
}