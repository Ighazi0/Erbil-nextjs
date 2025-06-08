"use client";

import { FormattedMessage } from "react-intl";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageContext } from "@/components/translation/translationLayout";

export default function CarCard({ item }) {
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
      className="listing-grid-item cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="listing-item-image">
        <div className="hover-listing-image">
          <div className="wrap-hover-listing">
            <div className="listing-item active">
              <div className="images">
                <img
                  src={imgSrc}
                  className="swiper-image tfcl-light-gallery"
                  alt="car"
                  onError={() => setImgError(true)}
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
            <div className="bullet-hover-listing">
              <div className="bl-item active" />
            </div>
          </div>
        </div>
      </div>

      <div className="listing-item-content">
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

        <div className="bottom-price-wrap py-3">
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
              width: "100px",
              height: "40px",
              textDecoration: "none",
              marginTop: "0px",
            }}
          >
            <FormattedMessage id="WhatsApp" defaultMessage="WhatsApp" />
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
      </div>
    </div>
  );
}
