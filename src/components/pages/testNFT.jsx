import React, { useEffect, useState } from "react";
import { useImagesData } from "../../hooks/useImagesData";
import { updateImageTest } from "../../services/registTestNft";
import ModalNftPrueba from "../POP-ups/ModalNftPrueba";
import { ModalInfo } from "../POP-ups/ModalInfo";

const TestNFT = () => {
  const [modalNftPrueba, setModalNftPrueba] = useState(false);
  const [modalInfo, setModalInfo] = useState({state:false, message:''});
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    wallet_address: "",
  });

  const [mailData, setMailData] = useState({
    fullName: "",
    email: "info@novoos.co, Alvaro@novoos.co",
    nftGift: "",
    message: "",
    wallet: "",
    notification: "prueba_novoos",
    correo: "",
  });

  const schema = "ORDER";
  const coleccion = "0x200CB954Ca228735d504c428677E10FC288d813F";

  const searchImages = useImagesData({ schema, coleccion, dataUser });

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataUser.name || !dataUser.email || !dataUser.wallet_address) {
      return;
    }
    //buscar wallets ya registradas en la base de datos
    const array = Object.values(searchImages);
    const walletDuplicate = array.find(
      (item) => item.accountTest === dataUser.wallet_address
    );

    if (typeof walletDuplicate === "undefined") {
      // const mailDataUpdate=
      setMailData({
        ...mailData,
        fullName: dataUser.name,
        wallet: dataUser.wallet_address,
        correo: dataUser.email,
      });
      await updateImageTest({
        searchImages,
        _name: dataUser.name,
        _email: dataUser.email,
        _wallet_address: dataUser.wallet_address,
        schema,
        coleccion,
      });

      setModalNftPrueba(true);
      // alert('!Felicidades! \n te enviaremos un NFT de prueba en un plazo maximo de 48 horas.');

      setDataUser({
        ...dataUser,
        name: "",
        email: "",
        wallet_address: "",
      });
    } else {
      setModalInfo({state:true, message:'La wallet ingresada ya pose un nft en esta coleccion'})
      //window.alert("La wallet ingresada ya pose un nft");
    }
  };

  return (
    <>
      {modalNftPrueba && mailData && (
        <ModalNftPrueba
          setModalNftPrueba={setModalNftPrueba}
          mailData={mailData}
        />
      )}
      {modalInfo.state && <ModalInfo setModalInfo={setModalInfo} message={modalInfo.message}/>}
      <div id="hero" className="geta-nft-test">
        {/* HERO   */}
        <div className="container p-10">
          <h1>Lleva un nft de prueba</h1>
          <p>¡Nos encanta tu curiosidad!</p>
          <div className="info-getanft">
            <div className="container align-items-start py-4 d-flex">
              <div className="getnftcol1 getnftcol1-mobile col-6 ">
                <p className="getnft-show">
                  Por eso queremos enseñarte cómo utilizar un{" "}
                  <span className="yellow_txt">NFT</span> totalmente
                  <br />
                  <span className="yellow_txt">GRATIS</span>.
                </p>
              </div>
              <div className="getnftcol2  col-6">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/admin-novoos.appspot.com/o/ORDER_NFT_001.gif?alt=media&token=131b5c82-c619-4c37-9ff2-e825b1073e49"
                  className="img-fluid peoplesmoke"
                  alt=""
                />
              </div>
            </div>
          </div>

          <p className="tonext_a">
            A continuación, encontrarás un video tutorial de como crear tu
            billetera digital (CryptoWallet) y cómo compartir su "dirección" de
            destino para recibir activos digitales (NFT'S) en la red de Polygon.
          </p>

          <div className="container mb-5">
            <div className="row">
              {/* colocar video */}
              <div className="col-lg-8" style={{ margin: "auto 0px" }}>
                {/* <video
                  style={{ width: "100%", maxWidth: "1200px" }}
                  poster=""
                  controls
                  autoPlay={true}
                  loop
                  muted
                  disablePictureInPicture
                  controlsList="nodownload"
                  playsInline={true}
                > */}
                <video
                  style={{ width: "100%", maxWidth: "1200px" }}
                  poster=""
                  controls
                  loop
                  disablePictureInPicture
                  controlsList="nodownload"
                >
                  <source src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FABRIL-WALLET%20FINAL.mp4?alt=media&token=33b91cb9-4722-4d7f-985a-af688dfd51b8" />
                </video>
              </div>
              <div className="instruction-form">
                <p
                  className="form-mobile"
                  style={{ color: "#0a0a0a", margin: "0px" }}
                >
                  Formulario
                </p>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/admin-novoos.appspot.com/o/ORDER_NFT_001.gif?alt=media&token=131b5c82-c619-4c37-9ff2-e825b1073e49"
                  className="img-fluid peoplesmoke form-mobile"
                  alt=""
                />
                <form id="get_a_NFT_gift" onSubmit={handleSubmit}>
                  <input
                    id="name"
                    className="get_a-NFT-input"
                    type="text"
                    name="name"
                    value={dataUser.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    required
                  />
                  <input
                    id="email"
                    className="get_a-NFT-input"
                    type="email"
                    name="email"
                    value={dataUser.email}
                    onChange={handleChange}
                    placeholder="Correo"
                    required
                  />
                  <input
                    id="wallet_address"
                    className="get_a-NFT-input"
                    type-="text"
                    name="wallet_address"
                    value={dataUser.wallet_address}
                    onChange={handleChange}
                    placeholder="Wallet"
                    required
                  />
                  <button type="submit" className="get_a-NFT-btn">
                    Reclamar NFT prueba
                  </button>
                </form>
              </div>
            </div>
          </div>
          <p className="tonext_a">
            Ahora, te enviaremos un NFT de prueba para que puedas interactuar
            con nuestra plataforma antes de realizar tu inversión. ¡Diligencia
            el formulario y espera tu primer NFT!
          </p>
        </div>
      </div>
    </>
  );
};

export default TestNFT;
