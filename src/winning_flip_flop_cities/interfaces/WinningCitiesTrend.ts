export interface IWinningCitiesTrend {
    category: string[];
    operators: [{
        name: string;
        series: ISeriesTrend[];
    }]
}

export interface ISeriesTrend {
    name: string;
    data: number[]
}