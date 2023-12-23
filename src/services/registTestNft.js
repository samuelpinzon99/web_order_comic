export const updateImageTest = ({
  searchImages,
  _name,
  _email,
  _wallet_address,
  schema,
  coleccion,
}) => {
  const array = Object.values(searchImages);

  const newItem = [];
  array.forEach((element) => {
    newItem.push({
      accountTest: element.accountTest,
      name: element.name,
      email: element.email,
      idImg: element.idImg,
      tested: element.tested,
      urlImg: element.urlImg,
    });
  });
  const filterData = newItem.filter((item)=>item.name !== undefined)

  const _idImg = searchImages.countImg + 1;

  const newImage = {
    accountTest: _wallet_address,
    name: _name,
    email: _email,
    idImg: _idImg,
    tested: false,
    urlImg:
      "https://firebasestorage.googleapis.com/v0/b/admin-novoos.appspot.com/o/ORDER_NFT_001.gif?alt=media&token=131b5c82-c619-4c37-9ff2-e825b1073e49",
  };

  const newArrayImage = [...filterData, newImage];
  const newDataImage = {countImg:_idImg, ...newArrayImage };

    fetch(
      `https://us-central1-admin-novoos.cloudfunctions.net/app/api/NFTsImages/${schema}/${coleccion}`,
      {
        method: "PUT",
        body: JSON.stringify(newDataImage),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
};
