'use client'
import Layout from "@/components/layout/Layout"
import { useContext, useEffect, useState } from "react"
import { db } from "../firebase"; 
import { collection, getDocs } from 'firebase/firestore';
import CardCard from '@/components/elements/CarCard'
import { getCars } from "@/utils/cars";
import { LanguageContext } from "@/components/translation/translationLayout";
import {FormattedMessage, useIntl} from "react-intl";
import {Box, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Link from "next/link";

export default function CarList() {
    const [listing, setListing] = useState([])
    const [locations, setLocations] = useState([])
    const [types, setTypes] = useState([])
    const [search, setSearch] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [isToggled, setToggled] = useState(true)
    const [loading, setLoading] = useState(true)
    const { startDate, endDate, selectedLocation, setSelectedLocation, numberOfDays } = useContext(LanguageContext);

    const intl = useIntl();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setToggled(false)
            } else {
                setToggled(true)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    const fetchData = async () => {
        setLoading(true)
        setListing(await getCars(selectedType, 6, selectedLocation, search, numberOfDays, startDate, endDate))
        setLoading(false)
    }
    useEffect(()=>{
        fetchData()
    }, [search, selectedLocation, selectedType, numberOfDays, startDate, endDate])

    useEffect(() => {
        const getLocations = async () => {
            const q = collection(db, "locations");
            const querySnapshot = await getDocs(q);

            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocations(docs)
        }
        getLocations()
        const getTypes = async () => {
            const q = collection(db, "types");
            const querySnapshot = await getDocs(q);

            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTypes(docs)
        }
        getTypes()
    }, [])

    const handleToggle = () => setToggled(!isToggled)
    const handleFilter = (e) => {
        if (e.target.name === 'name') {
            setSearch(e.target.value)
        }else if (e.target.name === 'location') {            
            setSelectedLocation(e.target.value)
        }else if (e.target.name === 'type') {
            console.log(e.target.value);
            
            setSelectedType(e.target.value)
        }
    }

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* car-listing-list */}
                    <div className="widget-car-listing-list">
                        <div className="themesflat-container">
                            <div className="row car-listing-list">
                                <div className="col-md-12 col-lg-3">
                                    <div className="search-filter-listing-car">
                                        <div className="filter-header-list">
                                            <h6 className="title-filter">
                                                <FormattedMessage
                                                    id={'searchByFilter'}
                                                    defaultMessage={'Search by Filter'}
                                                />
                                            </h6>
                                            <div className="btn-filter">
                                                <i className="icon-Grid-view" onClick={handleToggle} />
                                            </div>
                                        </div>
                                        <form id="filter-list-car-side-bar" className="list-filter" style={{ display: `${isToggled ? "block" : "none"}` }}>
                                            <div className="form-group">
                                                <div className="input-search-list">
                                                    <input type="search" className="form-control" placeholder="Search here..." name="name" onChange={handleFilter} />
                                                    <span className="input-group-text " id="search-addon">
                                                        <i className="icon-Vector-1" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select className="nice-select" name="location" onChange={handleFilter}>
                                                        <option value={''} className="option">
                                                            <FormattedMessage
                                                                id={'selectLocation'}
                                                                defaultMessage={'Select location'}
                                                            />
                                                        </option>
                                                        {locations.map(location => (
                                                            <option key={location.id} value={location.id} className="option">{intl.locale === 'ar' ? location.name_ar : intl.locale === 'en' ? location.name_en :  location.name_kr}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select className="nice-select" name="type"  onChange={handleFilter}>
                                                        <option value={''} className="option">
                                                            <FormattedMessage
                                                                id={'selectType'}
                                                                defaultMessage={'Select Type'}
                                                            />
                                                        </option>
                                                        {types.map(type => (
                                                            <option key={type.id} value={type.id} className="option">{intl.locale === 'ar' ? type.name_ar : intl.locale === 'en' ? type.name_en :  type.name_kr}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-9 listing-list-car-wrap">
                                    <div className="tab-content" id="nav-listing-car">
                                        <div className="tab-pane fade show active">
                                            <div className="listing-list-car-grid ">
                                                {loading ?
                                                    [...Array(3)].map((_, index) => (
                                                        <div key={index} className="listing-grid-item">
                                                            <div className="listing-item-image">
                                                                <div style={{ width: "100%", height: "200px" }}>
                                                                    <Skeleton variant="text" width={'100%'} height={'100%'} />
                                                                </div>
                                                            </div>
                                                            <div className="listing-item-content">
                                                                <div className="listing-top-content">
                                                                    <Skeleton variant="text" width={'100%'} />
                                                                    <div className="description">
                                                                        <Skeleton variant="text" width={'100%'} />
                                                                    </div>
                                                                </div>
                                                                <div className="bottom-price-wrap">
                                                                    <Skeleton variant="text" width={80} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) :  listing.map((item) => ( <CardCard item={item} />))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    )
}