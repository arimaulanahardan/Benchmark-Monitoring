import { useCallback, useEffect, useState } from "react";
import { AchievementTableService } from "../services/AchievementTableService";
import { IAchievementTable } from "../interfaces/AchievementTable";
import { useSelectFilter } from "../../filter/hooks/useSelectFilter";

const service = new AchievementTableService();

export function useFetchData() {
  const [achievement, setAchievement] = useState<IAchievementTable[]>();
  const [loading, setLoading] = useState(false);
  const { yearweek } = useSelectFilter();
  const fetchAchievement = useCallback(async () => {
    try {
      setLoading(true);
      const res = await service.getAchievement({ yearweek });

      setAchievement(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [yearweek]);

  useEffect(() => {
    fetchAchievement();
  }, [fetchAchievement]);
  return {
    achievement,
    loading,
  };
}
