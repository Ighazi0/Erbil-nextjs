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
                        <FormattedMessage id="Car Rental – Ras Al Khaimah" />
                    </span>
                    <h2 className="title wow fadeInUp">
                        <FormattedMessage id="Erbil in Ras Al Khaimah" />
                    </h2>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah1" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah2" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah3" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah4" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah5" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah6" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah7" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah8" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah9" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah10" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah11" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah12" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah13" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah14" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah15" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah16" defaultMessage={" "} />
                    </p>
                    <p className="black-description wow fadeInUp">
                        <FormattedMessage id="driving-in.ras-al-khaimah17" defaultMessage={" "} />
                    </p>
                </div>

            </div>
        </Layout>
    );
}
