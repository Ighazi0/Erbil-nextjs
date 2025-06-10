"use client";
import { useEffect, useState } from "react";
import { db } from "../../app/firebase";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import CardCard from "@/components/elements/CarCard";

export default function SlideFormV2() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const getCars = async () => {
    let q = query(collection(db, "cars"), where("offer", "==", true), limit(9));

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((car) => ({
      id: car.id,
      image: car.data().images?.[0] || "",
      title: car.data().name,
      price: car.data().price,
      ...car.data(),
    }));
    setCars(docs);
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(3);
      }
      setCurrentPage(0);
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const carsList = cars.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

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
                <div className="horizontal-list-wrapper">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={currentPage === 0}
                    className="arrow-button"
                  >
                    ←
                  </button>

                  <div className="horizontal-list">
                    {carsList.map((car) => (
                      <CardCard key={car.id} item={car} />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages - 1)
                      )
                    }
                    disabled={currentPage >= totalPages - 1}
                    className="arrow-button"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .horizontal-list-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
          gap: 1rem;
          width: 100%;
        }

        .arrow-button {
          background-color: #a88e70;
          color: white;
          border: none;
          padding: 0.3rem 0.6rem;
          font-size: 0.8rem;
          border-radius: 0.25rem;
          width: 5%;
          cursor: pointer;
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
        }

        .horizontal-item {
          flex: 0 0 calc(33.33% - 0.67rem);
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .horizontal-item {
            flex: 0 0 100%;
          }
          .arrow-button {
            width: 10%;
          }
        }
      `}</style>
    </>
  );
}
