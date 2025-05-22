import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

export default function Footer1() {
    const intl = useIntl();
    return (
        <>
            <footer id="footer" className="clearfix bg-footer2 pd-t81 re-hi">
                <div className="themesflat-container">
                    <div className="row footer-main">
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="widget widget-info">
                                <img src="/assets/images/logo/eblpng.png" alt="Logo Footer" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="widget widget-menu pl-60">
                                <h3><FormattedMessage id="rental" /></h3>
                                <ul className="box-menu">
                                    <li><Link href="/salik">< FormattedMessage id="salik" /></Link></li>
                                    <li><Link href="/traffic">< FormattedMessage id="title-count" /></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="widget widget-menu pl-60">
                                <h3>< FormattedMessage id="Driving In UAE" /></h3>
                                <ul className="box-menu">
                                    <li><Link href="/driving-in/uae">< FormattedMessage id="uae" /></Link></li>
                                    <li><Link href="/driving-in/dubai">< FormattedMessage id="dubai" /></Link></li>
                                    <li><Link href="/driving-in/abu-dhabi">< FormattedMessage id="abuDhabi" /></Link></li>
                                    <li><Link href="/driving-in/sharjah">< FormattedMessage id="sharjah" /></Link></li>
                                    <li><Link href="/driving-in/ras-al-khaimah">< FormattedMessage id="rasAlKhamiah" /></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="widget widget-menu pl-30">
                                <h3>< FormattedMessage id="Contact Us" /></h3>
                                <ul className="box-menu">
                                    <li><p className=" text-white w-100 max-w-100 text-wrap fs-6"
                                        style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
                                    >+971 50 135 7705 </p></li>
                                    <li><p className=" text-white w-100 max-w-100 text-wrap fs-6"
                                        style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
                                    >+971 52 539 6339</p></li>
                                    <li><p className=" text-white w-100 max-w-100 text-wrap fs-6"
                                        style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
                                    >+964 750 447 2923 </p></li>
                                    <li><p className=" text-white w-100 max-w-100 text-wrap fs-6"
                                        style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
                                    >+964 750 445 7705</p></li>
                                    <li className="d-flex align-items-center">
                                        <Link href="https://maps.app.goo.gl/dkW7BCjLpTAMzGfa9?g_st=com.google.maps.preview.copy">
                                            <p className=" text-white w-100 max-w-100 text-wrap fs-6"
                                                style={{ overflowWrap: "break-word", wordWrap: "break-word", wordBreak: "break-word" }}
                                            >
                                                <i className="icon-Vector1 me-1" />
                                                BG04, Enoc 33, Auto center, Behind Al Habtoor Motor Deira, Dubai, UAE
                                            </p>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row footer-bottom">
                        <div className="col-12 text-center">
                            <p className="coppy-right">< FormattedMessage id="All Rights Reserved to Erbil Co.LTD © 2024." /></p>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
