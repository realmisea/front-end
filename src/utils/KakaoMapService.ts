export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export const searchPlace = async (query: string): Promise<Place[]> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao) {
      console.error('Kakao Maps API is not loaded');
      reject('Kakao Maps API is not loaded');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(query, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data as Place[]);
      } else {
        console.error('Failed to fetch place data:', status);
        reject(`Failed to fetch place data: ${status}`);
      }
    });
  });
};
