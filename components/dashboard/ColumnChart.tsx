"use client";
// import { ApexOptions } from "apexcharts";
import { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// remove type ApexOptions cus it take >500KB
const options: any = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["Free", "Premium"],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ColumnChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

interface ColumnChartProps {
  freeUsers: number;
  premiumUsers: number;
}

const ColumnChart: React.FC<ColumnChartProps> = ({
  freeUsers,
  premiumUsers,
}) => {
  const [state, setState] = useState<ColumnChartState>({
    series: [
      {
        name: "Premium",
        data: [0, premiumUsers],
      },
      {
        name: "Free",
        data: [freeUsers, 0],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            User Overview
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <Chart
            options={options}
            series={state.series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnChart;
