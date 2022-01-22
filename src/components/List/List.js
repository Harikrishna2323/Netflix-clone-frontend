import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useRef, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import ListItem from "../listItem/ListItem";
import "./list.scss";

// export default function List({ list }) {
//   const { user } = useContext(AuthContext);
//   const [isMoved, setIsMoved] = useState(false);
//   const [slideNumber, setSlideNumber] = useState(0);
//   const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
//   const [lists, setLists] = useState([]);

//   useEffect(() => {
//     const getLists = async () => {
//       const { data } = await axios.get("/api/lists", {
//         headers: {
//           token: "Bearer " + user.token,
//         },
//       });
//       console.log("lists:", data);
//       setLists(data);
//     };
//     getLists();
//   }, []);
//   console.log("lists: ", lists);

//   const listRef = useRef();

// const handleClick = (direction) => {
//   setIsMoved(true);
//   let distance = listRef.current.getBoundingClientRect().x - 50;
//   if (direction === "left" && slideNumber > 0) {
//     setSlideNumber(slideNumber - 1);
//     listRef.current.style.transform = `translateX(${230 + distance}px)`;
//   }
//   if (direction === "right" && slideNumber < 10 - clickLimit) {
//     setSlideNumber(slideNumber + 1);
//     listRef.current.style.transform = `translateX(${-230 + distance}px)`;
//   }
// };

//   return (
//     <div className="list">
//       {lists.map((actualList, i) => (
//         <>
//           <span className="listTitle">{actualList.title}</span>
//           <div className="wrapper">
//             <ArrowBackIosOutlined
//               className="sliderArrow left"
//               onClick={() => handleClick("left")}
//               style={{ display: !isMoved && "none" }}
//             />
//             <div className="container" ref={listRef}>
//               {actualList.content.map((item, i) => {
//                 return <ListItem index={i} item={item} />;
//               })}
//               <ArrowForwardIosOutlined
//                 className="sliderArrow right"
//                 onClick={() => handleClick("right")}
//               />
//             </div>
//           </div>
//         </>
//       ))}
//     </div>
//   );
// }

export default function List({ list }) {
  const { user } = useContext(AuthContext);
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  useEffect(() => {
    const getLists = async () => {
      const { data } = await axios.get(
        "https://netflix-clone-hkb.herokuapp.com/api/lists",
        {
          headers: {
            token: "Bearer " + user.token,
          },
        }
      );
      console.log("lists:", data);
    };
    getLists();
  }, []);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
