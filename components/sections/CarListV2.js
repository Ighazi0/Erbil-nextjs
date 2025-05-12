'use client'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from "react"
import { db } from "../../app/firebase"; 
import { getCars } from "../../utils/cars"; 
import { collection, getDocs, getDoc, query, where, doc, orderBy, startAt, endAt } from 'firebase/firestore';
import { LanguageContext } from '../translation/translationLayout';
import {FormattedMessage, useIntl} from 'react-intl';


export default function CarListV2({ h5 }) {
    const [listing, setListing] = useState([])
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState()
    const { numberOfDays, code, rate } = useContext(LanguageContext);
    const intl = useIntl();

    const fetchData = async () => {
        setListing(await getCars(selectedType, 2, '', '', numberOfDays))
    }

    useEffect(()=>{
        fetchData();
    },[selectedType])

    useEffect(() => {
        const getTypes = async () => {
            const q = collection(db, "types");
            const querySnapshot = await getDocs(q);

            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTypes(docs)
            setActiveIndex(docs?.[0]?.id)
        }
        getTypes()
    }, [])
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <div className="widget-car-list-v2-h5">
                <div className="themesflat-container">
                    <div className="header-tab mb-46">
                        <div className="heading-section">
                            <h2 className="title-section-main wow fadeInUp"><FormattedMessage id="Explore All Cars" /></h2>
                        </div>
                        <ul className="nav nav-pills tab-car-service-v2 justify-content-end" id="pills-tab-service-v2" role="tablist">
                            {types.map(t=>(<li className="nav-item" onClick={() => handleOnClick(t.id)}>
                                <button key={t.id} className={activeIndex === t.id ? "nav-link active" : "nav-link"}>{intl.locale === 'ar' ? t.name_ar : intl.locale === 'en' ? t.name_en :  t.name_kr}</button>
                            </li>))}
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent-v2">
                        <div className={activeIndex === types?.[0]?.id ? "tab-pane fade show active" : "tab-pane fade"}>
                            <div className="row">
                                {listing.map(car=>(
                                    <div key={car.id}  className="col-12 col-sm-6 col-md-6 col-xl-6">
                                    <div className="tf-car-service-v2">
                                        <Link href={`/car-details/${car.id}`} className="image">
                                            <div className="stm-badge-top">
                                                <div className="feature-group">
                                                    <span className="featured">
                                                        <FormattedMessage
                                                            id={'featured'}
                                                            defaultMessage={'Featured'}
                                                        />
                                                    </span>
                                                    <span className="year">2023</span>
                                                </div>
                                            </div>
                                            <div className="thumb">
                                                <img src={car.image} className="img-responsive bg-white" alt="Image Car Service" style={{ height: "100%", width: "100%"}} />
                                            </div>
                                        </Link>
                                        <div className="content">
                                            <h6 className="title"><Link href={`/car-details/${car.id}`}>{car.title}</Link></h6>
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
                                                <div className="price-group">
                                                    <span className="price-sale text-white">{(car.price * rate).toFixed(1)} {code}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
