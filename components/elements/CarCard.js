'use client'

import Link from "next/link"
import {useContext} from "react";
import {LanguageContext} from "@/components/translation/translationLayout";

export default function CarCard({ item }) {
    const { rate, code } = useContext(LanguageContext);
    return (
        <div key={item.id} className="listing-grid-item">
            <div className="listing-item-image">
                <div className="hover-listing-image">
                    <div className="wrap-hover-listing">
                        <div className="listing-item active">
                            <div className="images">
                                <img src={item.image} className="swiper-image tfcl-light-gallery" alt="images" />
                            </div>
                        </div>
                        <div className="bullet-hover-listing">
                            <div className="bl-item active" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="listing-item-content">
                <div className="listing-top-content">
                    <h6 className="title"><Link  href={`/car-details/${item.id}`}>{item.title}</Link></h6>
                    <div className="description">
                        <ul>
                            <li className="listing-information fuel">
                                <i className="icon-gasoline-pump-1" />
                                <div className="inner">
                                    <span>Fuel type</span>
                                    <p>{item.fuelType}</p>
                                </div>
                            </li>
                            <li className="listing-information size-engine">
                                <i className="icon-Group1" />
                                <div className="inner">
                                    <span>Mileage</span>
                                    <p>{item.mileage}</p>
                                </div>
                            </li>
                            <li className="listing-information transmission">
                                <i className="icon-gearbox-1" />
                                <div className="inner">
                                    <span>Transmission</span>
                                    <p>{item.transmission}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-price-wrap">
                    <div className="price-wrap">
                        {/* <p className="price">$489</p> */}
                        <p className="price-sale">{(item.price * rate).toFixed(1)} {code}</p>
                    </div>
                    <div className="btn-read-more">
                        <Link className="more-link" href={`/car-details/${item.id}`}>
                            <span>View details</span>
                            <i className="icon-arrow-right2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}