import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from "../data/Wine-Data.json"

// define "type" globally
type outputDatatype = {[key:number]:{value:number,repeat:number}}


export default function BarChart(){
    //It's contain average of Malic acid
    const [yaxisData, setyaxisData] = useState<number[]>([])
    // It's contain categoty of Alcohol
    const [category, setcategory] = useState<string[]>([])

    //getData function create an objects which contain Alcohol category as key 
    //and in this category there are two properties which is total malic acid value and total count of malic acid
    const getData = () => {
      let outputData:outputDatatype={}
        data.forEach((el)=>{
          if(outputData[el["Alcohol"]]==undefined) {
            outputData[el["Alcohol"]]={value:el["Malic Acid"],repeat:1}
          } else {
            outputData[el["Alcohol"]].value+=el["Malic Acid"]
            outputData[el["Alcohol"]].repeat++
          }
      })
      average(outputData)
    }

    // average function set the data in both state
    const average = (rawData:outputDatatype) => {
      setcategory(Object.keys(rawData))
      setyaxisData(Object.values(rawData).map((el)=>(el.value/el.repeat)))
    }

    useEffect(()=>{
      getData()
    },[])




    const options = {
      title:{
        text:"Bar Chart",
        subtext:"Average of Malic acid of every accohol category",
        left:"center",
        textStyle:{
            fontSize:"24"
        },
        subtextStyle:{
            fontSize:"14"
        }
      },
      xAxis: {
        type: "category",
        data: category.map((el)=>`Category ${el}`),
        name:"Alcohol Category",
        nameLocation:"middle",
        nameTextStyle:{
          color:"blue",
          fontSize:"18px",
          fontWeight:"bolder",
          padding:[10,10]
        }
      },
      yAxis: {
        type: 'value',
        name:"Average of Malic Acid",
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
          data: yaxisData,
          type: 'bar'
        }
      ]
    }; 


    return (
        <ReactEcharts option={options}/>
    )
}