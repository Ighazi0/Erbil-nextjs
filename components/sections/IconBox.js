"use client"
import Link from 'next/link'
import brand1 from "../../public/assets/images/banner/1.png"
import brand2 from "../../public/assets/images/banner/2.png"
import brand3 from "../../public/assets/images/banner/3.png"
import brand4 from "../../public/assets/images/banner/4.png"
import brand5 from "../../public/assets/images/banner/5.png"
import brand6 from "../../public/assets/images/banner/6.png"
import { FormattedMessage } from 'react-intl'
export default function IconBox() {
    return (
        <>
            <div className="widget-icon-box mt--115">
                <div className="themesflat-container">
                    <div className="heading-section t-al-center mb-30">
                        <span className="sub-title mb-6 wow fadeInUp"><FormattedMessage id="Find your car by car brand" />  </span>
                        <h2 className="title wow fadeInUp"><FormattedMessage id="Browse by Brands" /> </h2>
                    </div>
                    <div className="row">
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand1.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Acura" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand2.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Ford" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand3.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Bentley" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand4.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Cheavrolet" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand5.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Ferrari" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-4 col-xl-2">
                            <Link href="/car-list" className="icon-box border-line">
                                <div className="image-box-wrap">
                                    <img src={brand6.src} alt="car-brand" />
                                </div>
                                <span className="title-icon"><FormattedMessage id="Mercedes" /> </span>
                                <div className="btn-con-box">
                                    <i className="icon-arrow-right2" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
