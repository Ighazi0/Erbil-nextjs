"use client";
import { useState, useEffect, useContext } from "react";
import { getCars } from "@/utils/cars";
import { LanguageContext } from "../translation/translationLayout";
import CardCard from "@/components/elements/CarCard";
import { FormattedMessage } from "react-intl";

export default function PopularMakesTab1() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const { numberOfDays } = useContext(LanguageContext);

  const fetchData = async (isNext = false) => {
    if (loading || (isNext && isLastPage)) return;

    setLoading(true);
    const cars = await getCars(
      "",
      9,
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

    if (cars.length < 6) {
      setIsLastPage(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(false);
  }, [numberOfDays]);

  return (
    <>
      <div className="themesflat-container pt-30">
        <div className="populer-makes">
          <div className="tab-content" id="pills-tabContent-v2 ">
            <div className="tab-pane fade show active">
              <div className="car-list-item">
                {listing.map((car) => (
                  <CardCard key={car.id} item={car} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {!isLastPage && !loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              className="btn btn-primary btn-sm w-auto"
              onClick={() => fetchData(true)}
            >
              <FormattedMessage id="load_more" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
