export const fetchDustGrade = async (region: string) => {
  const url = `${import.meta.env.VITE_DUST_BASE_URL}?serviceKey=${import.meta.env.VITE_API_KEY}&sidoName=${encodeURIComponent(region)}&returnType=json&numOfRows=100&pageNo=1&ver=1.3`;

  try {
    const response = await fetch(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
