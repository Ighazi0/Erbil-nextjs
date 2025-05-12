"use client"
import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from "react-intl";
import { Modal, Button, Form, Card, Toast } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import {
    FaCalendar,
    FaCar,
    FaMoneyBillWave,
    FaClock,
    FaTimes,
    FaCheckCircle,
    FaExclamationCircle,
    FaList
} from 'react-icons/fa';
import dayjs from 'dayjs';
import { LanguageContext } from '@/components/translation/translationLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import {Checkbox} from "@mui/material";
import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "@/app/firebase";
import {checkAvailability} from "@/utils/cars";

export default function ModalRentDuration({ isOpen, onClose, pricePerDay, car }) {
    const { startDate, endDate, numberOfDays, rate, code } = useContext(LanguageContext);
    const { user, userData } = useAuth();
    const router = useRouter();

    const [extras, setExtras] = useState(0);
    const [days, setDays] = useState(7);
    const [localStartDate, setLocalStartDate] = useState(new Date());
    const [localEndDate, setLocalEndDate] = useState(new Date());
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [paymentKey, setPaymentKey] = useState('');
    const total = ((days * (pricePerDay*rate)) + ((extras * rate)*days)).toFixed(2);
    const [optionalItems, setOptionalItems] = useState([
        {id: 1, 'name':'Baby Seat (Per/day)', 'price': 21.000, 'selected': false},
        {id: 2, 'name':'Child Seat (Per/day)', 'price': 21.00, 'selected': false},
        {id: 3, 'name':'Booster Seat (Per/day)', 'price': 17.00, 'selected': false},
        {id: 4, 'name':'GPS Navigation system (Per/day)', 'price': 31.00, 'selected': false},
        {id: 5, 'name':'Additional Driver (Per/day)', 'price': 21.00, 'selected': false},
        {id: 6, 'name':'SCDW (Per/day)', 'price': 35.00, 'selected': false},
    ])

    const handleConfirm = async () => { 
        if (!user) {
            router.push('/login');
            return;
        }
        if (!await checkAvailability(car.id, localStartDate, localEndDate)) {
            setToastType('danger');
            setToastMessage('Error car is rented. Please change from and to dates.');
            setShowToast(true);
            return
        }
        try {
            var amount = ((days * (pricePerDay)) + (extras*days)).toFixed(2)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Token are_sk_live_55a0936cd09ebd4a2fd23be6a86d1c33e8558a15da299c719ae7868cbcf1f2de");
            myHeaders.append("Content-Type", "application/json");

            console.log(parseFloat(amount.replace('.','')));

            const raw = JSON.stringify({
                "amount": parseFloat(amount.replace('.','')),
                "currency": "AED",
                "payment_methods": [
                    12,
                    "card",
                    59440
                ],
                // "items": [
                //     {
                //         "name": car.title,
                //         "amount": parseFloat(amount.replace('.','')),
                //         "description": "",
                //         "quantity": 1
                //     }
                // ],
                "billing_data": {
                    // "apartment": "6",
                    "first_name": userData.firstName??'A',
                    "last_name": userData.lastName??'Z',
                    // "street": "938, Al-Jadeed Bldg",
                    // "building": "939",
                    "phone_number": userData.phone??"+96824480228",
                    // "country": "UAE",
                    // "email": userData.email,
                    // "floor": "1",
                    // "state": "Alkhuwair"
                },
                // "customer": {
                //     "first_name": userData.firstName,
                //     "last_name": userData.lastName,
                //     "email": userData.email
                // }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw
            };

            fetch("https://uae.paymob.com/v1/intention/", requestOptions)
                .then((response) => response.json())
                .then(async (result) => {
                    console.log(result);
                    if(result.intention_order_id){
                        const newOrderRef = doc(collection(db, 'orders'));

                    const newOrder = {
                        car: doc(db,'cars', car.id),
                        from: localStartDate,
                        to: localEndDate,
                        days: days,
                        totalPrice: amount,
                        user: doc(db, 'users', user.uid),
                        payment: 'pending',
                        order_id: result.intention_order_id,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };

                    await setDoc(newOrderRef, newOrder);
                      
                    setPaymentKey(result.payment_keys[0].key)
                    }
                })
                .catch((error) => console.error(error));
          
        } catch (error) {
            console.log(error,'error');
            setToastType('danger');
            setToastMessage('Error creating rental order. Please try again.');
            setShowToast(true);
        }
    };

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
                    backgroundColor: '#102A2E',
                    borderRadius: '4px 0 0 4px'
                }}
            />
            <FaCalendar style={{ color: '#102A2E', fontSize: '1.2rem' }} />
            <span style={{ color: '#2c3e50', fontWeight: 500 }}>{value}</span>
        </div>
    );

    useEffect(()=>{
        if (startDate && endDate){
            setLocalStartDate(startDate)
            setLocalEndDate(endDate)
            setDays(numberOfDays)
            let totalExtras = 0
            let filteredOptionalItems = optionalItems.filter(d=>d.selected === true)
            for (let i = 0; i < filteredOptionalItems.length; i++) {
                totalExtras = totalExtras + (filteredOptionalItems[i].price);
            }
            setExtras(totalExtras)

        }
    }, [startDate, endDate, optionalItems])

    const triggerExtra = (id) => {
        console.log('hello')
        setOptionalItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    }

    useEffect(()=>{
        if (localStartDate && localEndDate){
            setDays(dayjs(localEndDate).diff(localStartDate, 'day'))
        }
    }, [localStartDate, localEndDate])

    return (
        <>
            <Modal 
                show={isOpen} 
                onHide={onClose}
                size="lg"
                centered
                contentClassName="rounded-4 overflow-hidden"
            >
                <Modal.Header className="bg-primary text-white border-bottom border-4 border-primary-subtle">
                    <Modal.Title className="d-flex align-items-center gap-2">
                        <Button
                            variant="link"
                            onClick={onClose}
                            className="p-0 text-white ms-auto"
                            style={{ fontSize: '1.5rem' }}
                        >
                            <FaTimes />
                        </Button>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-4">
                    {paymentKey ? <iframe height={500} width={'100%'} src={"https://uae.paymob.com/api/acceptance/iframes/30665?payment_token="+paymentKey} /> : <>
                        <div className="mb-3">
                            <h6 className="d-flex align-items-center gap-2 mb-3 text-secondary">
                                <FaCalendar className="text-primary" />
                                <FormattedMessage id="Select Start Date" defaultMessage="Select Start Date" />
                            </h6>
                            <DatePicker
                                selected={localStartDate}
                                onChange={date => setLocalStartDate(date)}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                customInput={<CustomInput />}
                                showPopperArrow={false}
                            />
                        </div>
                        <div className="mb-3">
                            <h6 className="d-flex align-items-center gap-2 mb-3 text-secondary">
                                <FaCalendar className="text-primary" />
                                <FormattedMessage id="Select End Date" defaultMessage="Select End Date" />
                            </h6>
                            <DatePicker
                                selected={localEndDate}
                                onChange={date => setLocalEndDate(date)}
                                minDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                                customInput={<CustomInput />}
                                showPopperArrow={false}
                            />
                        </div>
                        <Card className="border-2 rounded-3 position-relative overflow-hidden mb-3">
                            <div
                                className="position-absolute h-100"
                                style={{
                                    left: 0,
                                    width: '4px',
                                    backgroundColor: '#102A2E'
                                }}
                            />
                            <Card.Body className="bg-light">
                                <h6 className="d-flex align-items-center gap-2 mb-4">
                                    <FaList className="text-primary" />
                                    <FormattedMessage id="Optional Extras" />
                                </h6>

                                <div className="d-flex flex-column gap-3">
                                    {optionalItems.map((e) => (
                                        <Card className="border rounded-3">
                                            <Card.Body className="d-flex justify-content-between align-items-center">
                                            <span className="text-secondary">
                                                <Checkbox checked={e.selected} onClick={() => triggerExtra(e.id)} />
                                                <FormattedMessage id={e.name}/>
                                            </span>
                                                <span className="text-primary fw-bold">{(e.price*rate).toFixed(1)} {code}</span>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="border-2 rounded-3 position-relative overflow-hidden">
                            <div
                                className="position-absolute h-100"
                                style={{
                                    left: 0,
                                    width: '4px',
                                    backgroundColor: '#102A2E'
                                }}
                            />
                            <Card.Body className="bg-light">
                                <h6 className="d-flex align-items-center gap-2 mb-4">
                                    <FaMoneyBillWave className="text-primary" />
                                    <FormattedMessage id="Rental Summary" />
                                </h6>

                                <div className="d-flex flex-column gap-3">
                                    <Card className="border rounded-3">
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                        <span className="text-secondary">
                                            <FormattedMessage id="Daily Rate" />
                                        </span>
                                            <span className="text-primary fw-bold">{(pricePerDay*rate).toFixed(1)} {code}</span>
                                        </Card.Body>
                                    </Card>

                                    <Card className="border rounded-3">
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                        <span className="text-secondary">
                                            <FormattedMessage id="Rental Period" />
                                        </span>
                                            <span className="fw-bold">
                                            {localStartDate.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })} - {localEndDate.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        </Card.Body>
                                    </Card>

                                    <Card className="border rounded-3">
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                        <span className="text-secondary">
                                            <FormattedMessage id="Number of Days" />
                                        </span>
                                            <span className="fw-bold">{days} days</span>
                                        </Card.Body>
                                    </Card>

                                    <Card className="bg-primary text-white border-0 shadow">
                                        <Card.Body className="d-flex justify-content-between align-items-center">
                                        <span className="h5 mb-0 fw-bold">
                                            <FormattedMessage id="Total Amount" />
                                        </span>
                                            <span className="h5 mb-0 fw-bold">{total} {code}</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Card.Body>
                        </Card>
                    </>}

                </Modal.Body>

                {!paymentKey && <Modal.Footer className="bg-light border-top-2 p-3">
                    <div className="d-flex gap-3 w-100 justify-content-end">
                        <Button
                            variant="outline-primary"
                            onClick={onClose}
                            className="px-4 py-2 fw-medium border-2"
                        >
                            <FormattedMessage id="Cancel"/>
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            className="px-4 py-2 fw-medium"
                        >
                            <FormattedMessage id="Confirm Rental"/>
                        </Button>
                    </div>
                </Modal.Footer>}
            </Modal>

            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 2000
                }}
            >
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)}
                    delay={3000} 
                    autohide
                    className="border-0"
                >
                    <Toast.Header className={`bg-${toastType} text-white border-0`}>
                        <span className="me-2">
                            {toastType === 'success' ? 
                                <FaCheckCircle size={18} /> : 
                                <FaExclamationCircle size={18} />
                            }
                        </span>
                        <strong className="me-auto">
                            {toastType === 'success' ? 'Success' : 'Error'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className={`bg-${toastType} text-white`}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </div>
        </>
    );
} 