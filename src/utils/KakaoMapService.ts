export const searchPlace = async (query: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!window.kakao) {
      console.error('Kakao Maps API is not loaded');
      reject('Kakao Maps API is not loaded');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(query, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        console.error('Failed to fetch place data:', status);
        reject(`Failed to fetch place data: ${status}`);
      }
    });
  });
};
