export interface IBadSampleTrend {
    category: string[];
    series: {
        name: string;
        data: number[];
        percentage: number[];
    }[];
}