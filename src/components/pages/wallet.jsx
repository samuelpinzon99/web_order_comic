import { Link, useMatch, useResolvedPath, Navigate } from "react-router-dom";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";

//const { ethereum } = window;
//const provider = new ethers.providers.Web3Provider(window.ethereum);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};

const styleColeccions = {
  display: "flex",
  justifyContent: "space-between",
};

const Wallet = () => {
  const { account, balance, chainId, errorMessage, connectHandler } =
    useConnectWalletContext();

  if (chainId !== "80001") {
    return (
      <div id="hero" className="bienvenido-al-club">
        <div className="container p-10">
          <p>¡Red no soportada, cambia de red en Metamask!! 😼</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="hero" className="bienvenido-al-club">
        <div className="container p-10">
          <h1>Bienvenido delegado</h1>
          <p>¡Conecta tu billetera para poder identificarte! </p>
          {/* <!--  <a href="#" className="ppal_cta">¡Conviertete en uno!</a> --> */}

          <div id="coneectar_metamask-wrapper" className="metamask-container">
            <div className="container">
              <div
                onClick={connectHandler}
                style={{ cursor: "pointer" }}
                id="metamask-shield"
              >
                <p className="connetMasktxt">Conectar Metamask</p>
              </div>
              <div className="col-6"></div>
            </div>
          </div>
          {account && <p>Cuenta: {account}</p>}
          {account && <Navigate to="/welcome-to-club" />}
          {account && (
            <NavLink to={`/welcome-to-club`}>
              <span href="#" className="get_a_test-NFT-btn ppal_cta">
                Ver Colecciones
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;
