"use client";
import Layout from "@/components/layout/Layout";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";

export default function About() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="container my-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary  text-center">
                            <h2 className="mb-0 text-white">
                                <FormattedMessage id="about.title" defaultMessage="About Us" />
                            </h2>
                        </div>
                        <div className="card-body">
                            <p className="text-secondary">
                                <FormattedMessage
                                    id="about.content.details1"
                                />
                            </p>
                            <br/>
                            <p className="text-secondary">
                                <FormattedMessage
                                    id="about.content.details2"
                                />
                            </p>
                            <br/>
                        </div>
                        <div className="card-footer bg-light text-center">
                            <small className="text-muted">
                                <FormattedMessage id="about.footer" defaultMessage="Thank you for visiting us!" />
                            </small>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
