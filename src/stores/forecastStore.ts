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
      const roundedNx = Math.round(nx);
      const roundedNy = Math.round(ny);

      const data = await fetchWeatherData(roundedNx, roundedNy);
      set({ forecast: data });
    } catch (error) {
      console.error('로드 실패!!!!', error);
    }
  }
}));
