import React from 'react';
import { useSelectFilter } from '../hooks/useSelectFilter';
import { useDispatch } from 'react-redux';
import { useFetchData } from '../hooks/useFetchData';
import { selectOptionTransform } from '../../common/utils/selectOptionTransform';
import { FilterAction } from '../reducers/FilterReducer';
import { Select, Spin } from 'antd';
import _ from 'lodash';

interface BadSampleFilterProps { }

const BadSampleFilter: React.FC<BadSampleFilterProps> = ({ }) => {
  const state = useSelectFilter();
  const dispatch = useDispatch();
  const { cities } = useFetchData();
  return (
    <>
      <Select
        value={state.city?.toString()}
        style={{ minWidth: "130px" }}
        options={selectOptionTransform(cities ?? [])}
        onChange={(v) => dispatch(FilterAction.setCity(v))}
        showSearch
        onFocus={() => {
          if (state.searchCity !== "") {
            dispatch(FilterAction.setSearchCity(""));
          }
        }}
        onSearch={_.debounce((v) => {
          dispatch(FilterAction.setSearchCity(v));
        }, 1000)}
        notFoundContent={!cities ? <Spin size="small" /> : null}
        filterOption={false}
      />
    </>
  );
}

export default BadSampleFilter;