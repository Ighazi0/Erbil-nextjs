"use client";
import { useState, useEffect, useContext } from "react";
import { getCars } from "@/utils/cars";
import { LanguageContext } from "../translation/translationLayout";
import CardCard from "@/components/elements/CarCard";

export default function PopularMakesTab1() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const { numberOfDays } = useContext(LanguageContext);

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

  return (
    <>
      <div className="tab-content" id="pills-tabContent-v2">
        <div className="tab-pane fade show active">
          <div className="car-list-item">
            {listing.map((car) => {
              return <CardCard key={car.id} item={car} />;
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
