import { useMemo } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";

const getFilterStartWeek = () => {
    const state = useSelectFilter();
    const { yearweeks } = useFetchData();
    const filterStartWeek = useMemo(() => {
        if (!state.endweek) {
            return selectOptionTransform((yearweeks ?? []).map((w) => w.toString()));
        } else {
            return selectOptionTransform(
                (yearweeks ?? []).filter((w) => w <= state.endweek).map((w) => w.toString())
            );
        }
    }, [state.endweek, yearweeks]);
    return filterStartWeek;
};
export default getFilterStartWeek;