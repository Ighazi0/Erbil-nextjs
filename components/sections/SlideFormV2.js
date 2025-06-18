"use client";
import { FormattedMessage } from "react-intl";
import { useEffect, useState } from "react";
import { db } from "../../app/firebase";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import CardCard from "@/components/elements/CarCard";

/* --- simple skeleton card --------------------- */
function SkeletonCard() {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md flex-1 border border-gray-200 animate-pulse"
      style={{ height: "500px" }}
    >
      <div className="h-40 bg-gray-300 rounded-md mb-4" />
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
}

/* ---------------------------------------------- */

export default function SlideFormV2() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  /* drag states */
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const minDragDistance = 50;

  /* fetch cars ------------------------------------------------ */
  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "cars"),
          where("offer", "==", true),
          limit(9)
        );
        const qs = await getDocs(q);
        const docs = qs.docs.map((car) => ({
          id: car.id,
          image: car.data().images?.[0] || "",
          title: car.data().name,
          price: car.data().price,
          ...car.data(),
        }));
        setCars(docs);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);
  /* ---------------------------------------------------------- */

  /* responsive page size ------------------------------------- */
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 600) setItemsPerPage(1);
      else if (window.innerWidth <= 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
      setCurrentPage(0);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  /* ---------------------------------------------------------- */

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const carsList = cars.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  /* drag handlers -------------------------------------------- */
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragDistance(0);
    e.preventDefault();
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    setDragDistance(startX - e.clientX);
  };
  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragDistance) > minDragDistance) {
      if (dragDistance > 0) {
        setCurrentPage((p) => (p === totalPages - 1 ? 0 : p + 1));
      } else {
        setCurrentPage((p) => (p === 0 ? totalPages - 1 : p - 1));
      }
    }
  };
  const onMouseLeave = () => isDragging && setIsDragging(false);
  /* ---------------------------------------------------------- */

  /* choose what to render inside the slider ------------------ */
  const itemsToRender = loading
    ? Array.from({ length: itemsPerPage }).map((_, i) => (
        <SkeletonCard key={`skeleton-${i}`} />
      ))
    : carsList.map((car) => <CardCard key={car.id} item={car} offer />);
  /* ---------------------------------------------------------- */

  return (
    <>
      <div className="slide-form-item pt-20">
        <span className="title-text">
          <FormattedMessage id="erbil_car_rental_special_offers" />
        </span>
        <span className="subtitle-text">
          <FormattedMessage id="spend_less_&_hire_best" />
        </span>

        <div className="themesflat-container">
          <div className="slider-wrap">
            <div
              className="horizontal-list-wrapper"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <button
                onClick={() =>
                  setCurrentPage((p) => (p === 0 ? totalPages - 1 : p - 1))
                }
                className="arrow-button"
                disabled={loading}
              >
                ←
              </button>

              <div className="horizontal-list">{itemsToRender}</div>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p === totalPages - 1 ? 0 : p + 1))
                }
                className="arrow-button"
                disabled={loading}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* existing styles (unchanged) */}
      <style jsx global>{`
        .slide-form-v2 {
          background-color: #f9f6f1;
          padding: 2rem 0;
          border-radius: 10px;
        }

        .title-text,
        .subtitle-text {
          display: block;
          width: 100%;
          text-align: center;
          font-weight: 500;
        }

        .title-text {
          font-size: 2rem;
          color: #1f2937;
          font-weight: 700;
        }

        .subtitle-text {
          font-size: 1rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .horizontal-list-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          gap: 1rem;
          width: 100%;
          user-select: none;
          cursor: grab;
        }

        .horizontal-list-wrapper:active {
          cursor: grabbing;
        }

        .arrow-button {
          background-color: #a88e70;
          color: white;
          border: none;
          padding: 0.3rem 0.6rem;
          font-size: 0.8rem;
          border-radius: 0.25rem;
          width: 40px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .arrow-button:hover {
          background-color: #8a7052;
        }

        .arrow-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .horizontal-list {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          overflow: hidden;
          width: 90%;
          justify-content: center;
        }

        @media (min-width: 1025px) {
          .horizontal-list {
            justify-content: flex-start;
          }
          .horizontal-list > * {
            flex: 0 0 calc(33.33% - 0.67rem);
            min-width: calc(33.33% - 0.67rem);
          }
        }

        @media (max-width: 1024px) and (min-width: 601px) {
          .horizontal-list > * {
            flex: 0 0 calc(50% - 0.5rem);
            min-width: calc(50% - 0.5rem);
          }
        }

        @media (max-width: 600px) {
          .horizontal-list > * {
            flex: 0 0 100%;
            min-width: 100%;
          }
          .arrow-button {
            width: 10%;
          }
        }
      `}</style>
    </>
  );
}
