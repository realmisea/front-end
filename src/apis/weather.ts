import { Item } from '@types/weather.ts';

/**
 * 현재 시간 기준으로 가장 가까운 정각을 HHMM 형식으로 반환
 * @returns {string} - baseTime (예: "1000")
 */
const getPreviousHour = (): string => {
  const now = new Date();
  const minutes = now.getMinutes();
  if (minutes < 30) {
    now.setHours(now.getHours() - 1);
    now.setMinutes(30, 0, 0); // 분, 초, 밀리
  } else {
    now.setMinutes(30, 0, 0);
  }
  const hours = now.getHours().toString().padStart(2, '0'); // 시를 2자리로 포맷팅
  const mins = now.getMinutes().toString().padStart(2, '0');
  return `${hours}00${mins}`; // HHMM 형식으로 반환
};

/**
 * 특정 위치의 초단기 예보 데이터를 fetch하는 함수
 * @param nx - X 좌표 (기상청 API에서 사용하는 격자 X 좌표)
 * @param ny - Y 좌표 (기상청 API에서 사용하는 격자 Y 좌표)
 * @returns - 예보 데이터 배열 (API에서 반환된 데이터 배열)
 */
/**
 * 특정 위치의 초단기 예보 데이터를 fetch하는 함수
 * @param nx - X 좌표
 * @param ny - Y 좌표
 * @returns - 예보 데이터 배열
 */
export const fetchWeatherData = async (nx: number, ny: number) => {
  const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const baseTime = getPreviousHour();

  // console.log('날짜, 시간: ', baseDate, baseTime);
  // console.log('위치 좌표: ', nx, ny);

  const url = `${import.meta.env.VITE_WEAHTER_BASE_URL}?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=1&numOfRows=60&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      const filteredData = data.response.body.items.item.filter((item: Item) =>
        ['T1H', 'RN1', 'SKY'].includes(item.category)
      );
      // console.log(filteredData);
      return filteredData;
    } else {
      const errorText = await response.text();
      console.error('Unexpected response format (not JSON):', errorText);
      throw new Error('Expected JSON response but received non-JSON format');
    }
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};
