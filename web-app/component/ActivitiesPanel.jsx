import React, { useState, useEffect } from "react";
import Activity from "./Activity";

export const ActivitiesPanel = () => {
  const [guestInfo, setGuestInfo] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        .split("=")[1];
      try {
        const guestResponse = await fetch("/api/auth/protected/get-guest-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (!guestResponse.ok) {
          throw new Error(`Error fetching guest info: ${guestResponse.status}`);
        }
        const { guestInfo } = await guestResponse.json();
        // console.log("FROM ACITIVITIES PANEL: " + guestInfo);
        setGuestInfo(guestInfo);

        const planIdResponse = await fetch(`/api/plan?id=${guestInfo.id}`);
        if (!planIdResponse.ok) {
          throw new Error(`Error fetching plan info: ${planIdResponse.status}`);
        }
        const { planId } = await planIdResponse.json();
        const planResponse = await fetch(`/api/generateTrip?planId=${planId}`);
        const plan = await planResponse.json();
        console.log("PLAN DETAILS: " + plan);
        setPlan(plan);
      }
      catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="overflow-y-auto h-[700px] shadow-lg  rounded-lg">
      {(guestInfo && plan) ? (
        <Activity
          activity={plan["day_1"]} // only display day 1
        />
      ) : (
        <p>No guest information available.</p>
      )}
    </div>

  );
};

export default ActivitiesPanel;