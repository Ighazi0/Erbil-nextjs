'use client'
import Link from 'next/link'
import { useState, useEffect, useContext } from "react"
import { getCars } from '@/utils/cars'
import { LanguageContext } from '../translation/translationLayout'
import {FormattedMessage} from "react-intl";


export default function PopularMakesTab1() {
    const [listing, setListing] = useState([])
    const { numberOfDays, rate, code } = useContext(LanguageContext);

    const fetchData = async () => {
        setListing(await getCars('', 3, '', '', numberOfDays))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="tab-content" id="pills-tabContent-v2">
                <div className={"tab-pane fade show active"}>
                    <div className="car-list-item">
                        {listing.map((car)=>(
                            <div className="tf-car-service">
                            <Link href={`/car-details/${car.id}`} className="image">
                                <div className="stm-badge-top">
                                   
                                    <span>{car.year}</span>
                                </div>
                                <div className="listing-images">
                                    <div className="hover-listing-image">
                                        <div className="wrap-hover-listing">
                                            <div className="listing-item active" title="Lexus LC Hybrid 2024">
                                                <div className="images">
                                                    <img src={car.image} className="swiper-image tfcl-light-gallery" alt="images" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="content">
                                <h6 className="title"><Link href="/dealer-details">{car.name}</Link></h6>
                                <div className="description">
                                    <ul>
                                        <li className="listing-information fuel">
                                            <i className="icon-gasoline-pump-1" />
                                            <div className="inner">
                                                <span>
                                                    <FormattedMessage
                                                        id={'fuelType'}
                                                        defaultMessage={'Fuel Type'}
                                                    />
                                                </span>
                                                <p>{car.fuelType}</p>
                                            </div>
                                        </li>
                                        <li className="listing-information size-engine">
                                            <i className="icon-Group1" />
                                            <div className="inner">
                                                <span>
                                                    <FormattedMessage
                                                        id={'mileage'}
                                                        defaultMessage={'Mileage'}
                                                    />
                                                </span>
                                                <p>{car.mileage}</p>
                                            </div>
                                        </li>
                                        <li className="listing-information transmission">
                                            <i className="icon-gearbox-1" />
                                            <div className="inner">
                                                <span>
                                                    <FormattedMessage
                                                        id={'transmission'}
                                                        defaultMessage={'Transmission'}
                                                    />
                                                </span>
                                                <p>{car.transmission}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom-btn-wrap">
                                    <div className="price-wrap">
                                        <span className="price-sale">{(car.price * rate).toFixed(1)} {code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 t-al-center">
                    <div className="btn-main mt-45">
                        <a href="/car-list" className="button_main_inner">
                            <span>
                                <FormattedMessage
                                    id={'moreListings'}
                                    defaultMessage={'More Listings'}
                                />
                            </span>
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}
