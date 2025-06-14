"use client";

import React from "react";
import { FormattedMessage } from "react-intl";

const FeaturesSection = () => {
  return (
    <div
      style={{
        backgroundColor: "#e6f0fa",
        padding: "20px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: "100%",
        overflowX: "auto",
        margin: "20px 0 20px 0",
        flexWrap: "wrap",
        "@media (max-width: 768px)": {
          flexDirection: "column",
          alignItems: "stretch",
        },
      }}
    >
      <div
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <span
          role="img"
          aria-label="money"
          style={{ fontSize: "50px", marginRight: "20px" }}
        >
          💰
        </span>
        <div>
          <h3 style={{ fontSize: "18px", color: "#333" }}>
            {" "}
            <FormattedMessage id="no_hidden_costs" />
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
            <FormattedMessage id="simple_and_transparent_pricing" />
          </p>
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <span
          role="img"
          aria-label="calendar"
          style={{ fontSize: "50px", marginRight: "20px" }}
        >
          📅
        </span>
        <div>
          <h3 style={{ fontSize: "18px", color: "#333" }}>
            {" "}
            <FormattedMessage id="free_cancellation" />
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
            <FormattedMessage id="free_cancellation_up_to_24_hours" />
          </p>
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <span
          role="img"
          aria-label="customer-service"
          style={{ fontSize: "50px", marginRight: "20px" }}
        >
          📞
        </span>
        <div>
          <h3 style={{ fontSize: "18px", color: "#333" }}>
            <FormattedMessage id="24_7_customer_care" />
          </h3>
          <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
            <FormattedMessage id="we_are_just_a_phone_call_away" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return <FeaturesSection />;
}
