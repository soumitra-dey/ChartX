import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from "../data/Wine-Data.json"

export default function ScatterPlot() {
    //It is a 2d Array which contains all Color intencity on 0th index and Hue on 1st index
    const [axisData, setaxisData] = useState<number[][]>([])
    
    //getdata makes a dataset of color intensity and hue, thereafter update the state
    const getData = () => {
        let wholeData:number[][]=[]
        data.forEach((el)=>{
            wholeData.push([Number(el["Color intensity"]),Number(el["Hue"])])
        })
        setaxisData(wholeData)
    }

    useEffect(()=>{
        getData()
    },[])


    const option = {
        title:{
            text:"Scatter Chart",
            subtext:"Color intencity and Hue data",
            left:"center",
            textStyle:{
                fontSize:"24"
            },
            subtextStyle:{
                fontSize:"14"
            }
        },
        xAxis: {
            name:"Color Intensity",
            nameLocation:"middle",
            nameTextStyle:{
                color:"blue",
                fontSize:"18px",
                fontWeight:"bolder",
                padding:[10,10]
            }
        },
        yAxis: {
            name:"Hue",
            nameLocation:"middle",
            nameTextStyle:{
                color:"cadetblue",
                fontSize:"18px",
                fontWeight:"bolder",
            padding:[5,5]
            }
        },
        series: [
          {
            data: axisData,
            type: 'scatter'
          }
        ]
    }; 

    return (
        <ReactEcharts option={option} />
    )
}