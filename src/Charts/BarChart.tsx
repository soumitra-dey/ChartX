import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import data from "../data/Wine-Data.json"

type outputDatatype = {[key:number]:{value:number,repeat:number}}


export default function BarChart(){
    const [yaxisData, setyaxisData] = useState<number[]>([])
    const [category, setcategory] = useState<string[]>([])

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
        // <div></div>
    )
}