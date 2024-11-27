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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
