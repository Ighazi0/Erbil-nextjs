import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

export default function SmallSwitch({ carData }) {
  const [isOn, setIsOn] = useState(carData.offer || false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    handleToggleOffer();
  };

  const handleToggleOffer = async () => {
    try {
      const carRef = doc(db, "cars", carData.id);
      await updateDoc(carRef, {
        offer: !isOn,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  return (
    <div
      onClick={toggleSwitch}
      role="switch"
      aria-checked={isOn}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSwitch();
        }
      }}
      style={{
        position: "relative",
        display: "inline-block",
        width: "32px",
        height: "16px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isOn ? "#4caf50" : "#ccc",
          borderRadius: "16px",
          transition: "0.3s",
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "12px",
          width: "12px",
          left: isOn ? "18px" : "4px",
          bottom: "2px",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "0.3s",
        }}
      />
    </div>
  );
}
