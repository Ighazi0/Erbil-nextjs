'use client'
import Link from 'next/link'
import { useState } from 'react'
import VideoPopup from '../elements/VideoPopup'
import { FormattedMessage } from 'react-intl'

export default function Slide() {
    const [isToggled, setToggled] = useState(true)
    const handleToggle = () => setToggled(!isToggled)
    return (
        <>
            <div className="widget-tf-slider ">
                <div className="slider-wrap swiper-wrapper">
                    <div className="tf-slide-item swiper-slide">
                        <div className="slide-item-image">
                            <img src="/assets/images/slide/bg-new-2.jpg" alt="" />
                            <div className="overlay" />
                        </div>
                        <div className="slide-item-content px-4">
                            <div className="slide-content ">
                                <span className="wow fadeInUp sub-title f-25" data-wow-delay="100ms" data-wow-duration="2000ms">< FormattedMessage id="Welcome to" /></span>
                                <h1 className=" title-slide wow slideInUp" data-wow-delay="50ms" data-wow-duration="200ms">
                                    <span className="text-red">< FormattedMessage id="Erbil" /> </span> < FormattedMessage id="Cars Store" /></h1>
                                <p className="description wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2000ms">
                                    < FormattedMessage id="Browse cars by brand Cars available in different categories" />
                                </p>
                                <div className="box">
                                    {/* Button */}
                                    <div className="btn-main wow fadeInUp" data-wow-delay="400ms" data-wow-duration="2000ms">
                                        <Link href="/car-list" className="button_main_inner mx-4">
                                            <span>
                                                < FormattedMessage id="Explore Cars" />
                                            </span>
                                        </Link>
                                    </div>
                                    {/* Button */}
                                    <div className="video-wrap wow fadeInUp" data-wow-delay="500ms" data-wow-duration="2000ms">
                                        <VideoPopup style={2} />
                                    </div>
                                </div>
                            </div>
                            <div className="slide-image">
                                <img src="/assets/images/slide/icon.png" className="icon-shape wow swing" alt="" />
                                <div className="box-offer">
                                    <p>10 <span>%</span></p>
                                    <span>
                                        < FormattedMessage id="OFF" />
                                    </span>
                                </div>
                                <div className="box-car">
                                    <img src="/assets/images/slide/11452725.png" alt="" />
                                   {/*  <div className="dot-car">
                                        <div className="dot">
                                            <i className={isToggled ? "icon-Vector-5  active" : " icon-Vector-5 "} onClick={handleToggle}>
                                            </i>
                                            <div className={isToggled ? "content-price  active" : " content-price "}>
                                                <div className="proflile">
                                                    <span>Korean Cars</span>
                                                    <span className="price">SAR 13000</span>
                                                </div>
                                                <p>Southern Road, Al Hazm, Riyadh 14963</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* <div className="box">
                                <span> 00821076188701</span>
                                <span> info@alqassimcars.com</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
