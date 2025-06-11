"use client";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Modal, Button, Card, Toast, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  FaCalendar,
  FaMoneyBillWave,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaList,
} from "react-icons/fa";
import dayjs from "dayjs";
import { LanguageContext } from "@/components/translation/translationLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { checkAvailability } from "@/utils/cars";

export default function ModalRentDuration({
  isOpen,
  onClose,
  pricePerDay,
  car,
}) {
  const { startDate, endDate, numberOfDays, rate, code } =
    useContext(LanguageContext);
  const { user, userData } = useAuth();

  const [extras, setExtras] = useState(0);
  const [days, setDays] = useState(7);
  const [localStartDate, setLocalStartDate] = useState(new Date());
  const [localEndDate, setLocalEndDate] = useState(new Date());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [paymentKey, setPaymentKey] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user ? userData.phone : "");
  const total = (days * (pricePerDay * rate) + extras * rate * days).toFixed(2);
  const [optionalItems, setOptionalItems] = useState([
    { id: 1, name: "Baby Seat (Per/day)", price: 21.0, selected: false },
    { id: 2, name: "Child Seat (Per/day)", price: 21.0, selected: false },
    { id: 3, name: "Booster Seat (Per/day)", price: 17.0, selected: false },
    {
      id: 4,
      name: "GPS Navigation system (Per/day)",
      price: 31.0,
      selected: false,
    },
    {
      id: 5,
      name: "Additional Driver (Per/day)",
      price: 21.0,
      selected: false,
    },
    { id: 6, name: "SCDW (Per/day)", price: 35.0, selected: false },
  ]);

  const validatePhoneNumber = function (phone) {
    const phoneRegex = /^\+?[1-9]\d{5,14}$/;
    return phoneRegex.test(phone);
  };

  const handleConfirm = async () => {
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    if (!(await checkAvailability(car.id, localStartDate, localEndDate))) {
      setToastType("danger");
      setToastMessage("Error car is rented. Please change from and to dates.");
      setShowToast(true);
      return;
    }
    try {
      var amount = (days * pricePerDay + extras * days).toFixed(2);
      const myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Token are_sk_live_55a0936cd09ebd4a2fd23be6a86d1c33e8558a15da299c719ae7868cbcf1f2de"
      );
      myHeaders.append("Content-Type", "application/json");

      console.log(parseFloat(amount.replace(".", "")));
      const raw = JSON.stringify({
        amount: parseFloat(amount.replace(".", "")),
        currency: "AED",
        payment_methods: [12, "card", 59440],

        billing_data: {
          first_name: user ? userData.firstName || "Guest" : "Guest",
          last_name: user ? userData.lastName || "User" : "User",
          phone_number: phoneNumber,
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
        body: raw,
      };

      fetch("https://uae.paymob.com/v1/intention/", requestOptions)
        .then((response) => response.json())
        .then(async (result) => {
          console.log(result);
          if (result.intention_order_id) {
            const newOrderRef = doc(collection(db, "orders"));

            const newOrder = {
              car: doc(db, "cars", car.id),
              from: localStartDate,
              to: localEndDate,
              days: days,
              totalPrice: amount,
              user: user ? doc(db, "users", user.uid) : null,
              payment: "pending",
              order_id: result.intention_order_id,
              createdAt: new Date(),
              updatedAt: new Date(),
              phoneNumber: phoneNumber,
            };

            await setDoc(newOrderRef, newOrder);

            setPaymentKey(result.payment_keys[0].key);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error, "error");
      setToastType("danger");
      setToastMessage("Error creating rental order. Please try again.");
      setShowToast(true);
    }
  };

  const CustomInput = ({ value, onClick }) => (
    <div
      onClick={onClick}
      className="date-picker-input"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.8rem",
        cursor: "pointer",
        border: "2px solid #dee2e6",
        borderRadius: "0.75rem",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: "#102A2E",
          borderRadius: "4px 0 0 4px",
        }}
      />
      <FaCalendar style={{ color: "#102A2E", fontSize: "1.2rem" }} />
      <span style={{ color: "#2c3e50", fontWeight: 500 }}>{value}</span>
    </div>
  );

  useEffect(() => {
    if (startDate && endDate) {
      setLocalStartDate(startDate);
      setLocalEndDate(endDate);
      setDays(numberOfDays);
      let totalExtras = 0;
      let filteredOptionalItems = optionalItems.filter(
        (d) => d.selected === true
      );
      for (let i = 0; i < filteredOptionalItems.length; i++) {
        totalExtras = totalExtras + filteredOptionalItems[i].price;
      }
      setExtras(totalExtras);
    }
  }, [startDate, endDate, optionalItems]);

  const triggerExtra = (id) => {
    console.log("hello");
    setOptionalItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  useEffect(() => {
    if (localStartDate && localEndDate) {
      setDays(dayjs(localEndDate).diff(localStartDate, "day"));
    }
  }, [localStartDate, localEndDate]);

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
              style={{ fontSize: "1.5rem" }}
            >
              <FaTimes />
            </Button>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {paymentKey ? (
            <iframe
              height={500}
              width={"100%"}
              src={
                "https://uae.paymob.com/api/acceptance/iframes/30665?payment_token=" +
                paymentKey
              }
            />
          ) : (
            <>
              <div className="mb-3">
                <h6 className="d-flex align-items-center gap-2 mb-3 text-secondary">
                  <FaCalendar className="text-primary" />
                  <FormattedMessage id="select_start_date" />
                </h6>
                <DatePicker
                  selected={localStartDate}
                  onChange={(date) => setLocalStartDate(date)}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  customInput={<CustomInput />}
                  showPopperArrow={false}
                />
              </div>
              <div className="mb-3">
                <h6 className="d-flex align-items-center gap-2 mb-3 text-secondary">
                  <FaCalendar className="text-primary" />
                  <FormattedMessage id="select_end_date" />
                </h6>
                <DatePicker
                  selected={localEndDate}
                  onChange={(date) => setLocalEndDate(date)}
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
                    width: "4px",
                    backgroundColor: "#102A2E",
                  }}
                />
                <Card.Body className="bg-light">
                  <h6 className="d-flex align-items-center gap-2 mb-4">
                    <FaList className="text-primary" />
                    <FormattedMessage id="optional_extras" />
                  </h6>

                  <div className="d-flex flex-column gap-3">
                    {optionalItems.map((e) => (
                      <Card className="border rounded-3">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                          <span className="text-secondary">
                            <Checkbox
                              checked={e.selected}
                              onClick={() => triggerExtra(e.id)}
                            />
                            <FormattedMessage id={e.name} />
                          </span>
                          <span className="text-primary fw-bold">
                            {(e.price * rate).toFixed(1)} {code}
                          </span>
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
                    width: "4px",
                    backgroundColor: "#102A2E",
                  }}
                />
                <Card.Body className="bg-light">
                  <h6 className="d-flex align-items-center gap-2 mb-4">
                    <FaMoneyBillWave className="text-primary" />
                    <FormattedMessage id="rental_summary" />
                  </h6>

                  <div className="d-flex flex-column gap-3">
                    <Card className="border rounded-3">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary">
                          <FormattedMessage id="daily_rate" />
                        </span>
                        <span className="text-primary fw-bold">
                          {(pricePerDay * rate).toFixed(1)} {code}
                        </span>
                      </Card.Body>
                    </Card>

                    <Card className="border rounded-3">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary">
                          <FormattedMessage id="rental_period" />
                        </span>
                        <span className="fw-bold">
                          {localStartDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {localEndDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </Card.Body>
                    </Card>

                    <Card className="border rounded-3">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary">
                          <FormattedMessage id="number_of_days" />
                        </span>
                        <span className="fw-bold">
                          {days} <FormattedMessage id="days" />
                        </span>
                      </Card.Body>
                    </Card>

                    <Card className="bg-primary text-white border-0 shadow">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0 fw-bold">
                          <FormattedMessage id="total_amount" />
                        </span>
                        <span className="h5 mb-0 fw-bold">
                          {total} {code}
                        </span>
                      </Card.Body>
                    </Card>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>

        {!paymentKey && (
          <Modal.Footer className="bg-light border-top-2 p-3">
            <div className="d-flex flex-column gap-3 w-100">
              <Form.Group controlId="phoneNumber">
                <Form.Label className="d-flex align-items-center gap-2 text-secondary">
                  <FormattedMessage
                    id="phone_number"
                    defaultMessage="Phone Number"
                  />
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setPhoneError(""); // Clear error on input change
                  }}
                  placeholder="e.g., +1234567890"
                  required
                  className="rounded-3"
                  style={{
                    border: "2px solid #dee2e6",
                    padding: "0.8rem",
                    backgroundColor: "#fff",
                  }}
                />
                {phoneError && (
                  <Form.Text className="text-danger">{phoneError}</Form.Text>
                )}
              </Form.Group>
              <div className="d-flex gap-3 justify-content-end">
                <Button
                  variant="outline-primary"
                  onClick={onClose}
                  className="px-4 py-2 fw-medium border-2"
                >
                  <FormattedMessage id="cancel" />
                </Button>
                <Button
                  variant="primary"
                  onClick={handleConfirm}
                  className="px-4 py-2 fw-medium"
                  disabled={!phoneNumber}
                >
                  <FormattedMessage id="confirm_rental" />
                </Button>
              </div>
            </div>
          </Modal.Footer>
        )}
      </Modal>

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 2000,
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
              {toastType === "success" ? (
                <FaCheckCircle size={18} />
              ) : (
                <FaExclamationCircle size={18} />
              )}
            </span>
            <strong className="me-auto">
              {toastType === "success" ? "Success" : "Error"}
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
