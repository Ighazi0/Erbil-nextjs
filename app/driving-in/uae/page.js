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
                        <FormattedMessage id="Car Rental – UAE" />
                    </span>
                    <h2 className="title wow fadeInUp">
                        <FormattedMessage id="Erbil in United Arab Emirates" />
                    </h2>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae1" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae2" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae3" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae4" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae5" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae6" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae7" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae8" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae9" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae10" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae11" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae12" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae13" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae14" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae15" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae16" />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.uae17" />
                    </p>
                </div>

            </div>
        </Layout>
    );
}
