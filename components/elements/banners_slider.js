"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/app/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const timeoutRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const fetchBanners = async () => {
    try {
      setLoading(true); // Start loading
      const querySnapshot = await getDocs(collection(db, "banners"));
      const images = querySnapshot.docs.map((doc) => doc.data().image);
      setBanners(images);
    } catch (err) {
      console.error("Error fetching banners:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (banners.length === 0) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [current, banners]);

  const onTouchStart = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = startXRef.current - e.touches[0].clientX;

    if (Math.abs(diff) > 50) {
      setCurrent((prev) =>
        diff > 0
          ? prev === banners.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? banners.length - 1
          : prev - 1
      );
      isDraggingRef.current = false;
    }
  };

  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const onMouseDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const diff = startXRef.current - e.clientX;

    if (Math.abs(diff) > 50) {
      setCurrent((prev) =>
        diff > 0
          ? prev === banners.length - 1
            ? 0
            : prev + 1
          : prev === 0
          ? banners.length - 1
          : prev - 1
      );
      isDraggingRef.current = false;
    }
  };

  const onMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="slider-container" style={{ height: "300px" }}>
      <div className="slide">
        <div className="bg-gray-300 rounded-[15px] animate-pulse" />
      </div>
    </div>
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
              {loading ? (
                <SkeletonLoader />
              ) : (
                <div
                  className="slider-container"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                >
                  <div
                    className="slider-track"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {banners.map((src, i) => (
                      <div className="slide" key={i}>
                        <img src={src} alt={`Banner ${i + 1}`} />
                      </div>
                    ))}
                  </div>

                  <div className="indicators">
                    {banners.map((_, idx) => (
                      <button
                        key={idx}
                        className={`dot ${current === idx ? "active" : ""}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-container {
          position: relative;
          overflow: hidden;
          margin: 0 auto;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgb(0 0 0 / 0.15);
          user-select: none;
        }

        .slider-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }

        .slide {
          min-width: 100%;
          user-select: none;
        }

        .slide img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 15px;
          pointer-events: none;
          user-select: none;
        }

        .indicators {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dot {
          all: unset;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #808080;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dot.active {
          background-color: #a88e70;
          box-shadow: 0 0 4px #a88e70;
        }

        .dot:hover {
          background-color: #8a7052;
        }
      `}</style>
    </>
  );
}
