interface DustItem {
  khaiValue: string;
}

export const fetchDustGrade = async (region: string) => {
  const url = `${import.meta.env.VITE_DUST_BASE_URL}?serviceKey=${import.meta.env.VITE_API_KEY}&sidoName=${encodeURIComponent(region)}&returnType=json&numOfRows=100&pageNo=1&ver=1.3`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json(); // 응답을 JSON 형식으로 변환
    const items: DustItem[] = data?.response?.body?.items;

    if (!items || items.length === 0) {
      console.error('아이템 없음');
      return null;
    }

    const khaiValues = items
      .map((item) => parseFloat(item.khaiValue))
      .filter((value) => !isNaN(value));

    const average =
      khaiValues.reduce((acc: number, val: number) => acc + val, 0) /
      khaiValues.length;

    if (average <= 50) return '좋음';
    if (average <= 100) return '보통';
    if (average <= 250) return '나쁨';
    return '매우 나쁨';
  } catch (error) {
    console.error(error);
  }
};
