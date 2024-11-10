export async function getRegionName(
  lat: number,
  lng: number
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2RegionCode(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result.length > 0) {
        console.log('Geocoder response:', result);

        // result[0]가 undefined일 때 대비
        const regionName = result[0]?.region_1depth_name || null;

        if (regionName) {
          resolve(regionName);
        } else {
          reject(new Error('지역명을 찾을 수 없습니다.'));
        }
      } else {
        console.error('Geocoder API 호출 오류:', status);
        reject(new Error('Geocoder API 호출 오류'));
      }
    });
  });
}
