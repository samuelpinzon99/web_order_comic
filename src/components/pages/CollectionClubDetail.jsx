import React, { useCallback, useEffect, useState } from "react";
import { useGetNFTMetadata, useGetNFTOwner } from "../../hooks/useContractData";
import { useParams } from "react-router-dom";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import { useGetAbiCollection } from "../../hooks/useClientData";
import { useContract } from "../../hooks/useContract";
import { ModalBenefits } from "../POP-ups/ModalBenefits";
import { Tabs } from "../components/Tabs";

function ButtonRaisePoints({ abiContract, tokenId }) {
  const { colect } = useContract({ abiContract });

  const checkLevelAndPoints = async () => {
    let level = 0,
      points = 0;
    if (colect) {
      const result = await colect.getAttributes(tokenId);
      points = Number(result.points.toString());
      level = Number(result.level.toString());
      points = points + 5;
      if (points % 10 === 0) {
        level = level + 1;
        return {
          points,
          level,
        };
      } else {
        return {
          points,
          level,
        };
      }
    }
  };

  const updateAttributes = async () => {
    if (colect) {
      //console.log("metodos",await colect)
      const { points, level } = await checkLevelAndPoints();
      console.log("puntos-->", points);
      console.log("level-->", level);

      try {
        const mintTx = await colect.updateAttributes(tokenId, points, level);
        console.log(`Transaction hash: ${mintTx.hash}`);
        const receipt = await mintTx.wait(); // aqui se sabe que la transaccion ya fue echa
        window.alert(`Transaction confirmed at block: ${receipt.blockNumber}`);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      console.log("error");
    }
  };

  // return (
  //   <button
  //     onClick={updateAttributes}
  //     href="#"
  //     className="ppal_cta"
  //     style={{ fontSize: "23px" }}
  //   >
  //     Subir puntos
  //   </button>
  // );
}

function TablePoints({ abiContract, tokenId }) {
  const { colect } = useContract({ abiContract });

  const [artributes, setAtributes] = useState({ points: 0, level: 0 });
  const [openModalBenefi, setOpenModalBenefi] = useState(false);

  const openModal = () => {
    setOpenModalBenefi(true);
  };

  const getAttributes = useCallback(async () => {
    // validamos que el contrato exista
    if (colect) {
      const result = await colect.getAttributes(tokenId); //console.log("Holaaa",{maxSupply}) //dentro del then
      //console.log(result.points.toString());
      setAtributes({
        points: result.points.toString(),
        level: result.level.toString(),
      });
      //setMaxSupply(result.toString());
    }
  }, [colect]); // cada que cambie elcontrato se crea esta funcion

  useEffect(() => {
    getAttributes();
  }, [getAttributes]);
  return (
    <>
     
<div className="benefits w-100">
  <p className="benefits-title">Tus beneficios</p>
  <div className="benefits-container p-3 d-flex">

  <Tabs/>

  </div>
</div>

      {/* <table className="table table-bordered" style={{ color: "white" }}>
        <thead>
          <tr>
            <th scope="col">Puntos</th>
            <th scope="col">Nivel</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td>{artributes.points}</td>
            <td>{artributes.level}</td>
          </tr>
        </tbody>
      </table>
      {artributes && (
        <button
          href="#"
          onClick={openModal}
          className="ppal_cta"
          style={{ fontSize: "23px" }}
        >
          Tus beneficios
        </button>
      )}
      {openModalBenefi && (
        <ModalBenefits
          setOpen={setOpenModalBenefi}
          points={artributes.points}
          level={artributes.level}
        />
      )} */}
    </>
  );
}
export function CollectionClubDetail() {
  const { account } = useConnectWalletContext();
  const { collectionId, tokenId } = useParams();
  const { nfts, loadingNft } = useGetNFTMetadata(collectionId, tokenId);
  const { nftsOwner, loadingOwner } = useGetNFTOwner(collectionId, tokenId);
  const [artributes, setAtributes] = useState({ points: 0, level: 0 });

  const collectionAddres = collectionId;
  const schema = 'ORDERTEST';
  const { abiColect, loadingAbi } = useGetAbiCollection({ schema, collectionAddres });
  const shortAccount = (acc) => {
    const addresShort =
      acc.substring(0, 5) + "..." + acc.substring(acc.length - 4);
    return addresShort;
  };

  return (
    <div id="hero" className="geta-nft-test">
      {/* HERO   */}
      {/* {console.log("nft", abiColect)} */}
      <div className="container p-10">
        {loadingNft ? (
          <p>Cargando ....</p>
        ) : (
          nfts && (
            <div className="row row-cols-1 gap-5 flex-column align-items-center gap-lg-0 flex-lg-row row-cols-md-2 g-2 mb-3">
              <div className="col">
                <div className="delegados_images">
                  <img
                    className="img-responsive"
                    src={nfts.media[0].gateway}
                    alt={nfts.id.tokenId}
                    width="260"
                  />
                  <span>
                    <p><span>TokenId:</span> {nfts.id.tokenId}</p>
                  </span>
                </div>
              </div>
              <div className="col">
                <div className="d-flex flex-column flex-column align-items-center align-items-lg-start">
                  {nftsOwner.owners && (
                    <>
                      <div>
                        <h1 className="collection-club-detail-nft-name">La Carta</h1>  {/* Nombre del NFT */}

                      </div>

                      <div className="d-flex flex-column align-items-center align-items-lg-start owner">

                        <div className="mb-3 mb-sm-0 d-flex align-items-center">
                          <i className="fa-solid fa-user" style={{ color: "#ffffff" }}></i><p>
                            <b>Dueño</b>:&nbsp;
                            {nftsOwner.owners[0] === account.toLowerCase()
                              ? "Tú"
                              : shortAccount(nftsOwner.owners[0])}
                          </p>

                        </div>

                        <div className="flex-column flex-sm-row stats">
                          <div className="points d-flex align-items-center"><img src="/icons/icon_points.svg" className="stat-icon"></img><p>{artributes.points}</p><p>Puntos</p></div>
                          <div className="level d-flex align-items-center"><img src="/icons/icon_level.svg" className="stat-icon"></img><p>Nivel</p><p>{artributes.level}</p></div>
                        </div>


                      </div>




                      {/* TABLA DE ATRIBUTOS */}
                      {!loadingAbi && (
                        <TablePoints
                          abiContract={abiColect}
                          tokenId={tokenId}
                        />
                      )}
                      {/* FIN TABLA ATRIBUTOS */}
                      {nftsOwner.owners[0] === account.toLowerCase()
                        ? !loadingAbi && (
                          <ButtonRaisePoints
                            abiContract={abiColect}
                            tokenId={tokenId}
                          />
                        )
                        : ""}
                    </>
                  )}
                </div>


              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
