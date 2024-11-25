import { Axios } from '@apis/Axios.ts';

export const createRoute = async (
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
) => {
  try {
    const response = await Axios.post(`/route-info`, {
      startPoint: start,
      endPoint: end
    });
    console.log('출발, 도착 위치: ', start, end);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
