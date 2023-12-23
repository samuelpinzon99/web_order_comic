import { useCallback, useEffect, useState } from "react";
import { getAbiCollection, getCollectionsClient } from "../services/clientData";

function useGetCollection() {
    const [colecciones, setColecciones] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCollections = async () => {
        setLoading(true);
        const res = await getCollectionsClient();
        setColecciones(res);
        setLoading(false)
    }
    useEffect(() => {
        getCollections();
      },[]);
    
      return {
        colecciones,
        loading,
      };
}

export function useGetAbiCollection ({schema, collectionAddres}) {

  const [abiColect, setAbiColect] = useState(null);
  const [loadingAbi, setLoadingAbi] = useState(true)

  const abiCollection = useCallback(async()=>{
    setLoadingAbi(true)
    const res = await getAbiCollection({schema, collectionAddres})
    setAbiColect(res)
    setLoadingAbi(false)

  },[collectionAddres, schema])

  useEffect(()=>{
    abiCollection()
  },[abiCollection])

  return {abiColect, loadingAbi}
}

export {useGetCollection}