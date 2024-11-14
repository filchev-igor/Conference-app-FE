import { SEASONS_OF_YEAR_IMAGES } from "./constants.ts";
import { useState } from "react";

//7

const ImagesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActiveIndexChange = (newIndex: number) => {
    if (newIndex + 1 > SEASONS_OF_YEAR_IMAGES.length) {
      setActiveIndex(0);

      return;
    }

    if (newIndex - 1 < 0) {
      setActiveIndex(SEASONS_OF_YEAR_IMAGES.length);

      return;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className={"grid place-items-center"}>
      <div id="carouselExample" className="carousel slide w-2/5">
        <div className="carousel-inner">
          {SEASONS_OF_YEAR_IMAGES.map((image, index) => (
            <div
              className={`carousel-item ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <img src={image} className="d-block w-100" alt="..." />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          onClick={() => handleActiveIndexChange(activeIndex - 1)}
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          onClick={() => handleActiveIndexChange(activeIndex + 1)}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ImagesPage;
