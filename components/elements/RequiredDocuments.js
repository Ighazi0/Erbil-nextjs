"use client";

import { FormattedMessage } from "react-intl";

export default function RequiredDocuments() {
  return (
    <>
      <section className="bg-[#f9f6f1] py-8 md:py-12 rounded-xl">
        {/* Title */}
        <span className="title-text">
          <FormattedMessage id="required_documents_for_car_rental" />
        </span>
        {/* Subtitle */}
        <span className="subtitle-text">
          <FormattedMessage id="required_documents_subtitle" />
        </span>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-5xl mx-auto px-6 md:px-8">
          {/* Resident Card */}
          <div
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 border border-gray-200"
            style={{ padding: "20px" }}
          >
            <span className="title-text">
              <FormattedMessage id="as_a_resident" />
            </span>

            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="UAE_driving_license" />
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="emirates_ID" />
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="credit_card_or_debit_card" />
              </li>
            </ul>

            <p className="text-sm mt-6 text-gray-600">
              <strong>
                <FormattedMessage id="please_note" />
              </strong>{" "}
              <FormattedMessage id="as_a_UAE_resident_if_you_have_your_home_country_drivers_license" />{" "}
              <span className="text-red-600 underline">
                <FormattedMessage id="you_will_need_to_convert_your_license" />
              </span>{" "}
              <FormattedMessage id="before_you_start_driving_in_the_UAE" />
            </p>
          </div>

          {/* Tourist Card */}
          <div
            className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 border border-gray-200"
            style={{ padding: "20px" }}
          >
            <span className="title-text">
              <FormattedMessage id="as_a_tourist" />
            </span>

            <ul className="space-y-4 mt-6">
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="valid_passport_&_UAE_tourist_visa" />
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="international_driving_license_or_permit" />
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-600"></span>
                <FormattedMessage id="credit_card_or_debit_card" />
              </li>
            </ul>

            <p className="text-sm mt-6 text-gray-600">
              <strong>
                <FormattedMessage id="please_note" />
              </strong>{" "}
              <FormattedMessage id="tourist_note" />
            </p>
          </div>
        </div>
      </section>
      <style jsx global>{`
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
          margin-bottom: 1rem;
        }

        .subtitle-text {
          display: block;
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
}
