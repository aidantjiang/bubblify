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
  data: number[] | number[][];
}

//RADAR CHART HAPPENS BELOW, HOWEVER I DO IT!
const GenreChart = (props: IProps) => {
  const turnDataInSeries = (data: number[][]) => {
    let dataArr = [];
    for (let i = 0; i < data.length; i++) {
      dataArr.push({
        name: `Series ${i}`,
        data: data[i],
      });
    }

    return dataArr;
  };

  console.log("testing", turnDataInSeries(props.data as number[][]));

  const chart: ApexOptions = {
    chart: {
      type: "radar",
    },
    series: turnDataInSeries(props.data as number[][]),
    // series: [
    //   {
    //     name: "test",
    //     data: props.data,
    //   },
    // ],
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
