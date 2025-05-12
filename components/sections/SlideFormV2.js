'use client'
import Link from 'next/link'
import { useContext, useEffect, useState } from "react"
import { db } from "../../app/firebase"; 
import { collection, getDocs, getDoc, query, where, doc, orderBy, startAt, endAt } from 'firebase/firestore';
import dayjs from 'dayjs';
import DatePicker from "react-datepicker";
import { FaCalendar } from 'react-icons/fa6';
import { LanguageContext } from '../translation/translationLayout';
import { FormattedMessage } from 'react-intl';

const CustomInput = ({ value, onClick }) => (
    <div 
        onClick={onClick}
        className="date-picker-input"
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem',
            cursor: 'pointer',
            border: '2px solid #dee2e6',
            borderRadius: '0.75rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#fff',
            position: 'relative',
            width: '100%'
        }}
    >
        <div 
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: '#a88e70',
                borderRadius: '4px 0 0 4px'
            }}
        />
        <FaCalendar style={{ color: '#a88e70', fontSize: '1.2rem' }} />
        <span style={{ color: '#2c3e50', fontWeight: 500 }}>{value}</span>
    </div>
);

export default function SlideFormV2() {
    const [locations, setLocations] = useState([])
    const { startDate, setStartDate, endDate, setEndDate, selectedLocation, setSelectedLocation } = useContext(LanguageContext);

    // Add custom styles for the DatePicker
    const datePickerCustomStyles = {
        calendarContainer: {
            fontFamily: 'inherit',
            fontSize: '0.9rem'
        },
        daySelected: {
            backgroundColor: '#d01818 !important',
            color: '#fff !important',
            borderRadius: '50% !important'
        },
        dayHover: {
            backgroundColor: '#ff4444 !important',
            color: '#fff !important',
            borderRadius: '50% !important'
        }
    };

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
    }, [])

    return (
        <>
            <div className="tf-slide-form-v2">
                <div className="slide-form-v2">
                    <div className="slide-form-item">
                        <div className="slide-image">
                            <img src="/assets/images/slide/Website2.jpg" alt="" />
                            <div className="overlay" />
                        </div>
                        <div className="themesflat-container">
                            <div className="slider-wrap">
                                <div className="slide-content">
                                    <span className="sub-title"><FormattedMessage id="Trusted Dealer, Rental" /></span>
                                    <h1>Erbil</h1>
                                    <div className="btn-main">
                                        <span className="main_button_circle">
                                        </span>
                                        <Link href="/car-list" className="button_main_inner ">
                                            <span className="button_text_container">
                                                <FormattedMessage id="Go to listing" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="slide-box-form">
                                    <select className="nice-select" name="location" value={selectedLocation} onChange={(val => {setSelectedLocation(val.target.value)})}>
                                        <option data-value={0} className="option"><FormattedMessage id='Select location' /></option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.id} className="option">{location.name_en}</option>
                                        ))}
                                    </select>
                                    <div className="tab-content form-v4-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active">
                                            <div className="form-group mt-3">
                                                <div className="group-select">
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={date => setStartDate(date)}
                                                        minDate={dayjs().toDate()}
                                                        dateFormat="MMMM d, yyyy"
                                                        customInput={<CustomInput />}
                                                        showPopperArrow={false}
                                                        calendarClassName="custom-datepicker"
                                                        dayClassName={date =>
                                                            date.getDate() === startDate?.getDate() ? 'selected-day' : undefined
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group mt-3">
                                                <div className="group-select">
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={date => setEndDate(date)}
                                                        minDate={dayjs().toDate()}
                                                        dateFormat="MMMM d, yyyy"
                                                        customInput={<CustomInput />}
                                                        showPopperArrow={false}
                                                        calendarClassName="custom-datepicker"
                                                        dayClassName={date =>
                                                            date.getDate() === endDate?.getDate() ? 'selected-day' : undefined
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group btn-main w-100 mt-3">
                                                <Link href='/car-list' type="submit" className="button_main_inner w-100">
                                                    <i className="icon-search-1 mx-2" />
                                                    <FormattedMessage id='search' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .react-datepicker-wrapper {
                    width: 100%;
                    display: block;
                }
                
                .react-datepicker__input-container {
                    width: 100%;
                    display: block;
                }
                
                .date-picker-input {
                    width: 100%;
                }
                
                .group-select {
                    width: 100%;
                }

                .react-datepicker {
                    font-family: inherit;
                    border: 1px solid #dee2e6;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                
                .react-datepicker__header {
                    background-color: #fff;
                    border-bottom: 1px solid #dee2e6;
                    border-top-right-radius: 0.75rem;
                    border-top-left-radius: 0.75rem;
                    padding-top: 1rem;
                }
                
                .react-datepicker__current-month {
                    color: #2c3e50;
                    font-weight: 600;
                }
                
                .react-datepicker__day-name {
                    color: #6c757d;
                }
                
                .react-datepicker__day {
                    color: #2c3e50;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                
                .react-datepicker__day:hover {
                    background-color: #ff4444;
                    color: white;
                    border-radius: 50%;
                }
                
                .react-datepicker__day--selected {
                    background-color: #d01818 !important;
                    color: white !important;
                    border-radius: 50%;
                }
                
                .react-datepicker__day--keyboard-selected {
                    background-color: #ff4444;
                    color: white;
                    border-radius: 50%;
                }
                
                .react-datepicker__navigation {
                    top: 1rem;
                }
                
                .react-datepicker__navigation-icon::before {
                    border-color: #d01818;
                }
                
                .react-datepicker__day--disabled {
                    color: #ccc;
                }

                .form-group {
                    width: 100%;
                }
            `}</style>
        </>
    )
}
