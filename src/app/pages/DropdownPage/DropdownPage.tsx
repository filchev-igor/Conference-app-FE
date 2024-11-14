import { SEASONS_OF_YEAR_IMAGES } from "../ImagesPage/constants.ts";
import { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PATH_NAMES } from "../../modules/router/constants.ts";
import BouncingBall from "./BouncingBall.tsx";
import PulsatingColorBox from "./PulsatingColorBox.tsx";

const DropdownPage = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(PATH_NAMES.imagesPage);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const button = document.getElementById("kebab");

      if (button) {
        const handleButtonClick = () => {
          const text = document.getElementById("text");
          if (text) {
            text.innerHTML = "5555";
          }
        };

        const handleButtonHover = () => {
          toast.success("Hi!");
        };

        // Attach the event listener
        button.addEventListener("click", handleButtonClick);
        button.addEventListener("mouseup", handleButtonHover);

        // Clear the interval since the button is found
        clearInterval(intervalId);

        // Cleanup function to remove the event listener on unmount
        return () => {
          button.removeEventListener("click", handleButtonClick);
          button.removeEventListener("mouseup", handleButtonHover);
        };
      }
    }, 100); // Check every 100 milliseconds

    // Cleanup interval if the component unmounts before the button is found
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={"d-grid place-items-center gap-3"}>
      <div className="dropdown">
        <button
          className="btn btn-danger dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>

      <div className="card w-2/5">
        <img
          src={SEASONS_OF_YEAR_IMAGES[0]}
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>

      <button type="button" className="btn btn-primary" id="kebab">
        Primary
      </button>

      <div id={"text"} className={"w-3/5"}></div>

      <form onSubmit={handleFormSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="firstName"
            id="firstName"
            placeholder="Jack"
            required
          />
          <label htmlFor="firstName">First name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="lastName"
            id="lastName"
            placeholder="London"
            required
          />
          <label htmlFor="lastName">Last name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            className="form-control"
            name="foodSelection"
            id="foodSelection"
            placeholder="Bread"
            required
          />
          <label htmlFor="foodSelection">Food selection</label>
        </div>

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>

      <BouncingBall />

      <PulsatingColorBox />
    </div>
  );
};

export default DropdownPage;
