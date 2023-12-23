import React, { useEffect, useState } from "react";
import { appendScript } from "../../utils/appendScript";

// import particlesJS from '../../assets/js/order_nftclub-particles.js';

import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import ModalNftRegalo from "../POP-ups/ModalNftRegalo";
import ModalWarn from "../POP-ups/ModalWarn";
import ParcticleBackground from "../../utils/parcticleBackground";
import { ModalInfo } from "../POP-ups/ModalInfo";

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};

const Home = () => {
  const [searchBeneficiario, setSeachBeneficiario] = useState(null);
  const [modalNftRegalo, setModalNftRegalo] = useState(false);
  const [modalWarn, setModalWarn] = useState(false);
  const [modalInfo, setModalInfo] = useState({state:false, message:''});
  const [mailData, setMailData] = useState({
    fullName: "",
    email: "info@novoos.co, Alvaro@novoos.co",
    nftGift: "",
    message: "",
    wallet: "",
    notification: "regalo_novoos",
    correo: "",
  });

  // useEffect(() => {
  //   appendScript(
  //     "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
  //   );
  // });

  // GET GIFT
  const schema = "ORDER";
  const coleccion = "0x7e68F0cbfa0B65F6d604318A2dA39049De61717a";

  useEffect(() => {
    // const coleccion="0x54e870a4EbA0Cd710899E5c0fAe0Ffd5a42c82dF"
    fetch(
      `https://us-central1-admin-novoos.cloudfunctions.net/app/api/NFTsImages/${schema}/${coleccion}`
    )
      .then((response) => response.json())
      .then((data) => setSeachBeneficiario(data))
      .catch((error) => console.error(error));
  }, [schema, coleccion]);
  const [data, setData] = useState({
    wallet_address: "",
    claim_code: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.wallet_address || !data.claim_code) {
      return;
    }
    //buscar si el codigo ya fue registrado
    const array = Object.values(searchBeneficiario);
    const codigoNoReclamado = array.filter(
      (item) => item.code === data.claim_code && item.gift === true
    );
    console.log(codigoNoReclamado);
    if (codigoNoReclamado.length > 0) {
      setModalInfo({state:true, message:'Codigo de regalo ya reclamado'})
      //window.alert("Codigo de regalo ya reclamado");
    } else {
      setMailData({
        ...mailData,
        wallet: data.wallet_address,
        message: data.claim_code,
      });
      await updateImageGift();
      await searchCodeBeneficiario();

      setData({
        ...data,
        wallet_address: "",
        claim_code: "",
      });
    }
  };

  const updateImageGift = () => {
    if (searchBeneficiario && Object.keys(searchBeneficiario).length > 0) {
      const array = Object.values(searchBeneficiario);
      // const arrayBenefiario = array.filter(item => item.code === giftCode);

      const arrayBenefiario = array.filter((item) => {
        if (item.code === data.claim_code) {
          item.gift = true;
          item.accountBeneficiario = data.wallet_address;
        }
        return item;
      });

      let updatedData = Object.assign({}, arrayBenefiario);
      // const coleccion="0x54e870a4EbA0Cd710899E5c0fAe0Ffd5a42c82dF"
      fetch(
        `https://us-central1-admin-novoos.cloudfunctions.net/app/api/NFTsImages/${schema}/${coleccion}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
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
    }
  };
  const updateBeneficiario = (beneficiarioEncontrado) => {
    if (
      beneficiarioEncontrado &&
      Object.keys(beneficiarioEncontrado).length > 0
    ) {
      const id = beneficiarioEncontrado.id;
      const code = beneficiarioEncontrado.nft_regalo.nft_regalo_codigo;
      const newData = {
        nft_regalo: {
          nft_regalo_codigo: code,
          nft_regalo_estado: 2,
          nft_regalo_account: data.wallet_address,
        },
      };
      //   console.log(newData)
      setModalNftRegalo(true);
      //   alert('¡Felicitaciones Delegado! \n Recuerda que recibiras tu NFT en un plazo máximo de 48 horas hábiles, \n lo enviaremos a la direccion que indicaste.')

      let updatedData = Object.assign({}, newData);
      fetch(
        `https://us-central1-admin-novoos.cloudfunctions.net/app/api/beneficiarios/${schema}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
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
    }
  };

  const searchCodeBeneficiario = () => {
    fetch(
      `https://us-central1-admin-novoos.cloudfunctions.net/app/api/beneficiario/${schema}`
    )
      .then((response) => response.json())
      .then((datos) => {
        const beneficiarioEncontrado = datos.find(
          (item) => item.nft_regalo.nft_regalo_codigo === data.claim_code
        );
        if (beneficiarioEncontrado) {
          // setSearchCode(beneficiarioEncontrado)
          updateBeneficiario(beneficiarioEncontrado);
        } else {
          setModalWarn(true);
          //   alert(`!Código Invalido \n Ooops, algo salio mal, Revisa que el código sea correcto \n o comunicate con nuestra area de servicio`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {modalNftRegalo && mailData && (
        <ModalNftRegalo
          setModalNftRegalo={setModalNftRegalo}
          mailData={mailData}
        />
      )}
      {modalWarn && <ModalWarn setModalWarn={setModalWarn} />}
      {modalInfo.state && <ModalInfo setModalInfo={setModalInfo} message={modalInfo.message}/>}
      {/* HERO */}

      <div id="hero" className="hero home">
        <video
          id="video_hero"
          poster=""
          autoPlay={true}
          loop
          muted
          disablePictureInPicture
          controlsList="nodownload"
          playsInline={true}
        >
          {/* <source src="assets/videos/VIDEO_SinFinal.mp4"/> */}
          <source src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FVIDEO_SinFinal.mp4?alt=media&token=d0e22805-d216-4c4a-aec0-cd38e179ba21" />
        </video>
        <div className="container p-10">
          <h1>
            Los delegados
            <br /> del fundador
          </h1>
          <div className="ocultar">
            <NavLink to="/conviertete-en-delegado">
              <span href="#" className="ppal_cta ">
                ¡Comprar nft!
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      {/* VIDEO WELCOME */}
      <div id="video_welcome" className="video_welcome">
        <div className="container d-flex flex-wrap justify-content-center">
          <div className="video_section">
            <video
              id="video_welcome-video"
              poster="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fabout_order-nft.webp?alt=media&token=75fdfabd-826f-4508-bf56-9dade48811c8"
              controls
              loop
              disablePictureInPicture
              controlsList="nodownload"
            >
              <source src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fvideos%2FORDER_NFT_CLUB_CUT_V01.mp4?alt=media&token=ad4ae8c5-d09e-49d0-b4aa-5062fb013fd9" />
            </video>
            <div className="ocultar-mobile" style={{ padding: "15px" }}>
              <NavLink to="/conviertete-en-delegado">
                <span href="#" className="ppal_cta">
                  ¡Comprar nft!
                </span>
              </NavLink>
            </div>
            {/* <NavLink to="/checkout">
                                <span href="#" className="ppal_cta mobile_cta">¡Conviertete en uno!</span>
                        </NavLink> */}
            <p>
              ¡Somos la primera{" "}
              <span className="yellow_txt">
                comunidad NFT de un cómic Latinoamericano
              </span>
              ! Como miembro estarás a la altura de los delegados del fundador y
              tendrás la potestad de influir en el rumbo de nuestras historias,
              cada holder será propietario de un{" "}
              <span className="yellow_txt">Activo Digital</span> y tendrá acceso
              a beneficios exclusivos dispuestos para entregar{" "}
              <span className="yellow_txt">valor a toda la comunidad</span>.
            </p>
          </div>{" "}
          {/* end video section */}
          <div id="our_history_section">
            <h2>Nuestra Historia</h2>
            <p>
              ORDER es una ficción basada en hechos reales que narra la vida de
              dos hermanos gemelos quienes fueron exiliados de su planeta natal
              por un conflicto entre un gobierno totalitario y una rebelión
              armada. Desesperados, los hermanos levantan una sublevación en
              contra del imperio para encontrar a su madre.
            </p>

            <div className="our_history_images d-flex justify-content-around">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2F03_FotoFiccion.webp?alt=media&token=ba1a3faa-827c-4c9d-bc80-4ae0be6379ae"
                className="img-fluid float-start"
                alt="Order NFT Club ficcion"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2F03_FotoRealidad.webp?alt=media&token=e783f8bf-d608-4663-a646-e0f073e10a43"
                className="img-fluid float-end"
                alt="Order NFT Club realidad"
              />
            </div>
          </div>
        </div>
      </div>
      {/* BENEFICTS SECTION  */}
      <div id="benefics_section" className="benefics_section">
        <div className="benefics_title">
          <img
            className="benefics_img img-fluid"
            // src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2F04_BG.webp?alt=media&token=4a65775a-fd7f-4e8d-81c8-f9ae551c7870"
            src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Fcaja.webp?alt=media&token=33530c1c-852e-4371-929b-73ab9423e3d6"
            alt="Beneficios delegados"
          />
          <h2>
            Beneficios de <br />
            los Delegados
          </h2>
        </div>

        <div className="benefics_content py-5">
          <div className="container align-items-start py-4 d-flex">
            <div id="beneficios" className="benefics_info1 col-6">
              <div className="inner-benefics">
                <h3>
                  Beneficios <br />
                  <span className="yellow_txt">Ordinarios</span>
                </h3>

                <div className="accordion" id="beneficios_ordinarios_acc">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="beneficio1">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                        aria-expanded="true"
                        aria-controls="collapse1"
                      >
                        1. Derecho al voto para influir en la toma de
                        decisiones.
                      </button>
                    </h2>
                    <div
                      id="collapse1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="beneficio1"
                      data-bs-parent="#beneficios_ordinarios_acc"
                    >
                      <div className="accordion-body">
                        <p>
                          Cada NFT tendrá la capacidad de emitir un voto dentro
                          del ecosistema ORDER NFT CLUB, en esta plataforma se
                          someterá al voto la toma de ciertas decisiones a
                          partir de una propuesta realizada por el equipo
                          creativo ORDER CÓMICS, estas decisiones pueden variar
                          desde la elección de nuevas líneas narrativas o
                          secuelas de la historia, hasta definir cuál será el
                          próximo producto que será puesto a la venta en las
                          ferias y/o el marketplace que tiene activo la marca.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading2">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2"
                      >
                        2. Acceso a preventas privadas de productos y nuevos
                        lanzamientos.
                      </button>
                    </h2>
                    <div
                      id="collapse2"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading2"
                      data-bs-parent="#beneficios_ordinarios_acc"
                    >
                      <div className="accordion-body">
                        <p>
                          TODO lanzamiento que realice ORDER CÓMICS se
                          presentará con antelación por medio del ecosistema
                          ORDER NFT CLUB, así mismo, se Comercializarán
                          prototipos únicos y artículos limitados del cómic
                          dentro del portal. ¡Los delegados de la orden son la
                          prioridad!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading3">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseT3"
                        aria-expanded="false"
                        aria-controls="collapseT3"
                      >
                        3. Descuento del 25% en productos y nuevos lanzamientos.
                      </button>
                    </h2>
                    <div
                      id="collapseT3"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading3"
                      data-bs-parent="#beneficios_ordinarios_acc"
                    >
                      <div className="accordion-body">
                        <p>
                          Cada holder tendrá acceso a la activación de códigos
                          de descuento al interior del ecosistema ORDER NFT
                          CLUB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading4">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse4"
                        aria-expanded="false"
                        aria-controls="collapse4"
                      >
                        4. Acceso a mercancía exclusiva.
                      </button>
                    </h2>
                    <div
                      id="collapse4"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading4"
                      data-bs-parent="#beneficios_ordinarios_acc"
                    >
                      <div className="accordion-body">
                        <p>
                          {" "}
                          ¡Cada holder podrá comprar mercancía diseñada
                          exclusivamente para los delegados del fundador! La
                          compra de estos productos exclusivos solo podrá
                          hacerse al interior del ecosistema ORDER NFT CLUB.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading5">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse5"
                        aria-expanded="false"
                        aria-controls="collapse5"
                      >
                        5. Reservas y/o descuentos en boletería para eventos en
                        los que ORDER CÓMICS tenga presencia.
                      </button>
                    </h2>
                    <div
                      id="collapse5"
                      className="accordion-collapse collapse"
                      aria-labelledby="heading5"
                      data-bs-parent="#beneficios_ordinarios_acc"
                    >
                      <div className="accordion-body">
                        <p>
                          {" "}
                          ORDER CÓMICS ofrecerá atención prioritaria y/o boletas
                          con precios especiales para que la comunidad ORDER NFT
                          CLUB pueda asistir a todos los eventos en los que se
                          presente la marca.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="tokens" className="benefics_info2 col-6">
              <div className="inner-benefics">
                <h3 className="tokens">Tokens</h3>
                <img
                  className="benefics-imgs img-fluid p-5"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FORDER_NFT_Colleccion_045.gif?alt=media&token=f855adce-9d79-43d8-96c5-2c6d44864f55"
                  alt="Token"
                />
                <h4 className="delegados">Delegados 120 USD</h4>
                {/* corregir para que estilos y se use los adecuados y no de a */}
                {/* <NavLink to="/conviertete-en-delegado" style={{display:"flex", justifyContent:"center"}}>
                  <span href="#" className="cta_small-btn">
                    ¡Conviertete en uno!
                  </span>
                </NavLink> */}
                <a href="/conviertete-en-delegado" className="cta_small-btn">
                  ¡Comprar nft!
                </a>
                {/* <img class="benefics-imgs img-fluid p-5" src="assets/img/ORDER_NFTGOLD_001.gif" /> */}
              </div>
            </div>

            <div className="benefics_info1 col-6" id="regalo">
              <div className="inner-benefics">
                <div className="nft-gift">
                  <h3>
                    <span className="nft-gift-inner-title1">Lleva un NFT</span>
                    <span className="nft-gift-inner-title2">Regalo</span>
                  </h3>
                  <form id="get_a_NFT_gift" onSubmit={handleSubmit}>
                    <input
                      id="wallet_address"
                      className="get_a-NFT-input"
                      type-="text"
                      name="wallet_address"
                      value={data.wallet_address}
                      onChange={handleChange}
                      placeholder="Dirección Wallet"
                      required
                    />
                    <input
                      id="claim_code"
                      className="get_a-NFT-input"
                      type="text"
                      name="claim_code"
                      value={data.claim_code}
                      onChange={handleChange}
                      placeholder="Código regalo"
                      required
                    />
                    <button type="submit" className="get_a-NFT-btn">
                      Reclamar NFT
                    </button>
                  </form>

                  <a href="/testNFT" className="get_a_test-NFT-btn ppal_cta">
                    ¡Lleva un NFT de prueba!
                  </a>
                  {/* <NavLink to="/testNFT">
                    <span
                      href="#"
                      className="get_a_test-NFT-btn ppal_cta mobile_text"
                    >
                      ¡Lleva un NFT de prueba!
                    </span>
                  </NavLink>  */}
                </div>
              </div>
            </div>
            <div id="tokenss" className="benefics_info2 col-6">
              <div className="inner-benefics">
                <img
                  className="benefics-imgs img-fluid p-5"
                  src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FORDER_NFTGOLD_001.gif?alt=media&token=40b536e8-0f27-470a-b3e7-28e6506f972f"
                  alt="NFT golden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROADMAP SECTION */}
      <div id="roadmap" className="roadmap_section">
        {/* <div id="particles_area"></div>  */}
        <ParcticleBackground />
        <h2 className="roadmap_title_section">Roadmap</h2>
        <div className="roadmap_timeline_wrapper">
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>Jul 2023</h4>
            </div>
            <div className="roadmap_card-info">
              <p>Activación de descuentos del 25% en productos ORDER CÓMICS.</p>
            </div>
          </div>
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>Sep 2023</h4>
            </div>
            <div className="roadmap_card-info">
              <p>
                Acceso a preventas privadas de productos y nuevos lanzamientos.
              </p>
            </div>
          </div>
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>Sep 2023</h4>
            </div>
            <div className="roadmap_card-info">
              <p>
                Reservas y/o descuentos en boletería para eventos en los que
                ORDER CÓMICS tenga presencia.
              </p>
            </div>
          </div>
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>Oct 2023</h4>
            </div>
            <div className="roadmap_card-info">
              <p>Acceso a mercancía única y exclusiva.</p>
            </div>
          </div>
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>2024</h4>
            </div>
            <div className="roadmap_card-info">
              <p>Derecho al voto para influir en la toma de decisiones.</p>
            </div>
          </div>
          <div className="roadmap_card">
            <div className="roadmap_card-title">
              <h4>2024</h4>
            </div>
            <div className="roadmap_card-info">
              <p>
                Producción de una serie animada basada en ORDER, dicha
                planificación tiene lugar en el momento que estés leyendo esto.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* FAQS SECTION */}
      <div id="faqs" className="faqs">
        <h2 className="faq-title">Faqs</h2>
        <div className="faq-body">
          <div className="accordion" id="faqs_order_acc">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq1"
                  aria-expanded="true"
                  aria-controls="collapseFaq1"
                >
                  1. ¿Qué es ser un delegado de la orden?
                </button>
              </h2>
              <div
                id="collapseFaq1"
                className="accordion-collapse collapse show"
                aria-labelledby="faq1"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Los delegados de la orden serán aquellos que tengan en su
                    poder un contrato que los certifique como tal, en este caso,
                    un NFT del ORDER NFT CLUB.
                  </p>
                  <p>
                    Como delegado, tendrás acceso al ecosistema del club
                    presentando tu NFT al ingresar, aquí, podrás disfrutar de
                    los beneficios que ORDER CÓMICS diseñó exclusivamente para
                    esta selecta comunidad.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq2"
                  aria-expanded="false"
                  aria-controls="collapseFaq2"
                >
                  2. ¿Cuántos delegados de la orden existen?
                </button>
              </h2>
              <div
                id="collapseFaq2"
                className="accordion-collapse collapse"
                aria-labelledby="faq2"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    ORDER NFT CLUB emitió una colección con 500 NFT ́S, estos son
                    un contrato inteligente con un código de identificación
                    único integrado a una ilustración de los cuadros del cómic.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq3"
                  aria-expanded="false"
                  aria-controls="collapseFaq3"
                >
                  3. ¿Cómo puedo comprar un NFT del ORDER NFT CLUB?
                </button>
              </h2>
              <div
                id="collapseFaq3"
                className="accordion-collapse collapse"
                aria-labelledby="faq3"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    La venta inicial de los NFT ́S del ORDEN NFT CLUB se
                    realizará en la página principal del ecosistema ORDER NFT
                    CLUB ingresando a el boton de compra de la colección,
                    previamente deberás crear una CryptoWallet como Metamask
                    para almacenarlo y darle el uso que desees.
                  </p>
                  <p>
                    En caso de no poder comprarlo en las etapas de su venta
                    inicial, podrás acceder a uno de ellos en el mercado
                    secundario por medio de un marketplace dispuesto para ello.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq4"
                  aria-expanded="false"
                  aria-controls="collapseFaq4"
                >
                  4. ¿Qué es una CryptoWallet?*
                </button>
              </h2>
              <div
                id="collapseFaq4"
                className="accordion-collapse collapse"
                aria-labelledby="faq4"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Las CryptoWallet son el puente que nos permite administrar
                    nuestros activos digitales en la blockchain, aquí
                    almacenamos tanto nuestras CryptoMonedas como nuestros NFT
                    ́S.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq5">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq5"
                  aria-expanded="false"
                  aria-controls="collapseFaq4"
                >
                  5. ¿Cómo crear una CryptoWallet?*
                </button>
              </h2>
              <div
                id="collapseFaq5"
                className="accordion-collapse collapse"
                aria-labelledby="faq5"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    ¡No te preocupes! Hemos realizado un video tutorial sobre
                    cómo crear una CryptoWallet para ti, este será enviado junto
                    con las instrucciones para poder recibir tu NFT a tu correo
                    electrónico una vez haya terminado la preventa pública.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq6">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq6"
                  aria-expanded="false"
                  aria-controls="collapseFaq6"
                >
                  6. ¿Cuándo será la preventa pública de la colección?*
                </button>
              </h2>
              <div
                id="collapseFaq6"
                className="accordion-collapse collapse"
                aria-labelledby="faq6"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    La preventa pública de la colección ORDER NFT CLUB se
                    realizará durante los días que transcurre la feria del libro
                    2023.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq7">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq7"
                  aria-expanded="false"
                  aria-controls="collapseFaq7"
                >
                  7. ¿Cómo puedo recibir mi NFT?
                </button>
              </h2>
              <div
                id="collapseFaq7"
                className="accordion-collapse collapse"
                aria-labelledby="faq7"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Después de crear tu CryptoWallet, deberás copiar el link de
                    su "dirección” y diligenciar en el formulario de compra para
                    que podamos realizar el envío.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq8">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq8"
                  aria-expanded="false"
                  aria-controls="collapseFaq8"
                >
                  8. ¿Cuándo vence mi NFT del ORDER NFT CLUB?
                </button>
              </h2>
              <div
                id="collapseFaq8"
                className="accordion-collapse collapse"
                aria-labelledby="faq8"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Nunca. Los tokens emitidos por el por ORDER NFT CLUB serán
                    efectivos durante la vida útil del proyecto.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq9">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq9"
                  aria-expanded="false"
                  aria-controls="collapseFaq9"
                >
                  9. ¿Puedo revender mi NFT del ORDER NFT CLUB?
                </button>
              </h2>
              <div
                id="collapseFaq9"
                className="accordion-collapse collapse"
                aria-labelledby="faq9"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Si, cada poseedor de un NFT de ORDER NFT CLUB podrá
                    revenderlo en NOVOOS MARKETPLACE. Cabe aclarar, que cada vez
                    que un NFT sea revendido ORDER CÓMICS recibirá una comisión
                    del 10% de su valor.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq10">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq10"
                  aria-expanded="false"
                  aria-controls="collapseFaq10"
                >
                  10. ¿Cual es nuestro propósito?
                </button>
              </h2>
              <div
                id="collapseFaq10"
                className="accordion-collapse collapse"
                aria-labelledby="faq10"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Queremos fortalecer nuestra relación con la comunidad. Por
                    eso, creamos un espacio en donde los delegados podrán ser
                    parte del proyecto disfrutando de beneficios exclusivos para
                    ellos y monetizar su inversión acorde a nuestro crecimiento.
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq11">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFaq11"
                  aria-expanded="false"
                  aria-controls="collapseFaq11"
                >
                  11. ¿Qué derechos estoy adquiriendo sobre dicho activo al
                  realizar la compra?*
                </button>
              </h2>
              <div
                id="collapseFaq11"
                className="accordion-collapse collapse"
                aria-labelledby="faq11"
                data-bs-parent="#faqs_order_acc"
              >
                <div className="accordion-body">
                  <p>
                    Al comprar un NFT del ORDER NFT CLUB está usted adquiriendo
                    los derechos patrimoniales sobre el mismo, esto quiere decir
                    que este activo será de su propiedad y podrá realizar lo que
                    desee con él; excepto modificarlo y/o replicarlo para su
                    distribución.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="yoyknow">¿Conoces nuestros libros?</h2>
        <div className="goto-storeBox">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2FORDERcomics_Logo_white_v001.webp?alt=media&token=56d8de07-f27d-4e2b-8b6e-93335eae5b27"
            alt="Order Comics Logo"
            className="img-fluid oc_whitebrand"
          />
          <h3>Order Cómics</h3>
          <a
            href="https://www.order-comics.com"
            className="goto_store"
            target="_blank"
          >
            Ir a tienda
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
