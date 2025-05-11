import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../lang/LanguageContext";
import { NavLink } from "react-router-dom";
import "../lang/Navbar.css"; // ملف استايلات CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
//

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
//
import { fetchData } from "../Services/api";

function Menu1(props) {
  const [data, setData] = useState({items:[]});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
//@@@@@@@
function SubMenu(menu) {
  const [subMenuStatus, setSubMenuStatus] = useState(false);
  const sub = (
    <li className="menuItem" style={{ position: "relative" }}>
      <button
        className="subMenuBtn"
        onClick={() =>
          subMenuStatus ? setSubMenuStatus(false) : setSubMenuStatus(true)
        }
      >
        <FontAwesomeIcon
          icon={subMenuStatus ? solid.faChevronUp : solid.faChevronDown}
        />
        <span>{menu.title}</span>
      </button>
      <ul
        className={"subMenu " + (language === "ar" ? "right-larg-100 ": "left-larg-100 ") + (subMenuStatus ? "open" : "close")  }
      >
        {makeUI(menu.items)}
      </ul>
    </li>
  );
  return sub;
}

function makeUI(items = data.items) {
  if(!items) return []
  const UI = items.map((item,i) => {
    if(item.hasChildren) {
      return SubMenu(item)
    } 
   return (
     <li key={i+item.code} className="menuItem">
       <NavLink
         onClick={props.handelMenu} to={item.code}
         className={({ isActive }) =>
           isActive ? "active menuItem" : "menuItem"
         }
       >
         {item.title}
       </NavLink>
     </li>
   );
  })
  return UI;
}
//@@@@@@@
  const liUI = makeUI();

  useEffect(() => {
    fetchData("cms/menus/data", {
      params: {
        name: "mainmenu",
      },
      headers: {
        "Accept-Language": "en",
      },
    })
      .then((data) => {
        setLoading(false);
        setData(data.data);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading || error) {
    liUI.push(
      <li key={"loading"}>
        Loding....
        <Skeleton containerClassName="mainMenu" 
        height={"20px"}
        width={"100px"}
        baseColor="white"
        style={{
          marginLeft:"4px"
        }}
        count={5} />
      </li>
    );
  }
  // if (error) {
  //  liUI.push(
  //    <li key={"loading"} >
  //    <div className="flex" style={{display: "flex"}}>
  //      <Skeleton height={30} width={200} style={{margin:"5px"}} count={5} />
  //    </div>
  //    </li>
  //  );
  // }
  // if (error) {
  //   //test
  //   liUI.push(
  //     <ul>
  //       <li>
  //         <NavLink
  //           to="/"
  //           className={({ isActive }) => (isActive ? "active" : "")}
  //         >
  //           Home
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink
  //           to="/about"
  //           className={({ isActive }) => (isActive ? "active" : "")}
  //         >
  //           About
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink
  //           to="/portfolio"
  //           className={({ isActive }) => (isActive ? "active" : "")}
  //         >
  //           Portfolio
  //         </NavLink>
  //       </li>
  //     </ul>
  //   );
  //   //End test
  //   liUI.push(<li key={"error"}>{error}</li>);
  // }

  return (
    <ul
      className="mainMenu"
      style={{
        display: props.isOpen ? "block" : "none",
        left: language === "ar" ? "0" : "calc(100% - 300px)",
        flexDirection: language === "ar" ? "row-reverse" : "",
      }}
     
    >
      {liUI}
    </ul>
  );
}

// export default  Menu;
export default function Menu() {
  const [menuStatus, setMenuStatus] = useState(false);
  function handelMenu() {
    menuStatus ? setMenuStatus(false) : setMenuStatus(true);
  }
  return (
    <div className="menu flex">
      <button onClick={handelMenu} className="hideStyle MainMenuBtn">
        <FontAwesomeIcon
          icon={menuStatus ? solid.faClose : solid.faNavicon}
          size="2x"
        />
      </button>

      <Menu1 isOpen={menuStatus} handelMenu={handelMenu} />
    </div>
  );
}
