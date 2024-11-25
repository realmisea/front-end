import { useState, useEffect } from 'react';

export const useKakaoLoader = (): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src*="dapi.kakao.com"]'
    );
    if (existingScript) {
      // 이미 Kakao Maps SDK가 로드되었다면 상태를 업데이트
      if (window.kakao?.maps) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setIsLoaded(true));
      }
      return;
    }

    // Kakao Maps SDK 스크립트 추가
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  return isLoaded;
};

//
// import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';
//
// export function useKakaoLoader() {
//   useKakaoLoaderOrigin({
//     appkey: import.meta.env.VITE_JAVASCRIPT_APP_KEY as string,
//     libraries: ['clusterer', 'drawing', 'services']
//   });
// }
