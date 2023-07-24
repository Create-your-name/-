
export interface ChartDP {
    key : string,
    value : number,
    state? : ChartDPState,
    annotated? : string
}

export enum ChartDPState {
    Normal,
    Excluded,
    Flagged,
    OOS,
    OOC,
    Placeholder,
}