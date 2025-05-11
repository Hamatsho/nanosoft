import "./App.css";
// import "./index.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
//import Adverts from "./Layout/Adverts";
import { LanguageProvider } from "./lang/LanguageContext";
import Home from "./pages/Home/Home.js";
import Contact from "./pages/Contact/";
import Form from "./pages/Form/";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    
    
} from "react-router-dom";
// import Home from './Home';
import About from "./components/pages/About";
import Footer from "./Layout/Footer";
//import Contact from "./Layout/Contact";
import Header from "./Layout/Header";
//import Posts from "./Posts";
//import Stats from "./Layout/Stats";
import Gallery from "./Layout/Gallery/Gallery";
//import GalleryPage from "./components/pages/Gallery";
import Albums from "./Layout/Albums";
//import Title from "./components/Title";
import Faq from "./pages/Faq";
//import Associates from "./Layout/Associates";
import File from "./pages/Files";
import Vids from "./pages/vids/Vids";
import Page from "./components/page";
import Projects from "./pages/Projects";
import More from "./pages/More";
import CircularMenu from "./components/CircularMenu";
import Swip from "./Layout/Swip";
import Features from "./Layout/Features";
//import CardPhone from "./components/Product";
//import Card2 from "./components/Card2";
//import CardAnimate from "./components/CardAnimate";
import Products from "./pages/Products";
import ProductDetails from "./pages/Products/ProductDetails";

//
function App() {
    return (
        <LanguageProvider>
            <Router>
                <Header />
                <div style={{ height: "110px" }}></div>
                <div className="containerMe"></div>
                <CircularMenu />
                <Routes>
                    <Route
                        path="/shop/:reftype"
                        element={<Products ref="products" />}
                    />
                    <Route
                        path="/services"
                        element={<Products reftype="services" />}
                    />
                    <Route
                        path="/shop/:reftype/:id"
                        element={<ProductDetails />}
                    />
                    <Route path="/services/:id" element={<ProductDetails />} />
                    <Route path="/videos" element={<Vids />} />
                    <Route path="/files" element={<File />} />
                    {/* <Route path="/" element={<Associates />} /> */}
                    <Route path="/main" element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faq" element={<Faq />} />
                    {/* <Route path="/portfolio" element={<Portfolio />} /> */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/gallery" element={<Albums />} />
                    //for all categories in webbasic
                    <Route path="/:cat" element={<Projects />} />
                    <Route path="/:cat/:id" element={<More />} />
                    <Route path="/static/:code" element={<Page />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
                {/* <Stats /> */}

                <Footer />
            </Router>
        </LanguageProvider>
    );
    // return (
    //   <div>
    //     <LanguageProvider>
    //       <Header />
    //       <div className="page">
    //         <Adverts />
    //       </div>
    //       <Home />
    //       <Settings />
    //     </LanguageProvider>
    //   </div>
    // );
}

export default App;
