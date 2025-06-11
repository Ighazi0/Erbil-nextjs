"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import image from "@/public/assets/images/slide/car.png";
import { FormattedMessage, useIntl } from "react-intl";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Register } from "@/services/authService";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

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
      attributeFilter: ["dir"],
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Register(email, password, {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      });
      router.push("/");
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="register signUp">
          <div className="d-lg-flex half">
            <div className="bg order-1 order-md-2 d-flex justify-content-center align-items-center">
              <img
                src={image.src}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div className="contents order-2 order-md-1 my-5">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7">
                    <h3 className="my-3">
                      <FormattedMessage id="Welcome To Erbil" />
                    </h3>
                    <p className="mb-4 fs-5 fw-medium text-secondary">
                      <FormattedMessage id="Sign in to your account to" />{" "}
                      <span className="text-primary fw-bold">
                        <FormattedMessage id="start the adventure" />
                      </span>
                      .
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="register-form grid gap-6 grid-cols-1 md:grid-cols-2"
                    >
                      {/* First Name */}
                      <div className="form-group first">
                        <label htmlFor="name_ar">
                          <FormattedMessage id="First Name" />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter your first name",
                          })}
                          id="name_ar"
                          name="name_ar"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="form-group first">
                        <label htmlFor="name_en">
                          <FormattedMessage id="Last name" />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter your last name",
                          })}
                          id="name_en"
                          name="name_en"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Phone (still uncontrolled, add state if you want) */}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          id="phone"
                          name="phone"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="form-group first">
                        <label htmlFor="email">
                          <FormattedMessage id="Email" />
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter your email",
                          })}
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      {/* Password */}
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
                              id: "enter_password",
                            })}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        {isLoading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <FormattedMessage id="Sign Up" />
                        )}
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
