import { IKpiInsight } from "../interfaces/KpiInsight";

export const InsightTemplate = (kpi: string, value: IKpiInsight) => {
  return {
    good_quality_first: (
      <p>
        The achievement score for Tutela's good quality in{" "}
        <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities won,</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    game_parameter_first: (
      <p>
        Tutela Game Score achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    video_score_netflix_first: (
      <p>
        Tutela Video Score achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    download_throughput_first: (
      <p>
        Tutela DL Throughput achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win</span> or{" "}
        <span>{value.city_win_percent}%,</span> above OKR target{" "}
        <span>{value.OKR_target}%</span>.
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    good_quality_second: (
      <p>
        Good Quality achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win,</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    game_parameter_second: (
      <p>
        Tutela Game Score achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win,</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    video_score_netflix_second: (
      <p>
        Tutela Video Score achievement in <span>{value.week}</span> is{" "}
        <span>{value.total_city_win} cities win,</span> or{" "}
        <span>{value.city_win_percent}%.</span>
        <br />
        <br />
        The bottom 3 regions are {value.regions?.join(", ")}
      </p>
    ),
    download_throughput_second: (
      <p>
        Download Throughput has won in <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities already meet OKR target
      </p>
    ),
    upload_throughput_second: (
      <p>
        Upload Throughput has won in <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities already meet OKR target
      </p>
    ),
    excellent_quality_second: (
      <p>
        Excellent Quality already win from all competitors and already win in{" "}
        <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities.
      </p>
    ),
    packetloss_second: (
      <p>
        Packet Loss already win from all competitors and already win in{" "}
        <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities.
      </p>
    ),
    latency_second: (
      <p>
        Latency already win from all competitors and already win in{" "}
        <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities.
      </p>
    ),
    jitter_second: (
      <p>
        Jitter already win from all competitors and already win in{" "}
        <span>{value.total_city_win}</span> or{" "}
        <span>{value.city_win_percent}%</span> cities.
      </p>
    ),
  }[kpi];
};
