"use client";
import Layout from "@/components/layout/Layout";
import ThumbSlider from "@/components/slider/ThumbSlider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CarCard from "@/components/elements/CarCard";
import { getCars } from "@/utils/cars";
import CarDetailsSkeleton from "@/app/components/skeletons/CarDetailsSkeleton";
import ModalRentDuration from "@/app/components/elements/ModalRentDuration";
import { LanguageContext } from "@/components/translation/translationLayout";

export default function ListingDetails({ params }) {
  const carId = params?.id;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);
  const [showRentModal, setShowRentModal] = useState(false);
  const { numberOfDays, rate, code } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      const q = await getDoc(doc(db, "cars", carId));
      const carData = q.data();
      carData["id"] = q.id;

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

      setCar(carData);
      const relatedCars = await getCars("", 3, "", "", numberOfDays);
      setListing(relatedCars);
      setLoading(false);
    };

    if (carId) {
      fetchData();
    }
  }, [carId, numberOfDays]);

  if (loading) return <CarDetailsSkeleton />;

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
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

        <div className="widget-property-detail">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-lg">
                <div className="wrap-property-car flex">
                  <div className="box-1">
                    <div className="i-box-info flex align-items-center">
                      <div className="info flex flex-column align-items-start">
                        <div className="title-heading">{car.name}</div>
                        <div className="d-flex">
                          <span>
                            <FormattedMessage id="brand" />:
                          </span>
                          <span className="fw-4 mx-1">{car.brand}</span>
                        </div>
                        <div className="d-flex">
                          <span>
                            <FormattedMessage id="Model:" />
                          </span>
                          <span className="fw-4 mx-1">{car.model}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-2 t-al-right">
                    <div className="price-wrap flex">
                      <p className="price-sale">
                        {(car.price * rate).toFixed(1)} {code}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0px",
                      }}
                    >
                      <button
                        className="button-save-listing text-white"
                        style={{
                          textAlign: "center",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          width: "200px",
                          height: "40px",
                          textDecoration: "none",
                          marginBottom: "6px",
                        }}
                        onClick={() => setShowRentModal(true)}
                      >
                        <FormattedMessage id="rent_now" />
                      </button>
                      <a
                        href={`https://wa.me/971557754102?text=${encodeURIComponent(
                          `I'm interested in renting the car: ${car.name}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-save-listing text-white d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "#25D366",
                          textAlign: "center",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          width: "200px",
                          height: "40px",
                          textDecoration: "none",
                          marginTop: "0px",
                        }}
                      >
                        <FormattedMessage id="whatsApp" />
                      </a>
                    </div>
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
                  {car.description?.trim() && (
                    <div className="wrap-description wrap-style">
                      <h4 className="title">
                        <FormattedMessage id="Description" />
                      </h4>
                      <p>{car.description}</p>
                    </div>
                  )}

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

        <div className="widget-related-single-listing">
          <div className="themesflat-container">
            <div className="listing-list-car-grid">
              {listing.map((item) => (
                <CarCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </Layout>

      {/* Rent Modal */}
      <ModalRentDuration
        isOpen={showRentModal}
        onClose={() => setShowRentModal(false)}
        pricePerDay={car?.price}
        car={car}
      />
    </>
  );
}
