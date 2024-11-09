import { ForecastProps } from '@types/weather.ts';
import { create } from 'zustand';
import { fetchWeatherData } from '@apis/weather.ts';

interface ForecastState {
  forecast: ForecastProps[];
  loadForecast: (nx: number, ny: number) => Promise<void>;
}

export const useForecastStore = create<ForecastState>((set) => ({
  forecast: [],
  loadForecast: async (nx, ny) => {
    try {
      const data = await fetchWeatherData(nx, ny);
      set({ forecast: data });
    } catch (error) {
      console.error('로드 실패!!!!', error);
    }
  }
}));
