import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";
import ReactPlayer from "react-player";

export default function Watch() {
  const location = useLocation();
  console.log(location);
  const movie = location.state;
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <ReactPlayer
        width="100%"
        height="100%"
        autoplay
        className="video"
        url={movie.video}
        controls={true}
      />
      {/* <video className="video" autoPlay progress controls src={movie.video} /> */}
    </div>
  );
}
