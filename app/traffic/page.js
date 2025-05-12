"use client";
import Layout from "@/components/layout/Layout";
import { FormattedMessage } from "react-intl";

export default function About() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div className="container my-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary  text-center">
                            <h2 className="mb-0 text-white">
                                <FormattedMessage id="title-count" />
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="counter-car-content">
                                <p className="description wow fadeInUp"><FormattedMessage id="description-count1" /></p>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count2" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count3" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count4" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count5" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count6" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="description-count7" /></h6>
                                <p className="description wow fadeInUp"><FormattedMessage id="description-count8" /></p>
                                <p className="description wow fadeInUp"><FormattedMessage id="description-count9" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
