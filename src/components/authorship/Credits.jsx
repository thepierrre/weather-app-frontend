import { imagesCredits } from "../../utils/images/images-credits";
import { Link } from "react-router-dom";

import "./Credits.css";

const Credits = () => {
  const imagesSources = Object.keys(imagesCredits).map((key, index) => (
    <Link to={imagesCredits[key]} className="source-link" key={index}>
      <p>{key}</p>
    </Link>
  ));

  return (
    <>
      <div className="credits">
        <h3>Sources of the Images</h3>
        <div>{imagesSources}</div>
      </div>
    </>
  );
};

export default Credits;
