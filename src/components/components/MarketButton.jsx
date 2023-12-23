import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./marketButton.css";

export function MarketButton() {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);

  return (
    <div className="top-to-btm">
      {showBtn && (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to="https://marketplace.novoos.co/"
        >
          {" "}
          <button
          className="to-top"
          >
            
          </button>
        </Link>
      )}
    </div>
  );
}
