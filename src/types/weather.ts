export interface Item {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface ForecastProps {
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}

export interface HourWeatherProps {
  time: string;
  temperature: string;
  skyIcon: string;
}
