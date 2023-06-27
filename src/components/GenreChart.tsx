"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

//RADAR CHART HAPPENS BELOW, HOWEVER I DO IT!
