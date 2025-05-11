import { useEffect, useState, useRef } from "react";
import MySwiper from "../../components/MySwiper";
import { useLanguage } from "../../lang/LanguageContext";
import "./associates.css";
import { SwiperSlide } from "swiper/react";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";

// #########################

const isRTL = false;
const direction = isRTL ? "rtl" : " ltr";

const AutoScrollContainer = ({ children }) => {
    const containerRef = useRef(null);
    const itemWidth = 300;
    // تحديد الاتجاه بناءً على اللغة
    useEffect(() => {
        const container = containerRef.current;
        let scrollAmount = container.scrollLeft;
        const autoScroll = () => {
            let scrollAmount = container.scrollLeft;
            if (container) {
                scrollAmount += itemWidth;
                if (
                    scrollAmount >=
                    container.scrollWidth - container.clientWidth
                ) {
                    scrollAmount = 0; // الرجوع للبداية عند الوصول للنهاية
                }
                container.scrollLeft = isRTL ? -scrollAmount : scrollAmount; // تحديد الاتجاه بناءً على اللغة
            }
        };

        const interval = setInterval(autoScroll, 4000);

        return () => clearInterval(interval); // تنظيف المؤقت عند إلغاء تحميل المكون
    }, [isRTL]); // إعادة التحديث عند تغيير اللغة

    return (
        <div
            ref={containerRef}
            className="associates containerMe"
            style={styles.container}
        >
            {children}
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        display: "flex",
        overflowX: "scroll",
        scrollBehavior: "smooth",
        whiteSpace: "nowrap",
        direction: direction // الحفاظ على ltr لكن التحكم في scrollLeft
    },
    item: {
        minWidth: "300px",
        height: "200px",
        backgroundColor: "lightblue",
        margin: "5px",
        textAlign: "center",
        lineHeight: "200px",
        fontSize: "24px"
    }
};

function Associates(props) {
    const { language } = useLanguage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let ui = data.map((el, i) => {
        return (
            <SwiperSlide key={i}>
                <div className="box" style={{}}>
                    <img src={el.image.original} alt={el.name} />
                </div>
            </SwiperSlide>
        );
    });
    useEffect(() => {
        setLoading(true);
        fetchData(`webbasic/associates/`, {
            params: {
                // reftype:"projemmct"
            },
            headers: {
                "Accept-Language": language
            }
        })
            .then(data => {
                setData(data.data);
                console.log(data, "associates");

                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [language]);

    if (loading) {
        ui = <Skeleton key={"23"} height={"300px"} width={"100%"} />;
        // return <span>Loading...</span>
    }
    if (error) {
        ui = <Skeleton key={"20"} height={"300px"} width={"100%"} />;
    }
    return (
        <div className="" style={{ backgroundColor: "white" }}>
            {
                //<AutoScrollContainer>
                //{
                //data.map((el, i) => {
                //           return (
                //               <div className="box" style={{}}>
                //                   <img
                //                       src={el.image.original}
                //                       alt={el.name}
                //                       width="100px"
                //                   />
                //               </div>
                //           );
                //       })}
                //   </AutoScrollContainer>
            }

            <div className="containerMe associates">
                <MySwiper
                    breakPoints={{
                        0: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        992: {
                            slidesPerView: 4
                        },
                        1024: {
                            slidesPerView: 5
                        }
                    }}
                >
                    {ui}
                </MySwiper>
            </div>
        </div>
    );
}

export default Associates;
