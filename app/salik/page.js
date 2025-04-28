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
                                <FormattedMessage id="salik" />
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="counter-car-content">
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count1" /></p>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count2" /></p>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count3" /></p>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count4" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count5" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count6" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count7" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count8" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count9" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count10" /></h6>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count11" /></p>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count12" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count13" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count14" /></h6>
                                <h6 className="description wow fadeInUp"><FormattedMessage id="salik-description-count15" /></h6>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count16" /></p>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count17" /></p>
                                <p className="description wow fadeInUp"><FormattedMessage id="salik-description-count18" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
