export interface IWinningCitiesTable {
    yearweek: number;
    site_id: string;
    bad_sample: number;
    sample_quality: number;
    good_quality: number;
    funneling_issue: string;
    payload: number;
    delta_payload: number;
    throughput: number;
    delta_throughput: number;
}