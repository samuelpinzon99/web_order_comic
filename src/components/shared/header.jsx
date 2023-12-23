import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { useConnectWalletContext } from "../../context/ConnectWalletContext";
import { useEffect, useRef, useState } from "react";
const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return <Link {...props} className={match ? "active" : "non-active"} />;
};

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const { account, discconect } = useConnectWalletContext();
  const navigate = useNavigate();

  const redirectHome = () => {
    discconect();
    navigate("/");
  };

  //----------ocultar menu------------------------------
  const navbarRef = useRef(null);
  const navUl = useRef(null);

  // Función para ocultar menu cuando se hace clic fuera de él
  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      const navbarToggle = document.querySelector(".navbar-toggler");
      const navbarMenu = document.querySelector(".navbar-collapse");

      if (navbarToggle && navbarMenu) {
        if (navbarMenu.classList.contains("show")) {
          navbarToggle.click(); // Hide the navbar menu
        }
      }

    }
    if (navUl.current && !navUl.current.contains(event.target)) {
      const navbarToggle = document.querySelector(".navbar-toggler");
      const navbarMenu = document.querySelector(".navbar-collapse");
      const navItem = document.querySelector(".nav-item");

      if (navItem) {
        if (navbarMenu.classList.contains("show")) {
          console.log("cliick")
          navbarToggle.click(); // Hide the navbar menu
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  //---------------- header sticky-------------------
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  return (
    <header
      id="header"
      className={`header fixed-top py-1 mb-2 ${sticky ? "ordersticky" : ""}`}
    >
      <nav className="navbar navbar-expand-lg py-0 navbar-dark" ref={navbarRef}>
        <div className="container d-flex flex-wrap justify-content-between justify-content-sm-between">
          <NavLink to="/">
            <span className="navbar-brand" href="#">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nft-collection-e23b5.appspot.com/o/Nuevo%20Dise%C3%B1o%2Forder-ntf-club-brand.webp?alt=media&token=33ccde02-06a2-4682-abe7-8fe64013022e"
                alt="Order NFT Club"
                className="brand-logo"
                height="70px"
              />
            </span>
          </NavLink>

          <NavLink to="/wallet">
            <span className="mobile_delegados featured_cta" href="#">
              AUTENTICAR NFT
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse justify-content-end `}
            id="navbarNav"
          >
            <ul className={`navbar-nav`}>
              <li    ref={navUl} className="nav-item">
                {/* <a className="nav-link" href="/#beneficios">
                  Beneficios
                </a> */}
                <a href="/#beneficios" className="nav-link">
                  Beneficios
                </a>

                {/* <NavLink to="/#beneficios">
                  <span className="nav-link">Beneficios</span>
                </NavLink> */}
              </li>
              <li ref={navUl} className="nav-item">
                <a className="nav-link" href="/#regalo">
                  Regalo
                </a>
              </li>
              <li ref={navUl} className="nav-item">
                <a className="nav-link" href="/#roadmap">
                  Roadmap
                </a>
              </li>
              <li ref={navUl} className="nav-item">
                <a className="nav-link" href="/#faqs">
                  Faqs
                </a>
              </li>
              {account && (
                <li ref={navUl} className="nav-item">
                  <a href="/welcome-to-club" className="nav-link">
                  Autenticar nft
                  </a>
                  {/* <NavLink to="/welcome-to-club">
                    <span className="nav-link" href="#">
                      Delegados
                    </span>
                  </NavLink> */}
                </li>
              )}
              <li className="nav-item featured_cta">
                {account ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={redirectHome}
                    className="nav-link"
                    href="#"
                  >
                    Desconectar
                  </span>
                ) : (
                  <NavLink to="/wallet">
                    <span className="nav-link" href="#">
                      AUTENTICAR NFT
                    </span>
                  </NavLink>
                  // <a href="/wallet" className="nav-link">Delegados</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
