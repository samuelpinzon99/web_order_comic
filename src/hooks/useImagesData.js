import { useEffect, useState } from "react"
import { getContractMetadata } from "../services/contractData"

const useImagesData = ({schema, coleccion, dataUser}) =>{
    const [searchImages, setSeachImages] = useState(null)
    
    useEffect(() => {
        // const coleccion="0x54e870a4EbA0Cd710899E5c0fAe0Ffd5a42c82dF"
        fetch(
          `https://us-central1-admin-novoos.cloudfunctions.net/app/api/NFTsImages/${schema}/${coleccion}`
        )
          .then((response) => response.json())
          .then((data) => setSeachImages(data))
          .catch((error) => console.error(error));
    }, [dataUser]);

    return searchImages
    // const [metadata, setMetadata] = useState("")

    // const contractMetadata = async() =>{
    //     const res = await getContractMetadata(contractId);
    //     setMetadata(res)
    // }

    // useEffect(()=>{
    //     contractMetadata()
    // },[])

    // return{metadata}
}
export {useImagesData}