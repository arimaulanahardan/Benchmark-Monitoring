import { useMemo } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { useSelectFilter } from "../hooks/useSelectFilter";
import { selectOptionTransform } from "../../common/utils/selectOptionTransform";

const getFilterEndWeek = () => {
    const state = useSelectFilter();
    const { yearweeks } = useFetchData();
    const filterEndWeek = useMemo(() => {
        if (!state.startweek) {
            return selectOptionTransform((yearweeks ?? []).map((w) => w.toString()));
        } else {
            return selectOptionTransform(
                (yearweeks ?? [])
                    .filter((w) => w >= state.startweek)
                    .map((w) => w.toString())
            );
        }
    }, [state.startweek, yearweeks]);
    return filterEndWeek;
};
export default getFilterEndWeek;