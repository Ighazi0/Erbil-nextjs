"use client";

import { FormattedMessage } from "react-intl";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/components/translation/translationLayout";

export default function CarCard({ item, offer = false }) {
  const { rate, code } = useContext(LanguageContext);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const placeholderImage = "/assets/images/logo/eblpng.png";
  const imgSrc = !imgError && item.image ? item.image : placeholderImage;

  const handleCardClick = () => {
    router.push(`/car-details/${item.id}`);
  };

  return (
    <div
      key={item.id}
      className="listing-grid-item cursor-pointer relative"
      onClick={handleCardClick}
    >
      {offer && (
        <div
          className="absolute top-2 right-2 text-white text-xs font-bold px-5 py-1 pr-2 rounded-md z-10 text-end"
          style={{
            backgroundColor: "#ff0000",
            transform: "rotate(5deg)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <FormattedMessage id="hot_offer" />
        </div>
      )}

      <div className="images">
        <img
          src={imgSrc}
          className="swiper-image tfcl-light-gallery"
          alt="car"
          onError={() => setImgError(true)}
          style={{
            display: "block",
            margin: "0 auto",
            height: "180px",
            width: !imgError && item.image ? null : "200px",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="listing-item-content">
        {!offer && (
          <div className="listing-top-content">
            <h6 className="title">
              <span>{item.title}</span>
            </h6>
            <div className="description">
              <ul>
                <li className="listing-information fuel">
                  <i className="icon-gasoline-pump-1" />
                  <div className="inner">
                    <span>Fuel type</span>
                    <p>{item.fuelType}</p>
                  </div>
                </li>
                <li className="listing-information size-engine">
                  <i className="icon-Group1" />
                  <div className="inner">
                    <span>Mileage</span>
                    <p>{item.mileage}</p>
                  </div>
                </li>
                <li className="listing-information transmission">
                  <i className="icon-gearbox-1" />
                  <div className="inner">
                    <span>Transmission</span>
                    <p>{item.transmission}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {offer && (
          <div className="offer-texts px-0 pt-2">
            <div
              className="flex items-center text-sm mb-1"
              style={{ color: "#000000" }}
            >
              <span className="mr-2" style={{ color: "#22C55E" }}>
                ✓
              </span>
              <FormattedMessage id="free_kilometer" />
            </div>
            <div
              className="flex items-center text-xs mb-1"
              style={{ color: "#000000" }}
            >
              <span className="mr-2" style={{ color: "#22C55E" }}>
                ✓
              </span>
              <FormattedMessage id="free_drop_off_anywhere_in_Dubai" />
            </div>
            <div
              className="flex items-center text-xs mb-1"
              style={{ color: "#000000" }}
            >
              <span className="mr-2" style={{ color: "#22C55E" }}>
                ✓
              </span>
              <FormattedMessage id="baby_seat_available" />
            </div>
            <div
              className="flex items-center text-xs"
              style={{ color: "#000000" }}
            >
              <span className="mr-2" style={{ color: "#22C55E" }}>
                ✓
              </span>
              <FormattedMessage id="no_deposit_available" />
            </div>
          </div>
        )}

        <div className="bottom-price-wrap pb-3">
          <div className="price-wrap">
            <p className="price-sale">
              {(item.price * rate).toFixed(1)} {code}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4 px-2">
          <a
            href={`https://wa.me/971557754102?text=${encodeURIComponent(
              `I'm interested in renting the car: ${item.name}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-save-listing text-white d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#25D366",
              textAlign: "center",
              padding: "10px 16px",
              borderRadius: "8px",
              width: "100%",
              height: "30px",
              textDecoration: "none",
              marginTop: "0px",
            }}
          >
            <FormattedMessage id="whatsApp" />
          </a>
          <a
            href={`tel:+971557754102`}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="button-save-listing text-white d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#A88E70",
              textAlign: "center",
              padding: "10px 16px",
              borderRadius: "8px",
              width: "100%",
              height: "30px",
              textDecoration: "none",
              marginTop: "0px",
            }}
          >
            <FormattedMessage id="call_now" />
          </a>
        </div>
      </div>

      <style jsx>{`
        .listing-grid-item {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
