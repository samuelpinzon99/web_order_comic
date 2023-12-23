import { useCallback, useEffect, useState } from "react";
import "./tabs.css";
import { useParams } from "react-router-dom";

const SCHEMA = "ORDERTEST";
const API_LINK = process.env.REACT_APP_API_LINK;


function CardCombos({ item }) {
  //src="https://i.imgur.com/QpjAiHq.jpg"
  return (
    <div className="row w-100 p-3 nft-card">
      <div className="col-12 col-sm-9 col-md-9 d-flex mb-3 mb-sm-0 flex-column flex-sm-row nft-card-img-container">
        <img
          className="img-fluid img-responsive rounded product-image"
          src={item.urlFile}
          alt={item.name}
        />

        <div className="nft-card-info">
          <p className="benefit-card-title">{item.name}</p>
          <p
            className="text-justify para mb-0 benefit-card-description">
            {item.description}
          </p>
        </div>

      </div>

      <div className="d-flex flex-column align-items-center justify-content-center col-sm-3 col-md-3 border-left">
        <div className="">
          <p className="monetary-value">${item.price}</p>
        </div>
        <div className="">
          <button className="btn btn-primary btn-sm" type="button">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function AccordionCategory({ menu, category, id }) {
  const filter = menu.filter((item) => item.category === category);

  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`flush-heading${id}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse${id}`}
            aria-expanded="false"
            aria-controls={`flush-collapse${id}`}
          >
            {category.toUpperCase()}
          </button>
        </h2>
        <div
          id={`flush-collapse${id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`flush-heading${id}`}
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <div className="d-flex justify-content-center row">
              <div className="col-md-12">
                {filter &&
                  filter.map((item) => (
                    <div className="d-flex justify-content-center mb-2" key={item.id}>
                      <CardCombos item={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Menu() {
  const { collectionId } = useParams();
  const contract = collectionId;
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const getActiveMenuCollection = async () => {
    const TYPE_BENEFI = "menu";
    const options = { method: "GET", headers: { accept: "application/json" } };
    const url = `${API_LINK}/beneficios-type/${SCHEMA}/${contract}/${TYPE_BENEFI}`;
    try {
      setLoading(true);
      const response = await fetch(url, options);

      if (response.ok) {
        const res = await response.json();
        setMenu(res);
        setLoading(false);
      } else {
        console.log("Respuesta de red OK pero respuesta de HTTP no OK");
        setLoading(false);
      }
    } catch (error) {
      console.log("Hubo un problema con la petición await:" + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("componte menu");
    getActiveMenuCollection();
  }, []);

  const categories = [
    { id: 1, name: "entradas" },
    { id: 2, name: "desayunos" },
    { id: 3, name: "sopas" },
  ];

  return (
    <>
      {loading ? (
        <p className="loading">Cargando...</p>
      ) : (
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {categories &&
            categories.map((item) => (
              <div key={item.id}>
                <AccordionCategory
                  menu={menu}
                  category={item.name}
                  id={item.id}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}

function Combo() {
  const { collectionId } = useParams();
  const contract = collectionId;
  const [combo, setCombo] = useState(false);
  const [loading, setLoading] = useState(true);

  const getActiveComboCollection = useCallback(async () => {
    const TYPE_BENEFI = "combo";
    const options = { method: "GET", headers: { accept: "application/json" } };
    const url = `${API_LINK}/beneficios-type/${SCHEMA}/${contract}/${TYPE_BENEFI}`;
    try {
      setLoading(true);
      const response = await fetch(url, options);

      if (response.ok) {
        const res = await response.json();
        setCombo(res);
        setLoading(false);
      } else {
        console.log("Respuesta de red OK pero respuesta de HTTP no OK");
        setLoading(false);
      }
    } catch (error) {
      console.log("Hubo un problema con la petición await:" + error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getActiveComboCollection();
    console.log("componte combo");
  }, [getActiveComboCollection]);

  return (
    <>
      {/* {console.log("combo", combo)} */}
      {loading ? (
        <p className="loading">Cargando ...</p>
      ) : (
        <div className="w-100">
          <div className="col-md-12">
            {combo &&
              combo.map((item) => (
                <div className="d-flex justify-content-center" key={item.id}>
                  <CardCombos item={item} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export function Tabs() {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  // const downlandFile = async () => {
  //   const options = { method: "GET", headers: { accept: "image/png" } };
  //   const imageUrl = `${API_LINK}/download/${SCHEMA}/${contract}-menu.pdf`;
  //   try {
  //     const response = await fetch(imageUrl, options);

  //     if (response.ok) {
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "menu.pdf";
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     } else {
  //       console.log("Respuesta de red OK pero respuesta de HTTP no OK");
  //     }
  //   } catch (error) {
  //     console.log("Hubo un problema con la petición await:" + error.message);
  //   }
  // };

  return (
    <div className="w-100 d-flex flex-column">
      <ul className="tabs">
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleTabClick(1)}
        >
          Menu
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleTabClick(2)}
        >
          Combos{" "}
        </li>
        <div className="line"></div>
      </ul>
      <div className="tabs-content d-flex">
        {activeTab === 1 && (
          <div className="tab_panel w-100">
            <Menu />
          </div>
        )}
        {activeTab === 2 && (
          <div className="tab_panel w-100">
            <Combo />
          </div>
        )}
      </div>
    </div>
  );
}
