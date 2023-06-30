"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

interface IProps {
  categories: string[];
  data: number[];
}

//RADAR CHART HAPPENS BELOW, HOWEVER I DO IT!
const GenreChart = (props: IProps) => {
  const chart: ApexOptions = {
    chart: {
      type: "radar",
    },
    series: [
      {
        name: "Series 1",
        data: props.data,
      },
    ],
    title: {
      text: "Basic Radar Chart",
    },
    xaxis: {
      categories: props.categories,
    },
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart
          options={chart}
          series={chart.series}
          type={"radar"}
          width={"100%"}
          height={"100%"}
        />
      </Suspense>
    </>
  );
};

export default GenreChart;
