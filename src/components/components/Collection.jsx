import React from "react";
import {
  useNFTsByOwner
} from "../../hooks/useContractData";
import { useParams } from "react-router-dom";
import { NavLinkk } from "./NavLink";

function CardsNfts({ nfts }) {
  const {collectionId} = useParams()
  const tokenId = (tokenId) => {
    const id = tokenId.split("");
    id.reverse();

    let letMap = 0;
    id.map((item, index) =>
      item !== "0" && item !== "x" ? (letMap = index) : ""
    );
    //console.log(letMap)
    const arrId = id.slice(0, letMap + 1);

    const temp = arrId.reverse().toString().replace(/,/g, "");

    return parseInt(temp, 16);
  };

  return (
    <>
      <div className="delegados_images">
        <ul>
          {nfts &&
            nfts.map((nft) => (
              <li key={nft.id.tokenId}>
                <img
                  className="img-fluid"
                  src={nft.media[0].gateway}
                  alt={nft.id.tokenId}
                />
                <div className="nft-name mt-3">
                  Nombre del NFT
                </div>
                <span>
                  <p className="d-flex gap-2 justify-content-center"><span>TokenId:</span> {tokenId(nft.id.tokenId)}</p>
                </span>
                <NavLinkk to={`/collecion-club-detail/${collectionId}/${tokenId(nft.id.tokenId)}`}>
                <span href="#" className="ppal_cta" style={{fontSize:'23px'}}>
                  conectar nft
                </span>
              </NavLinkk>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}


export function Collection({ collection }) {
  const contractId = collection;
  const { nftsAccount } = useNFTsByOwner({ contractId });


  return (
    <>
      {/* {console.log(collection)} */}
      {nftsAccount && (
        <>
          {/* <CardsNfts nfts={NFTS} /> */}
          <CardsNfts nfts={nftsAccount}/>
          {/* {nftsAccount && <Tabs nfts={nftsAccount} contract={contractId} />} */}
          </>
      )}
    </>
  );
}
