"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import image from "@/public/assets/images/page/Reset-Password.jpg";
import { FormattedMessage, useIntl } from "react-intl";
export default function Home() {
  const intl = useIntl();
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="register forgot-password ">
          <div className="d-lg-flex half">
            <div
              className="bg order-1 order-md-2"
              style={{
                backgroundImage: `url('${image.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="contents order-2 order-md-1">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 my-5">
                    <h3 className="mb-4">
                      <FormattedMessage id="Reset Password" />
                    </h3>
                    <p className="mb-5">
                      <FormattedMessage id="If you forgot your password, you can reset it here" />
                    </p>
                    <form action="#" method="post">
                      <div className="form-group last mb-3">
                        <label htmlFor="email">
                          <FormattedMessage id="Email" />
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "Enter Email Address",
                          })}
                          id="email"
                          name="email"
                          required
                        />
                      </div>

                      <input
                        type="submit"
                        value={intl.formatMessage({ id: "Reset" })}
                        className="btn btn-block btn-primary"
                      />
                    </form>
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
