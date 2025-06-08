"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { getCars } from "@/utils/cars";
import { LanguageContext } from "../translation/translationLayout";
import { FormattedMessage } from "react-intl";

const placeholderImage = "/assets/images/logo/eblpng.png";

export default function PopularMakesTab1() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const { numberOfDays, rate, code } = useContext(LanguageContext);

  const fetchData = async (isNext = false) => {
    if (loading || isLastPage) return;

    setLoading(true);
    const cars = await getCars(
      "",
      6,
      "",
      "",
      numberOfDays,
      null,
      null,
      isNext,
      lastDoc
    );

    if (isNext) {
      setListing((prev) => [...prev, ...cars]);
    } else {
      setListing(cars);
    }

    if (cars.length > 0) {
      setLastDoc(cars[cars.length - 1].createdAt);
    }

    if (cars.length < 3) {
      setIsLastPage(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom && !loading && !isLastPage) {
        fetchData(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, isLastPage, lastDoc]);

  const handleImgError = (carId) => {
    setImgErrors((prev) => ({ ...prev, [carId]: true }));
  };

  return (
    <>
      <div className="tab-content" id="pills-tabContent-v2">
        <div className="tab-pane fade show active">
          <div className="car-list-item">
            {listing.map((car) => {
              const imgSrc =
                !imgErrors[car.id] && car.image ? car.image : placeholderImage;

              return (
                <div className="tf-car-service" key={car.id}>
                  <Link href={`/car-details/${car.id}`} className="image">
                    <div className="stm-badge-top">
                      <span>{car.year}</span>
                    </div>
                    <div className="listing-images">
                      <div className="hover-listing-image">
                        <div className="wrap-hover-listing">
                          <div className="listing-item active" title={car.name}>
                            <div className="images">
                              <img
                                src={imgSrc}
                                className="swiper-image tfcl-light-gallery"
                                alt="car"
                                onError={() => handleImgError(car.id)}
                                style={
                                  imgSrc === placeholderImage
                                    ? {
                                        display: "block",
                                        margin: "0 auto",
                                        maxWidth: "175px",
                                        maxHeight: "175px",
                                        objectFit: "contain",
                                      }
                                    : {}
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="content">
                    <h6 className="title">
                      <Link href="/dealer-details">{car.name}</Link>
                    </h6>
                    <div className="description">
                      <ul>
                        <li className="listing-information fuel">
                          <i className="icon-gasoline-pump-1" />
                          <div className="inner">
                            <span>
                              <FormattedMessage
                                id="fuelType"
                                defaultMessage="Fuel Type"
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
                                id="mileage"
                                defaultMessage="Mileage"
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
                                id="transmission"
                                defaultMessage="Transmission"
                              />
                            </span>
                            <p>{car.transmission}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bottom-btn-wrap py-3">
                      <div className="price-wrap">
                        <span className="price-sale">
                          {(car.price * rate).toFixed(1)} {code}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-4 px-2">
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
                          width: "100px",
                          height: "40px",
                          textDecoration: "none",
                          marginTop: "0px",
                        }}
                      >
                        <FormattedMessage
                          id="WhatsApp"
                          defaultMessage="WhatsApp"
                        />
                      </a>
                      <a
                        href={`tel:+971557754102`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          backgroundColor: "#A88E70",
                          textAlign: "center",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          width: "100px",
                          height: "40px",
                          textDecoration: "none",
                          marginTop: "0px",
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl shadow-md transition-all duration-200"
                      >
                        <i className="icon-phone text-lg" />
                        Call Now
                      </a>
                    </div>
                  </div>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
