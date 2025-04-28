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
                        <FormattedMessage id="Car Rental – Sharjah" />
                    </span>
                    <h2 className="title wow fadeInUp">
                        <FormattedMessage id="Erbil in Sharjah" />
                    </h2>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah1" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah2" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah3" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah4" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah5" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah6" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah7" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah8" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah9" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah10" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah11" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah12" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah13" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah14" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah15" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah16" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.sharjah17" defaultMessage={" "} />
                    </p>
                </div>

            </div>
        </Layout>
    );
}
