"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import image from "@/public/assets/images/page/register.jpg";
import { FormattedMessage, useIntl } from "react-intl";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Register } from "@/services/authService";
export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const intl = useIntl();
      const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

    useEffect(() => {
      const updateDirection = () => {
        const dir = document.documentElement.dir === "rtl";
        setIsRTL(dir);
      };
  
      updateDirection();
  
      const mutationObserver = new MutationObserver(() => {
        updateDirection();
      });
  
      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dir'],
      });
  
      return () => {
        mutationObserver.disconnect();
      };
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Register('test@test.test', 'Test$123')
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="register signUp">
          <div className="d-lg-flex half">
            <div
              className="bg order-1 order-md-2"
              style={{
                backgroundImage: `url('${image.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="contents order-2 order-md-1 my-5">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7">
                    <h3 className="my-3">
                      <FormattedMessage id="Welcome To Erbil" />
                    </h3>
                    <p class="mb-4 fs-5 fw-medium text-secondary">
                      <FormattedMessage id="Sign in to your account to" />{" "}
                      <span class="text-primary fw-bold">
                        {" "}
                        <FormattedMessage id="start the adventure" />
                      </span>
                      .
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="register-form grid gap-6 grid-cols-1 md:grid-cols-2"
                    >
                      <div className="form-group first">
                        <label htmlFor="name_ar">
                          <FormattedMessage id="Name Arabic" />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter your name arabic",
                          })}
                          id="name_ar"
                          name="name_ar"
                          required
                        />
                      </div>
                      <div className="form-group first">
                        <label htmlFor="name_en">
                          <FormattedMessage id="Name English" />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter your name english",
                          })}
                          id="name_en"
                          name="name_en"
                          required
                        />
                      </div>
                     
                      <div className="form-group first">
                        <label htmlFor="phone">
                          <FormattedMessage id="Phone" />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter Phone Number",
                          })}
                          id="phone"
                          name="phone"
                          required
                        />
                      </div>
                  
                      <div className="form-group last mb-3">
                        <label htmlFor="password">
                          <FormattedMessage id="Password" />
                        </label>
                        <div
                          className="password-input-wrapper"
                          style={{ position: "relative" }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder={intl.formatMessage({
                              id: "Enter Password Address",
                            })}
                            id="password"
                            name="password"
                            required
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              [!isRTL ? "right" : "left"]: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "#6c757d",
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>

                      <div className="form-group last mb-3">
                        <label htmlFor="password">
                          <FormattedMessage id="Confirm Password" />
                        </label>
                        <div
                          className="password-input-wrapper"
                          style={{ position: "relative" }}
                        >
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder={intl.formatMessage({
                              id: "Confirm Your Password",
                            })}
                            id="password"
                            name="password"
                            required
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            style={{
                              position: "absolute",
                              [!isRTL ? "right" : "left"]: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              fontSize: "20px",
                              color: "#6c757d",
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-block btn-primary w-100"
                      >
                        <FormattedMessage id="Sign Up" />
                      </button>
                    </form>

                    <p className="mt-3">
                      <FormattedMessage id="Already have an account?" />
                      <Link className="mx-1" href="/login">
                        <FormattedMessage id="Sign In" />
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
