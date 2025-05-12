"use client";
import Layout from "@/components/layout/Layout";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";

export default function Page() {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en'); // Default to 'en'

    useEffect(() => {
        const savedLang = localStorage.getItem('lang') || 'en';
        setLang(savedLang);
    }, []);


    return (
        <Layout headerStyle={1} footerStyle={1}>
            <div className="container my-5" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="heading-section t-al-start mb-30">
                    <span className="sub-title mb-6 wow fadeInUp">
                        <FormattedMessage id="Car Rental – Dubai" />
                    </span>
                    <h2 className="title wow fadeInUp">
                        <FormattedMessage id="Erbil in Dubai" />
                    </h2>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai1" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai2" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai3" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai4" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai5" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai6" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai7" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai8" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai9" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai10" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai11" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai12" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai13" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai14" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai15" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai16" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.dubai17" defaultMessage={" "} />
                    </p>
                </div>

            </div>
        </Layout>
    );
}
