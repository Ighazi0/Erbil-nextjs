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
                        <FormattedMessage id="Car Rental – Abu Dhabi" />
                    </span>
                    <h2 className="title wow fadeInUp">
                        <FormattedMessage id="Erbil in Abu Dhabi" />
                    </h2>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi1" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi2" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi3" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi4" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi5" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi6" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi7" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi8" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi9" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi10" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi11" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi12" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi13" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi14" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi15" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi16" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.abu-dhabi17" defaultMessage={" "} />
                    </p>
                </div>

            </div>
        </Layout>
    );
}
