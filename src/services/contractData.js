/**
 * API y contratos para red de prueba en polygon
 */
const ALCHEMY_ENDPOINT = process.env.REACT_APP_ALCHEMY_ENDPOINT_MUMBAI;
const CONTRACTS = {
    order_delegados: '0x954C9bA12F504400fB98D4558836E5fFb28bb811',
    order_special: '0xe2b3C118c32C84bBEc87994CAA16A1D7FAa66776',
    order_prueba: '0xf1e56Ee5E2654c689642AECfA46B38a40EAb3C44',
}

/**
 * API y contratos para red mainnet de polygon
 */
// const ALCHEMY_ENDPOINT = process.env.REACT_APP_ALCHEMY_ENDPOINT_MAINET;
// const CONTRACTS = {
//     order_delegados: '0x6e22ea7Bd5B854D370d572e0f228E138313Df82C',
//     order_special: '0x7e68F0cbfa0B65F6d604318A2dA39049De61717a',
//     order_prueba: '0x200CB954Ca228735d504c428677E10FC288d813F',
//   }

export const getContractMetadata = async (contract) => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const res = await fetch(`${ALCHEMY_ENDPOINT}/getContractMetadata?contractAddress=${contract}`,
    options)
    const data = await res.json()
    
    return data
};

export const getNFTs = async ({account, contractId}) => {
    
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const url = `${ALCHEMY_ENDPOINT}/getNFTs?owner=${account}&contractAddresses[]=${contractId}&withMetadata=true&pageSize=100`
    const res = await fetch(url, options);
    const data = await res.json()

    // console.log("cuentaa: ", account, "contrato: ", contractId)
    // console.log(data)

    return data.ownedNfts
}

export const getNFTsAllCollection = async ({account}) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    /**
     * los contratos usados se deben cambiar por los que traer la opi/marcas
     * o crear una variable para en el contexto para traer todos los contratos
     */
    const url = `${ALCHEMY_ENDPOINT}/getNFTs?owner=${account}&contractAddresses[]=${CONTRACTS.order_delegados}&contractAddresses[]=${CONTRACTS.order_special}&contractAddresses[]=${CONTRACTS.order_prueba}&withMetadata=true&pageSize=100`
    const res = await fetch(url, options);
    const data = await res.json();


    return data.ownedNfts
}

export const getNFT = async ({contractId, tokenId}) => {
    
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const url = `${ALCHEMY_ENDPOINT}/getNFTMetadata?contractAddress=${contractId}&tokenId=${tokenId}`
    const res = await fetch(url, options);
    const data = await res.json()

    // console.log("cuentaa: ", account, "contrato: ", contractId)
    // console.log(data)

    return data
}

export const getNFTOwner = async ({contractId, tokenId}) => {
    
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const url = `${ALCHEMY_ENDPOINT}/getOwnersForToken?contractAddress=${contractId}&tokenId=${tokenId}`
    const res = await fetch(url, options);
    const data = await res.json()

    // console.log("cuentaa: ", account, "contrato: ", contractId)
    // console.log(data)

    return data
}