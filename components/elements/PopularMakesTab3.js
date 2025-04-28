'use client'
import Link from "next/link"
import { useState } from "react"
import carOne from "@/public/assets/images/car-list/carOne.png"
import carTwo from "@/public/assets/images/car-list/carTwo.png"
import car3 from "@/public/assets/images/car-list/IMG_8770-med.jpg"
import car4 from "@/public/assets/images/car-list/IMG_8771-med.jpg"
import car5 from "@/public/assets/images/car-list/IMG_1490-med.jpg"
import car6 from "@/public/assets/images/car-list/IMG_1491-med.jpg"
import { FormattedMessage } from 'react-intl'
export default function PopularMakesTab3() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <div className="header-section tab-car-service">
                <div className="heading-section">
                    <span className="sub-title mb-6 wow fadeInUp"><FormattedMessage id="Trusted Car DeAler Service"/></span>
                    <h2 className="title wow fadeInUp"><FormattedMessage id="Explore all Vehicles"/></h2>
                </div>
                <ul className="nav nav-pills justify-content-end" id="pills-tab-service" role="tablist">
                    <li className="nav-item" onClick={() => handleOnClick(1)}>
                        <button className={activeIndex == 1 ? "nav-link active" : "nav-link"}>
                            <FormattedMessage id="All Status"/></button>
                    </li>
                    <li className="nav-item" onClick={() => handleOnClick(2)}>
                        <button className={activeIndex == 2 ? "nav-link active" : "nav-link"}><FormattedMessage id="New Cars"/></button>
                    </li>
                    <li className="nav-item" onClick={() => handleOnClick(3)}>
                        <button className={activeIndex == 3 ? "nav-link active" : "nav-link"}><FormattedMessage id="Used Cars"/></button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
                <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                    {/* Widget Car Service */}
                    <div className="car-list-item">
                        <div className="tf-car-service">
                            <Link href="/listing-details" className="image">
                                <div className="stm-badge-top">
                                    <div className="feature">
                                        <span><FormattedMessage id="Featured"/></span>
                                        <div className="cut me-2">
                                            <svg width={24} height={22} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z" fill="white" />
                                                <path d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z" fill="white" />
                                            </svg>
                                            <p>5</p>
                                        </div>
                                    </div>
                                    <span>2023</span>
                                </div>
                                <div className="listing-images">
                                    <div className="hover-listing-image">
                                        <div className="wrap-hover-listing">
                                            <div className="listing-item active" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={carOne.src} className="swiper-image tfcl-light-gallery" alt="images" />
                                                </div>
                                            </div>
                                            <div className="listing-item" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={car3.src} className="swiper-image lazy tfcl-light-gallery" alt="images" />
                                                </div>
                                            </div>
                                            <div className="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={car4.src} className="swiper-image tfcl-light-gallery" alt="images" />
                                                    <div className="overlay-limit">
                                                        <img src="./assets/images/car-list/img.png" className="icon-img" alt="icon-map" />
                                                        <p>2 more photos</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bullet-hover-listing">
                                                <div className="bl-item active" />
                                                <div className="bl-item" />
                                                <div className="bl-item" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="content">
                                <span className="sub-title"><FormattedMessage id="Mini Cooper 3 Similar"/></span>
                                <h6 className="title"><Link href="/listing-details" /><Link href="/listing-details"> كيا كارنفال 2023</Link></h6>
                                <span className="price">SAR 27,000</span>
                                <div className="description">
                                    <ul>
                                        <li className="listing-information fuel gap-1">
                                            <i className="icon-gasoline-pump-1 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Fuel type"/></span>
                                                <p><FormattedMessage id="Hybrid"/></p>
                                            </div>
                                        </li>
                                        <li className="listing-information size-engine gap-1">
                                            <i className="icon-Group1 md:ms-0 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Mileage"/></span>
                                                <p>90 k.m</p>
                                            </div>
                                        </li>
                                        <li className="listing-information transmission gap-1">
                                            <i className="icon-gearbox-1 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Transmission"/></span>
                                                <p><FormattedMessage id="Auto"/></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom-btn-wrap">
                                    <div className="btn-read-more">
                                        <a className="more-link" href="/listing-details">
                                            <span><FormattedMessage id="View details"/></span>
                                            <i className="icon-arrow-right2" />
                                        </a>
                                    </div>
                                    <div className="btn-group">
                                        <a href="#" className="icon-service">
                                            <i className="icon-shuffle-2-11" />
                                        </a>
                                        <a href="#" className="icon-service">
                                            <i className="icon-heart-1-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tf-car-service">
                            <Link href="/listing-details" className="image">
                                <div className="stm-badge-top">
                                    <div className="feature">
                                        <span><FormattedMessage id="Featured"/></span>
                                        <div className="cut me-2">
                                            <svg width={24} height={22} viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z" fill="white" />
                                                <path d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z" fill="white" />
                                            </svg>
                                            <p>5</p>
                                        </div>
                                    </div>
                                    <span>2023</span>
                                </div>
                                <div className="listing-images">
                                    <div className="hover-listing-image">
                                        <div className="wrap-hover-listing">
                                            <div className="listing-item active" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={carTwo.src} className="swiper-image tfcl-light-gallery" alt="images" />
                                                </div>
                                            </div>
                                            <div className="listing-item" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={car5.src} className="swiper-image lazy tfcl-light-gallery" alt="images" />
                                                </div>
                                            </div>
                                            <div className="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={car6.src} className="swiper-image tfcl-light-gallery" alt="images" />
                                                    <div className="overlay-limit">
                                                        <img src="./assets/images/car-list/img.png" className="icon-img" alt="icon-map" />
                                                        <p>2 more photos</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bullet-hover-listing">
                                                <div className="bl-item active" />
                                                <div className="bl-item" />
                                                <div className="bl-item" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="content">
                                <span className="sub-title"><FormattedMessage id="Mini Cooper 3 Similar"/></span>
                                <h6 className="title"><Link href="/listing-details">هونداي كوندا 2023</Link></h6>
                                <span className="price">SAR 40,000</span>
                                <div className="description">
                                    <ul>
                                        <li className="listing-information fuel gap-1">
                                            <i className="icon-gasoline-pump-1 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Fuel type"/></span>
                                                <p><FormattedMessage id="Petrol"/></p>
                                            </div>
                                        </li>
                                        <li className="listing-information size-engine gap-1">
                                            <i className="icon-Group1 md:ms-0 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Mileage"/></span>
                                                <p>90 k.m</p>
                                            </div>
                                        </li>
                                        <li className="listing-information transmission gap-1">
                                            <i className="icon-gearbox-1 block d-xl-none" />
                                            <div className="inner">
                                                <span><FormattedMessage id="Transmission"/></span>
                                                <p><FormattedMessage id="Auto"/></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom-btn-wrap">
                                    <div className="btn-read-more">
                                        <a className="more-link" href="/listing-details">
                                            <span><FormattedMessage id="View details"/></span>
                                            <i className="icon-arrow-right2" />
                                        </a>
                                    </div>
                                    <div className="btn-group">
                                        <a href="#" className="icon-service">
                                            <i className="icon-shuffle-2-11" />
                                        </a>
                                        <a href="#" className="icon-service">
                                            <i className="icon-heart-1-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Widget Car Service */}
                </div>
            </div>
        </>
    )
}
