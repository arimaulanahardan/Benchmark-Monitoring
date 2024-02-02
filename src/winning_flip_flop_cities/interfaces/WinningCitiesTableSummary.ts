export interface IWinningCitiesTableSummary {
    city: string;
    status_win: string;
    operator_win: string;
    sma_tsel: number;
    upper_level_comp: number;
    sample_quality_match: number;
    gap_sma_upper_level_comp: number;
    target_sample_bad: number;
    total_target_clear_bad_sample: number;
}