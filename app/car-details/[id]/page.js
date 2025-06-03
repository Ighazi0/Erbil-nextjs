"use client";
import ModalOfferPrice from "@/components/elements/ModalOfferPrice";
import ModalTestDriver from "@/components/elements/ModalTestDriver";
import Layout from "@/components/layout/Layout";
import ThumbSlider from "@/components/slider/ThumbSlider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import CarCard from "@/components/elements/CarCard";
import { getCars } from "@/utils/cars";
import CarDetailsSkeleton from "@/app/components/skeletons/CarDetailsSkeleton";
import ModalRentDuration from "@/app/components/elements/ModalRentDuration";
import { LanguageContext } from "@/components/translation/translationLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function ListingDetails({ params }) {
  const carId = params?.id;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isToggled4, setToggled4] = useState(false);
  const handleToggle4 = () => setToggled4(!isToggled4);
  const [isToggled5, setToggled5] = useState(false);
  const handleToggle5 = () => setToggled5(!isToggled5);
  const [listing, setListing] = useState([]);
  const [showRentModal, setShowRentModal] = useState(false);
  const { numberOfDays, rate, code } = useContext(LanguageContext);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let q = await getDoc(doc(db, "cars", carId));
      const carData = q.data();
      carData["id"] = q.id;

      if (carData?.location) {
        const locationSnapshot = await getDoc(carData.location);
        if (locationSnapshot.exists()) {
          carData["location"] = {
            name: locationSnapshot.data().name_en || "",
            address: locationSnapshot.data().address || "",
          };
        }
      }
      if (carData?.type) {
        const typeSnapshot = await getDoc(carData.type);
        if (typeSnapshot.exists()) {
          carData["type"] = typeSnapshot.data().name_en || "";
        }
      }
      if (carData?.model) {
        const modelSnapshot = await getDoc(carData.model);
        if (modelSnapshot.exists()) {
          carData["model"] = modelSnapshot.data().name_en || "";
        }
      }
      if (carData?.brand) {
        const brandSnapshot = await getDoc(carData.brand);
        if (brandSnapshot.exists()) {
          carData["brand"] = brandSnapshot.data().name_en || "";
        }
      }
      carData["title"] = carData.name;
      carData["price"] = carData.price;
      // carData['price'] = (((carData.price * (localStorage.getItem('rate') || 1)) || carData.price.toString()) * numberOfDays).toFixed(1) + ' ' + (localStorage.getItem('code') || "AED")

      console.log("Processed car data:", carData);
      setCar(carData);
      setListing(await getCars("", 3, "", "", numberOfDays));
      setLoading(false);
    };
    if (carId) {
      fetchData();
    }
  }, [carId]);

  if (loading) {
    return <CarDetailsSkeleton />;
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="widget-breakcrumb">
            <div className="themesflat-container">
              <div className="breakcrumb">
                <div className="title-breakcrumb">
                  <Link className="home" href="/">
                    <FormattedMessage id="home" />
                  </Link>
                  <span>
                    <FormattedMessage id="Property Listing" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Breakcrumb */}
          {/* property-detail */}
          <div className="widget-property-detail">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="wrap-property-car flex">
                    <div className="box-1">
                      <div className="i-box-info flex align-items-center">
                        <div className="info flex">
                          <span>
                            <FormattedMessage id="brand" />
                            {`:`}
                          </span>
                          <span className="fw-4 mx-1"> {car.brand}</span>
                        </div>
                        <div className="info flex">
                          <span>
                            <FormattedMessage id="Model:" />
                          </span>
                          <span className="fw-4 mx-1">{car.model}</span>
                        </div>
                      </div>
                      <div className="title-heading">{car.name}</div>
                      <div className="text-address">
                        <i className="icon-map-1-1" />
                        <p>{car.location?.name}</p>
                      </div>
                    </div>
                    <div className="box-2 t-al-right">
                      <div className="price-wrap flex">
                        <p className="price-sale">
                          {(car.price * rate).toFixed(1)} {code}
                        </p>
                      </div>
                      <button
                        className="button-save-listing text-white"
                        onClick={() => setShowRentModal(true)}
                      >
                        <FormattedMessage id="Rent Now" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="gallary-property-details">
                    <ThumbSlider images={car?.images || []} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                  <div className="post-property">
                    <div className="wrap-description wrap-style">
                      <h4 className="title">
                        <FormattedMessage id="Description" />
                      </h4>
                      <p>{car.description}</p>
                    </div>
                    <div className="wrap-car-overview wrap-style">
                      <h4 className="title">
                        <FormattedMessage id="Car Overview" />
                      </h4>
                      <div className="listing-info">
                        <div className="row">
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Vector5" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Condition:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.condition}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group-1000002834" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Cylinders:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.cylinders}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Vector-13" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Stock Number:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.stockNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group5" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Fuel Type:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.fuelType}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Vector-13" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="VIN Number:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.vinNumber}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group-15" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Doors:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.doors}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Vector-13" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Year:" />
                                </span>
                                <p className="listing-info-value">{car.year}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Format-color-fill" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Color:" />
                                </span>
                                <p
                                  className="listing-info-value"
                                  style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: car.color,
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    verticalAlign: "middle",
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-dashboard-2" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Mileage:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.mileage}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group-22" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Seats:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.seats}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Vector-22" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Transmission:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.transmission}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group-31" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="City MPG:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.cityMpg}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-engine-1" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Engine Size:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.engineSize} L
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-Group-31" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Highway MPG:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.highwayMpg}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-6 item">
                            <div className="inner listing-infor-box">
                              <div className="icon">
                                <i className="icon-steering-wheel-1" />
                              </div>
                              <div className="content-listing-info">
                                <span className="listing-info-title">
                                  <FormattedMessage id="Driver Type:" />
                                </span>
                                <p className="listing-info-value">
                                  {car.driverType}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="wrap-car-feature wrap-style">
                      <h4 className="title">
                        <FormattedMessage id="Features" />
                      </h4>
                      <div className="tf-listing-info">
                        <div id="tf-features">
                          {car.features &&
                            Object.entries(car.features).map(
                              ([category, features]) =>
                                features.length > 0 && (
                                  <div className="features-item" key={category}>
                                    <h5 className="features-type-title">
                                      <FormattedMessage
                                        id={category}
                                        defaultMessage={category}
                                      />
                                    </h5>
                                    {features.map((feature) => (
                                      <div
                                        className="listing-feature-wrap"
                                        key={feature}
                                      >
                                        <i className="icon-Vector-32" />
                                        <FormattedMessage
                                          id={feature}
                                          defaultMessage={feature.replace(
                                            /_/g,
                                            " "
                                          )}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* property-detail */}
          {/* related-single-listing */}
          <div className="widget-related-single-listing">
            <div className="themesflat-container">
              <div className="listing-list-car-grid ">
                {listing.map((item) => (
                  <CarCard item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <ModalTestDriver isToggled4={isToggled4} handleToggle4={handleToggle4} />
      <ModalOfferPrice isToggled5={isToggled5} handleToggle5={handleToggle5} />
      <ModalRentDuration
        isOpen={showRentModal}
        onClose={() => setShowRentModal(false)}
        pricePerDay={car?.price}
        car={car}
      />
    </>
  );
}
