import { Item } from '@types/weather.ts';

/**
 * 현재 시간 기준으로 가장 가까운 정각을 HHMM 형식으로 반환
 * @returns {string} - baseTime (예: "1000")
 */
const getPreviousHour = (): string => {
  const now = new Date();

  // 현재 분 기준으로 30분 이전이면 1시간 전으로 설정
  if (now.getMinutes() < 30) {
    now.setHours(now.getHours() - 1);
  }

  // 날짜와 시간을 현지 시간 기준으로 계산
  const baseDate =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');

  const baseTime = now.getHours().toString().padStart(2, '0') + '30';
  console.log('baseDate:', baseDate);
  console.log('baseTime:', baseTime);

  return { baseDate, baseTime }; // 날짜와 시간을 반환
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
  const { baseDate, baseTime } = getPreviousHour();

  console.log('날짜, 시간: ', baseDate, baseTime);
  console.log('위치 좌표: ', nx, ny);

  const url = `${import.meta.env.VITE_WEAHTER_BASE_URL}?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=1&numOfRows=60&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();

      if (!data.response?.body?.items?.item) {
        console.error('날씨 데이터를 찾을 수 없습니다:', data);
        throw new Error('API 응답 데이터가 올바르지 않습니다.');
      }
      const filteredData = data.response.body.items.item.filter((item: Item) =>
        ['T1H', 'RN1', 'SKY'].includes(item.category)
      );
      console.log('날씨 응답 데이터:', filteredData);
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
