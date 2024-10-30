import { useEffect } from 'react';

export const KakaoMapLoader = ({ onLoad }: { onLoad: () => void }) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_JAVASCRIPT_KEY}&autoload=false`;
    kakaoMapScript.async = true;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API loaded');
        onLoad(); // Kakao Maps API 로드 후 실행할 콜백
      });
    };

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [onLoad]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};
