"use client";

import { genreInterface } from "@/app/logic/genres";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div>Loading</div>, // Replace <Loading /> with your custom loading component
});

type IData = [number[], genreInterface[]];

interface IProps {
  categories: string[];
  data: IData;
}

//RADAR CHART HAPPENS BELOW, HOWEVER I DO IT!
const GenreChart = (props: IProps) => {
  const turnDataInSeries = (data: IData) => {
    console.log("RFEAD!!!!!!!!", data);
    let dataArr = [];
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        dataArr.push({
          name: `Series ${i}`,
          data: data[i],
        });
      } else if (i == 1) {
        for (let j = 0; j < data[i].length; j++) {
          let playlistGenreValues = Object.values(data[i][j]);
          dataArr.push({
            name: `Series ${i}-${j}`,
            data: playlistGenreValues,
          });
        }
      }
    }

    return dataArr;
  };

  console.log("testing", turnDataInSeries(props.data));

  const chart: ApexOptions = {
    chart: {
      type: "radar",
    },
    series: turnDataInSeries(props.data),
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
