import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faTwitter,
    // faLinkedin,
    faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { api } from "../../Services/api.js";
import { useLanguage } from "../../lang/LanguageContext.jsx";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const [data, setData] = useState(null);
    const [menu, setMenu] = useState(null);
    const { language } = useLanguage();
    useEffect(() => {
        api.get("basic/settings/", {
            headers: {
                "Accept-Language": language
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(error => {});

        api.get("cms/menus/items", {
            params: {
                name: "testmenu"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(res => {
                setMenu(res.data.data);
            })
            .catch(error => {});
    }, [language]);
    if (!data) return null;
    function makeMenu(menu = null) {
        if (!menu) return;
        return (
            <div className="boxFooter">
                <ul className="links">
                    {menu.map((item, i) => {
                        let url = item.code;
                        if (item.type === "static-page") {
                            let s = item.url.split("/");

                            url = "static/" + s[s.length - 1];

                            //url = "static/" + m.url.split("/")[-1];
                        }
                        return (
                            <li
                                style={{
                                    textAlign:
                                        language === "en" ? "left" : "right"
                                }}
                            >
                                <NavLink to={`/${url}`}>{item.title} </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    return (
        // <!--Start Footer-->
        <div className="footer ">
            <div
                className="container containerMe"
                style={{ direction: language === "en" ? "ltr" : "rtl" }}
            >
                <div className="boxFooter">
                    <h3>
                        {data.website_name ? data.website_name : "Nano2soft"}
                    </h3>
                    <ul className="social">
                        {data.social_links
                            ? data.social_links.map((link, i) => {
                                  return (
                                      <li>
                                          <a
                                              href={link.link}
                                              className={link.name.toLowerCase()}
                                          >
                                              <i
                                                  className={
                                                      link.icon
                                                          ? link.icon
                                                          : `fab fa-${link.name.toLowerCase()}`
                                                  }
                                              ></i>
                                          </a>
                                      </li>
                                  );
                              })
                            : null}
                    </ul>
                    <p className="text">{data.meta_title}</p>
                </div>

                {menu && menu.length > 4 ? (
                    <>
                        {makeMenu(menu.slice(0, menu.length / 2))}
                        {makeMenu(menu.slice(menu.length /2))}
                    </>
                ) : (
                    makeMenu(menu)
                )}

                <div className="boxFooter">
                    <div className="line">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <div className="info">{data.address}</div>
                    </div>
                    <div className="line">
                        <i class="fa-solid fa-envelope"></i>
                        <div className="info">
                            {data.email.map((em, i) => {
                                if (em.is_show)
                                    return <span>{em.email_text} </span>;
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="line">
                        <i class="fa-solid fa-phone-volume"></i>
                        <div className="info">
                            {data.phone.map((phone, i) => {
                                if (phone.is_show)
                                    return <span>{phone.phone_number}</span>;
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Made With ❤ By Nano2soft . copyright Reserved 2025 &copy;{" "}
            </div>
        </div>
    );
};

export default Footer;
