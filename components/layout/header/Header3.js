import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import MobileMenu from "../MobileMenu";
import { FaYoutube } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import EnglandImg from "@/public/assets/icon/lang/english.png";
import ArabicImg from "@/public/assets/icon/lang/arabic.png";
import { LanguageContext } from "@/components/translation/translationLayout";
import { FormattedMessage } from "react-intl";

export default function Header3({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  handleToggle1,
  isToggled1,
  handleToggle2,
  isToggled2,
  handleToggle3,
  isToggled3,
}) {
  const [openLang, setOpenLang] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ar"); // Default to 'ar' instead of 'en'
  const { switchLanguage } = useContext(LanguageContext);
  const closeSearch = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeSearch.current && !closeSearch.current.contains(event.target)) {
        setOpenLang(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  const toggleLangMenu = () => {
    setOpenLang((prevState) => !prevState);
  };

  const handleLanguageChange = (language) => {
    // Set language in localStorage for persistence
    localStorage.setItem("lang", language);

    // Update the `lang` attribute on the body element
    document.body.setAttribute("lang", language);

    // Call your existing functions to handle language change
    setLang(language);
    switchLanguage(language);
    setOpenLang(false);
  };

  useEffect(() => {
    // On page load, check localStorage for saved language and set it
    const savedLang = localStorage.getItem("lang") || "ar"; // Default to 'ar' if not found
    document.body.setAttribute("lang", savedLang);
    setLang(savedLang);
  }, []);

  return (
    <>
      <header id="header3" className="main-header header header-fixed ">
        {/* Header Lower */}
        <div className="top-bar" dir="ltr">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-9">
                <ul className="list-infor-topbar">
                  <li>
                    <Link href="/#">
                      <i className="icon-Group-11" />
                      <p>Hot Line: 00821076188701</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#">
                      <i className="icon-Group3" />
                      <p>Mail Us: info@alqassimcars.com</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="icon-topbar">
                  <li>
                    <a href="https://facebook.com/alqassim.cars">
                      <FaFacebookF className="text-white icon_over" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/alqassim_cars">
                      <FaTwitter className="text-white icon_over" />
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/alqassim.cars/">
                      <FaInstagram className="text-white icon_over" />
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/channel/UC8ba_qHDE8-k6qXfIbk6Jew">
                      <FaYoutube className="text-white icon_over" />
                    </a>
                  </li>
                  <li>
                    <a href="https://snapchat.com/add/alqassim.cars">
                      <FaSnapchat className="text-white icon_over" />
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/alqassim_cars">
                      <FaTelegramPlane className="text-white icon_over" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header-lower">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header-style2 flex justify-space align-center">
                  {/* Logo Box */}
                  <div className="logo-box flex">
                    <div className="logo">
                      <Link href="/">
                        <img src="/assets/images/logo/eblpng.png" alt="Logo" />
                      </Link>
                    </div>
                  </div>
                  <div className="nav-outer flex align-center">
                    {/* Main Menu */}
                    <nav className="main-menu show navbar-expand-md">
                      <div
                        className="navbar-collapse collapse clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation clearfix">
                          <li className="dropdown2 current">
                            <Link href="/">
                              <FormattedMessage id="home" />
                            </Link>
                          </li>
                          <li className="dropdown2">
                            <Link href="/car-list">
                              <FormattedMessage id="cars" />
                            </Link>
                          </li>
                          <li className="dropdown2">
                            <Link href="/about-us">
                              <FormattedMessage id="whoWeAre" />
                            </Link>
                          </li>
                          <li className="me-5">
                            <Link href="/contact-us">
                              <FormattedMessage id="contactUs" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                    {/* Main Menu End*/}
                  </div>
                  <div className=" flex align-center">
                    <div className="d-flex px-lg-0 px-5 px-md-5">
                      <div
                        className="lang-menu position-relative text-end fw-bold"
                        style={{ width: "80px" }}
                        ref={closeSearch}
                      >
                        <div
                          className="selected-lang d-flex align-items-center justify-content-end cursor-pointer"
                          role="button"
                          onClick={toggleLangMenu}
                        >
                          <img
                            src={lang === "en" ? EnglandImg.src : ArabicImg.src}
                            alt="Language"
                            className="mx-2 w-50"
                          />
                        </div>
                        <ul
                          className={`dropdown-menu position-absolute end-0 mt-2 bg-white border  rounded shadow ${
                            openLang ? "show" : ""
                          }`}
                          style={{ width: "120px" }}
                        >
                          <li
                            className="dropdown-item d-flex align-items-center cursor-pointer"
                            role="button"
                            onClick={() => handleLanguageChange("ar")}
                          >
                            <img
                              src={ArabicImg.src}
                              alt="Arabic"
                              className="mx-2 w-25"
                            />
                            <span>Arabic</span>
                          </li>
                          <li
                            className="dropdown-item d-flex align-items-center cursor-pointer"
                            role="button"
                            onClick={() => handleLanguageChange("en")}
                          >
                            <img
                              src={EnglandImg.src}
                              alt="English"
                              className="mx-2 w-25"
                            />
                            <span>English</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="header-account register ml--18">
                      <div className="flex align-center">
                        <Link href="/login" className="px-2 py-2" role="button">
                          <FormattedMessage id="login" />
                        </Link>
                      </div>
                    </div>
                    <div className="header-account flat-bt-top sc-btn-top ml--20 ">
                      <Link className="btn-icon-list" href="/car-list">
                        {lang === "ar" && (
                          <i className="icon-add-button-1 ms-3" />
                        )}
                        <span>
                          <FormattedMessage id="listYourCar" />
                        </span>
                        {lang === "en" && <i className="icon-add-button-1" />}
                      </Link>
                    </div>
                  </div>
                  <div
                    className={`mobile-nav-toggler mobile-button ${
                      lang === "ar" ? "position-left" : "position-right"
                    }`}
                    onClick={handleMobileMenu}
                  >
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        {/* Mobile Menu */}
        <div className="close-btn" onClick={handleMobileMenu}>
          <span className="icon flaticon-cancel-1" />
        </div>
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={handleMobileMenu} />
          <nav className="menu-box">
            <div className="nav-logo">
              <Link href="/">
                <img src="/assets/images/logo/eblpng.png" alt="Logo Motorx" />
              </Link>
            </div>
            <div className="bottom-canvas">
              <div className="menu-outer">
                <MobileMenu />
              </div>
              <div className="help-bar-mobie login-box">
                <Link href="/login" role="button" className={` fw-7 category`}>
                  <i className="icon-user px-3" />
                  <FormattedMessage id="login" />
                </Link>
              </div>
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
    </>
  );
}
