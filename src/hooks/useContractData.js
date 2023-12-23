import { useCallback, useEffect, useState } from "react";
import {
  getContractMetadata,
  getNFT,
  getNFTOwner,
  getNFTs,
  getNFTsAllCollection,
} from "../services/contractData";
import { useConnectWalletContext } from "../context/ConnectWalletContext";

const VIDEOS = {
  video:
    "https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-VIDEO%203.mp4?alt=media&token=53adc3ce-9f68-48aa-b656-fd98dc525b7c",
  default:
    "https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-VIDEO%202%20cambios%20ok.mp4?alt=media&token=3c5491ff-7fa7-4c22-91b5-1ce0362afeb0",
};
/**
 *contratos para red de prueba en polygon
 */
// const CONTRACTS = {
//     order_delegados: '0x282e6F1222cD91F7d608F2d4936EC114c9842196',
//     order_special: '0xc882c4abF93eD56632Acc9a5a8677c6321bA4514',
//     order_prueba: '0xf1e56Ee5E2654c689642AECfA46B38a40EAb3C44',
// }

/**
 *Contratos para la mainnet de polygon
 */
const CONTRACTS = {
  order_delegados: '0x6e22ea7Bd5B854D370d572e0f228E138313Df82C',
  order_special: '0x7e68F0cbfa0B65F6d604318A2dA39049De61717a',
  order_prueba: '0x200CB954Ca228735d504c428677E10FC288d813F',
}

const useContractMetadata = ({ contractId }) => {
  const [metadata, setMetadata] = useState("");

  const contractMetadata = async () => {
    const res = await getContractMetadata(contractId);
    setMetadata(res);
  };

  useEffect(() => {
    contractMetadata();
  }, []);

  return { metadata };
};

function useNFTsByOwner({ contractId }) {
  const { account } = useConnectWalletContext();

  const [nftsAccount, setNftsAccount] = useState("");

  const nftsByOwner = async () => {
    const res = await getNFTs({ account, contractId });
    //console.log(res)
    setNftsAccount(res);
  };

  useEffect(() => {
    nftsByOwner();
  }, [account]);

  return { nftsAccount };
}

function useNFTsByOwnerAllContracts() {
  const { account } = useConnectWalletContext();

  const [nftsAccountAllContracts, setNftsAccounttAllContracts] = useState("");
  const [priorityCollection, setPriorityCollection] = useState("");
  const [loading, setLoading] = useState(true);

  const collectionOne = (res) => {
    /**
     * se deber crear una variable para manejar los contratos desplegados
     * o leerlos desde la api de marcas y usar camel case
     */
    const col = res.filter(
      (item) =>
        item.contract.address === CONTRACTS.order_special.toLowerCase() ||
        item.contract.address === CONTRACTS.order_delegados.toLowerCase()
    );

    const temp =
      col.length > 0
        ? { state: true, video: VIDEOS.default }
        : { state: false, video: VIDEOS.video };

    setPriorityCollection(temp);
    setLoading(false);
  };

  const nftsByOwnerAllContracts = async () => {
    const res = await getNFTsAllCollection({ account });
    //console.log(res)
    collectionOne(res);
    setNftsAccounttAllContracts(res);
  };

  useEffect(() => {
    nftsByOwnerAllContracts();
  }, [account]);

  return { nftsAccountAllContracts, priorityCollection, loading };
}

function useGetNFTMetadata (contractId, tokenId) {
  const [nfts, setNfts] = useState("");
  const [loadingNft, setLoadingNft]= useState(true)

  const nft = async () => {
    setLoadingNft(false)
    const res = await getNFT({ contractId, tokenId });
    //console.log(res)
    setNfts(res);
    setLoadingNft(false)
  };

  useEffect(() => {
    nft();
  }, []);

  return { nfts, loadingNft };

}

function useGetNFTOwner (contractId, tokenId) {
  const [nftsOwner, setNftsOwner] = useState("");
  const [loadingOwner, setLoadingOwner]= useState(true)

  const nftOwner = useCallback(async () => {
    setLoadingOwner(false)
    const res = await getNFTOwner({ contractId, tokenId });
    //console.log(res)
    setNftsOwner(res);
    setLoadingOwner(false)
  },[contractId,tokenId]);

  useEffect(() => {
    nftOwner();
  }, [nftOwner]);

  return { nftsOwner, loadingOwner };

}
export { useContractMetadata, useNFTsByOwner, useNFTsByOwnerAllContracts, useGetNFTMetadata, useGetNFTOwner };
