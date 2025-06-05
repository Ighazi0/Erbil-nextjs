import Link from "next/link";
import Menu from "../Menu";
import MobileMenu from "../MobileMenu";

import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "@/components/translation/translationLayout";
import { FormattedMessage } from "react-intl";
import { auth, db } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

export default function Header1({ scroll, handleMobileMenu }) {
  const [openLang, setOpenLang] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ar");
  const [codes, setCodes] = useState([
    { code: "AED", rate: 1 },
    { code: "USD", rate: 0.27 },
    { code: "IQD", rate: 355.91 },
  ]);
  const { switchLanguage, switchCode, code } = useContext(LanguageContext);
  const closeCode = useRef(null);
  const closeSearch = useRef(null);
  const userMenuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const getCodes = async () => {
      try {
        const appSnapshot = await getDocs(collection(db, "appData"));
        const appData = appSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCodes(appData[0]["currencies"]);
      } catch (error) {
        console.error("Error fetching types:", error);
        // showSnackbar(intl.formatMessage({ id: 'error_fetching_types' }), 'error');
      } finally {
        // setIsLoading(false);
      }
    };
    getCodes();
  }, []);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeCode.current && !closeCode.current.contains(event.target)) {
        setOpenCode(false);
      }
      if (closeSearch.current && !closeSearch.current.contains(event.target)) {
        setOpenLang(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
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

  const toggleCodeMenu = () => {
    setOpenCode((prevState) => !prevState);
  };

  const toggleUserMenu = () => {
    setOpenUserMenu((prevState) => !prevState);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("lang", language);
    document.body.setAttribute("lang", language);
    setLang(language);
    switchLanguage(language);
    setOpenLang(false);
  };

  const handleCodeChange = (newCode, newRate) => {
    localStorage.setItem("code", newCode);
    localStorage.setItem("rate", newRate);
    switchCode(newCode, newRate);
    setOpenCode(false);
  };

  const handleLogout = async () => {
    try {
      await Logout();
      // Delete session
      await fetch("/api/auth/session", { method: "DELETE" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    document.body.setAttribute("lang", savedLang);
    setLang(savedLang);
  }, []);

  return (
    <>
      <header
        id="header"
        className={`main-header header header-fixed  ${
          scroll ? "is-fixed is-small" : ""
        }`}
      >
        <div className="header-lower">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-lg">
                <div className="header-style2 inner-container flex justify-space align-center">
                  <div className="logo-box flex">
                    <div className="logo">
                      <Link href="/">
                        <img src="/assets/images/logo/eblpng.png" alt="Logo" />
                      </Link>
                    </div>
                  </div>
                  <div className="nav-outer flex align-center">
                    <nav className="main-menu show navbar-expand-md">
                      <div
                        className="navbar-collapse collapse clearfix"
                        id="navbarSupportedContent"
                      >
                        <Menu lang={lang} />
                      </div>
                    </nav>
                  </div>
                  <div className="flex align-center">
                    <div className="d-flex px-lg-0">
                      <div
                        className="lang-menu position-relative text-center fw-bold"
                        style={{ width: "40px" }}
                        ref={closeCode}
                      >
                        <div
                          className="selected-lang d-flex align-items-center justify-content-end cursor-pointer"
                          role="button"
                          onClick={toggleCodeMenu}
                        >
                          <span>{code}</span>
                        </div>
                        <ul
                          className={`dropdown-menu position-absolute end-0 mt-2 bg-white border rounded shadow ${
                            openCode ? "show" : ""
                          }`}
                          style={{ width: "120px" }}
                        >
                          {codes.map((e) => (
                            <li
                              className="dropdown-item d-flex align-items-center cursor-pointer"
                              role="button"
                              onClick={() => handleCodeChange(e.code, e.rate)}
                            >
                              <span>{e.code}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div
                      className="d-flex px-lg-0 px-md-5"
                      style={{ paddingRight: "3rem" }}
                    >
                      <div
                        className="lang-menu position-relative text-center fw-bold"
                        style={{ width: "40px" }}
                        ref={closeSearch}
                      >
                        <div
                          className="selected-lang d-flex align-items-center justify-content-end cursor-pointer"
                          role="button"
                          onClick={toggleLangMenu}
                        >
                          <span>{lang.toUpperCase()}</span>
                        </div>
                        <ul
                          className={`dropdown-menu position-absolute end-0 mt-2 bg-white border rounded shadow ${
                            openLang ? "show" : ""
                          }`}
                          style={{ width: "120px" }}
                        >
                          <li
                            className="dropdown-item d-flex align-items-center cursor-pointer"
                            role="button"
                            onClick={() => handleLanguageChange("ar")}
                          >
                            <span>Arabic</span>
                          </li>
                          <li
                            className="dropdown-item d-flex align-items-center cursor-pointer"
                            role="button"
                            onClick={() => handleLanguageChange("en")}
                          >
                            <span>English</span>
                          </li>
                          <li
                            className="dropdown-item d-flex align-items-center cursor-pointer"
                            role="button"
                            onClick={() => handleLanguageChange("kr")}
                          >
                            <span>Kurd</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {user ? (
                      <div
                        className="header-account register ml--18"
                        ref={userMenuRef}
                      >
                        <div className="flex align-center position-relative">
                          <button
                            onClick={toggleUserMenu}
                            className="btn btn-link text-decoration-none d-flex align-items-center gap-2"
                          >
                            <i className="icon-user" />
                            <span>{user.email}</span>
                          </button>
                          <ul
                            className={`dropdown-menu position-absolute end-0 mt-2 bg-white border rounded shadow ${
                              openUserMenu ? "show" : ""
                            }`}
                            style={{ width: "200px", top: "100%" }}
                          >
                            <li>
                              <Link href="/orders" className="dropdown-item">
                                <i className="icon-calendar me-2" />
                                <FormattedMessage id="my_orders" />
                              </Link>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                className="dropdown-item text-danger"
                              >
                                <i className="icon-logout me-2" />
                                <FormattedMessage id="logout" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="header-account register ml--18">
                        <div className="flex align-center">
                          <Link
                            href="/login"
                            className="px-2 py-2"
                            role="button"
                          >
                            <FormattedMessage id="login" />
                          </Link>
                        </div>
                      </div>
                    )}
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
              <MobileMenu />
              {!user ? (
                <div className="help-bar-mobie login-box pt-2">
                  <Link href="/login" role="button" className="fw-7 category">
                    <i className="icon-user ps-2" />
                    <FormattedMessage id="login" />
                  </Link>
                </div>
              ) : (
                <div className="help-bar-mobie login-box pt-2">
                  <button
                    onClick={handleLogout}
                    className="fw-7 category border-0 bg-transparent"
                  >
                    <i className="icon-logout ps-2" />
                    <FormattedMessage id="logout" />
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
