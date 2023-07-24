import { Annotation } from "@antv/g2plot";
import { ChartDP } from "./ChartDatapoint";

export function pointAnnotation(data: ChartDP) {
    const dm:Annotation = {
        type: 'dataMarker',
        position: [data.key, data.value],
        text: {
          content: data.annotated!,
          style: {
            fill:"red",
            textAlign: 'left',
          },
        },
        line: {
          length: 20,
        },
        point: {
          style: {
            r: 10,
            lineCap:"square",
            fill: '#f5222d',
            stroke: '#f5222d',
          },
        },
        autoAdjust: false,
      }
    
    return dm;
}

export const makeLineAnnotations = (y:number, name:string, color:string)=> {
    const lineDash = [5,10];
    const lineWidth = 1;

    let a:Annotation = {
        type: 'line',
        start: ['min', y],
        end: ['max', y],
        text: {
          content: name,
          offsetY: -2,
          style: {
            textAlign: 'left',
            fontSize: 10,
            fill: 'dark',
            textBaseline: 'bottom',
          },
        },
        style: {
          stroke: color,
          lineDash,
          lineWidth
        },
      }
    return a;
}