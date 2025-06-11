"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import image from "@/public/assets/images/slide/car.png";
import { FormattedMessage, useIntl } from "react-intl";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Login } from "@/services/authService";
import { CircularProgress } from "@mui/material";
import {
  SnackbarProvider,
  useSnackbarContext,
} from "@/contexts/SnackbarContext";

const Layout = dynamic(() => import("@/components/layout/Layout"), {
  ssr: false,
});

function LoginForm({
  onSubmit,
  isLoading,
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  isRTL,
}) {
  const intl = useIntl();

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group first">
        <label htmlFor="email">
          <FormattedMessage id="Email" />
        </label>
        <input
          type="email"
          className="form-control"
          placeholder={intl.formatMessage({ id: "Enter Email Address" })}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
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
            placeholder={intl.formatMessage({ id: "enter_password" })}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              [!isRTL ? "right" : "left"]: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: "20px",
              color: "#6c757d",
              width: "fit-content",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="d-flex mb-5 align-items-center justify-content-between py-3">
        <span className="ml-auto">
          <Link href="/forgot-password">
            <FormattedMessage id="Forgot Password" />
          </Link>
        </span>
      </div>

      <button
        type="submit"
        className="btn btn-block btn-primary w-100"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <FormattedMessage id="Sign In" />
        )}
      </button>
    </form>
  );
}

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { showSnackbar } = useSnackbarContext();
  const intl = useIntl();

  if (typeof window !== "undefined") {
    const dir = document.documentElement.dir === "rtl";
    if (isRTL !== dir) {
      setIsRTL(dir);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { role } = await Login(formData.email, formData.password);
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      showSnackbar(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register loginIn">
      <div className="d-lg-flex half">
        <div className="bg order-1 order-md-2 d-flex justify-content-center align-items-center">
          <img
            src={image.src}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 my-5">
                <h3 className="mb-4">
                  <FormattedMessage id="Welcome Back" />
                </h3>
                <p className="mb-5">
                  <FormattedMessage id="sign in to your account and start the adventure" />
                </p>

                <LoginForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  formData={formData}
                  handleChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isRTL={isRTL}
                />

                <p className="mt-5 text-center">
                  <FormattedMessage id="Dont have an account?" />
                  <Link className="mx-1" href="/register">
                    <FormattedMessage id="Sign Up" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <SnackbarProvider>
        <LoginContent />
      </SnackbarProvider>
    </Layout>
  );
}
