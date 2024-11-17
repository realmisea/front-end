import { Axios } from '@apis/Axios.ts';

export const createRoute = async (start: string, end: string) => {
  try {
    const response = await Axios.post(`/route-info`, {
      start: start,
      end: end
    });
    console.log('출발, 도착 위치: ', start, end);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
