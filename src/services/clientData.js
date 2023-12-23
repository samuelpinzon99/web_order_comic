const API_LINK = process.env.REACT_APP_API_LINK;

export const getCollectionsClient = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const url = 'https://us-central1-admin-novoos.cloudfunctions.net/app/api/marcas/rxpaUXL6EOjSQm1gNXf2'
    const res = await fetch(url, options)
    const data = await res.json()
    
    const collectionOrder = Object.values(data.contracts);
    return collectionOrder
};


export async function getAbiCollection ({ schema, collectionAddres }) {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const url = `${API_LINK}/abis/${schema}/${collectionAddres}`;
  
    const res = await fetch(url, options);
    const data = await res.json();
  
    const abidb = Object.values(data);
    const abiColection = {
      address: collectionAddres,
      abi: abidb,
    };
  
    return abiColection
  }