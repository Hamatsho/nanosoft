import { NavLink } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";
//
const styleEn = {
  flexDirection: "row-reverse",
  textAlign: "right",
};

function Link(props) {
  return (
      <NavLink onClick={props.onClick} to={props.to}>
        {props.icon ? (
          <FontAwesomeIcon icon={props.icon} className="icon" />
        ) : null}
        {props.text}
      </NavLink>
  );
}

//###############################
  function Sub(props) {
      const [subMenuStatus, setSubMenuStatus] = useState(false);
    const {language } = useLanguage()
      const menu = props.items;
      return (
      
      <div className="link" style={{  }}>
        <button
          className={"subMenuBtn " + (props.isHead ? " subMenuBtnHead " : "")}
          style={language === "ar" ? styleEn : {}}
          onClick={() =>
            subMenuStatus ? setSubMenuStatus(false) : setSubMenuStatus(true)
          }
        >
          <span>
            {language === "en" &&
            menu.viewBag &&
            menu.viewBag.locale &&
            menu.viewBag.locale.en &&
            menu.viewBag.locale.en.title
              ? menu.viewBag.locale.en.title
              : menu.title}
          </span>
          <FontAwesomeIcon
            icon={subMenuStatus ? solid.faChevronUp : solid.faChevronDown}
          />
        </button>
        <ul
          className={"subMenu " + (props.isHead ? " subMenuHead " : "")}
          style={
            subMenuStatus === false
              ? { display: "none" }
              : language === "en"
              ? { borderLeft: "01px solid var(--main-color)", right:"0%" }
              : { borderRight: "01px solid var(--main-color)",left:"0%" }
          }
        >
          {props.children}
        </ul>
      </div>
    )
  }

function Menu(props) {
  const [data, setData] = useState({ items:[] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuStatus, setMenuStatus] = useState(false);
  const { language } = useLanguage();
  //@@@@@@@


  function makeUI(items = []) {
    if (!items) return [];
    const UI = items.map((item, i) => {
      if (item.items && item.items.length > 0) {
        return (
            <Sub items={item}>
             { makeUI(item.items)}
            </Sub>
        )
      }
      let to = item.code;
      if(item.type=== "static-page") {
        to = `static/${item.code}`
         let s = item.url.split("/");
         to = "static/" + s[s.length - 1];
   
        
      }
      return (
        <li key={item.code+i}>
          <NavLink
            onClick={colseMenu}
            to={to}
            className={({ isActive }) =>
              isActive ? "active menuItem" : "menuItem"
            }
          >
            {language === "en" &&
             item.viewBag &&
            item.viewBag.locale &&
            item.viewBag.locale.en &&
            item.viewBag.locale.en.title
              ? item.viewBag.locale.en.title
              : item.title}
          </NavLink>
        </li>
      );
    });
    return UI;
  }


  useEffect(() => {
    fetchData("cms/menus/data", {
      params: {
        name: "testmenu",
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
  let items = data.items ? data.items : [];
  const headItems = items.slice(0, 3);
  items = items.slice(3);
  let centerLength = items ? items.length / 2 : 0;
  let links1 = null,
    links2 = null;
  const head = headItems.map((item) => {
    if(item.items && item.items.length > 0) {
    return ( <Sub isHead= {true} items={item}>
       { makeUI(item.items)}
      </Sub>)
    }
     let to = item.code;
     if (item.type === "static-page") {
      
       to = `static/${item.code}`;
       let s = item.url.split("/");
       to = "static/"+s[s.length -1]
     
     }
    return (
      <li key={item.code}>
        <Link
          to={to}
          text={
            language === "en" &&
            item.viewBag.locale &&
            item.viewBag.locale.en &&
            item.viewBag.locale.en.title
              ? item.viewBag.locale.en.title
              : item.title
          }
          onClick={colseMenu}
        />
      </li>
    );
  });
  if (centerLength > 3) {
    links1 = makeUI(items.slice(0, centerLength));
    links2 = makeUI(items.slice(centerLength));
  } else {
    links1 = makeUI(items);
  }
  if (loading || error) {
    return (
      <span key={"loading"}>
        <Skeleton
          containerClassName="main-nav"
          height={"30px"}
          width={"100px"}
          baseColor="#eee"
          style={{
            marginBottom: "5px",
          }}
          count={3}
        />
      </span>
    );
  }

  // return [
  //   <ul className="links">{links1}</ul>,
  //   <ul className="links">{links2}</ul>,
  // ];

  function handelMenu() {
    menuStatus ? setMenuStatus(false) : setMenuStatus(true);
  }
  function colseMenu() {
    setMenuStatus(false);
  }
  return (
    <ul className="main-nav" style={language === "ar" ? styleEn : {}}>
      <li>
        <button onClick={handelMenu} className="hideStyle ">
          <FontAwesomeIcon
            icon={menuStatus ? solid.faClose : solid.faNavicon}
            size="2x"
          />
        </button>
        {/* <!--Start mega menu--> */}
        <div
          className={
            (menuStatus ? "mega-menu megaMenuOpen" : "mega-menu") +
            ` mega${language}`
          }
        >
          <div className="image">
            <img src="/imgs/nanologo.png" alt="" />
          </div>
          {/* <Menu onClick={colseMenu} /> */}
          <ul className="links">{links1}</ul>
          <ul className="links">{links2}</ul>
        </div>
        {/* <!--End mega menu--> */}
      </li>
      {head}
    </ul>
  );
}

//###############################
const Header = () => {
  const { language, setLanguage } = useLanguage();
  const toggleLanguage = (event) => {
    setLanguage(event.target.value);
  };
  //
  return (
    <header id="header" className="">
      <div
        className="container containerMe header"
        style={language === "ar" ? styleEn : {}}
      >
        <div className="logo" style={language === "ar" ? styleEn : {}}>
          <a
            href="main"
            className="logo"
            style={language === "ar" ? styleEn : {}}
          >
            <img src="/imgs/nanologo.png" alt="nano" />
            <div className="name">
              <p>نانو 2 سوفت</p>
              <p>Nano2soft</p>
            </div>
          </a>
          <div className="flex langParent">
            <select className="lang" onChange={toggleLanguage}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
