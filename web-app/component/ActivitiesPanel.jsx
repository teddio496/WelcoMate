import React, { useState, useEffect } from "react";

export const ActivitiesPanel = () => {
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      .split("=")[1];
      try {
        
      }
      catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Activities Panel</h1>
    </div>
  );
};

export default ActivitiesPanel;