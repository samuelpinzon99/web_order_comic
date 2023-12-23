import React, { useEffect, useState } from "react";
import "./scrollTop.css";

export function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="top-to-btm" >
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="icon-position back-to-top"
          type="button"
        ></button>
      )}
    </div>
  );
}
