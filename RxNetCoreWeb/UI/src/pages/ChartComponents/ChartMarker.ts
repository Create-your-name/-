import {ShapeAttrs} from '@antv/g-base';
import { ChartDP, ChartDPState } from './ChartDatapoint';

export const GMarker = {
    Circle: {
        symbol:'circle'
    },
    Square: {
        symbol: 'square'
    },
    Diamond: {
        symbol: 'diamond'
    },
    Triangle: {
        symbol: 'triangle'
    },
    TriangleDown: {
        symbol: 'triangle-down'
    },
}

const commonAttrs = {
    r: 5,
    lineWidth: 2,
    stroke: '#1890FF',
    fill: '#1890FF',
  };

const Xbar_AnnotatedSymbol:ShapeAttrs = {
    ...commonAttrs,
    ...GMarker.Circle
}

const Xbar_ExcludedSymbol:ShapeAttrs = {
    r: 5,
    lineWidth: 2,
    stroke: 'red',
    fill: 'red',
    ...GMarker.Triangle
}
const Xbar_FlaggedSymbol:ShapeAttrs = {
    ...commonAttrs,
    r:8,
    ...GMarker.Diamond
}
const Xbar_PlaceholderSymbol:ShapeAttrs = {
    
}
const Xbar_RuleSymbol:ShapeAttrs = {
    
}
const OOS:ShapeAttrs = {
    
}

const Normal:ShapeAttrs = {
    ...commonAttrs,
    ...GMarker.Square
}

export function chartPoint(data:ChartDP) {
    switch (data.state ?? ChartDPState.Normal) {
        case ChartDPState.Normal:
            return Normal;
        case ChartDPState.Flagged:
            return Xbar_FlaggedSymbol;
        case ChartDPState.Excluded:
            return Xbar_ExcludedSymbol;
    }

    return Normal;
}