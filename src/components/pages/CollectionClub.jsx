import React from "react";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import { useParams } from "react-router-dom";
import { Collection } from "../components/Collection";
import { useContractMetadata } from "../../hooks/useContractData";

export function CollectionClub() {
  const { collectionId } = useParams();
  const contractId = collectionId;
  const { metadata } = useContractMetadata({ contractId });
  const { account, chainId, balance } = useConnectWalletContext();
  /**
   * verificar substring para acortar la cuenta
   */
  const shortAccount = (acc) => {
    const addresShort =
      acc.substring(0, 5) + "..." + acc.substring(acc.length - 4);
    return addresShort;
  };
  const aroundBalance = (bal) => {
    const num = parseFloat(bal);
    return num.toFixed(3);
  };
  if (!metadata) {
    return <p>Loading ...</p>;
  }
  return (
    <div id="hero" className="geta-nft-test mb-5">
      {/* HERO   */}
      {console.log(collectionId)}
      <div className="container p-10">
        {metadata && <h1>{metadata.contractMetadata.name}</h1>}
        <p className="account"><span>Cuenta:&nbsp; </span>{account}</p>

        <div className="d-flex justify-content-center w-100">
          <img src="/icons/icon_account_value.svg" className="account-value-icon"></img>
          {balance && <p className="account-value"><span>$:</span> {aroundBalance(balance)} MATIC</p>}
        </div>

        {account && <Collection collection={collectionId} />}
      </div>
    </div>
  );
}
