import { useMemo } from "react";

export function useQuery() {
  const search = window.location.search;
  const query = useMemo(() => {
    const params: any = {};
    const queryString = search.substring(1);
    const queryArray = queryString.split("&");
    queryArray.forEach((query) => {
      const [key, value] = query.split("=");
      params[key] = value;
    });
    return params;
  }, [search]);

  return query;
}
