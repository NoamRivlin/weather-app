import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEYS = [
  process.env.API_KEY1 as string,
  process.env.API_KEY2 as string,
  process.env.API_KEY3 as string,
  process.env.API_KEY4 as string,
  process.env.API_KEY5 as string,
  process.env.API_KEY6 as string,
];

let currentApiKeyIndex = 0;

export const getNextApiKey = (): string => {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  const nextApiKey = API_KEYS[currentApiKeyIndex];

  if (nextApiKey === undefined) {
    // If nextApiKey is undefined, reset to the beginning and use the first key
    currentApiKeyIndex = 0;
    return API_KEYS[currentApiKeyIndex];
  }

  return nextApiKey;
};

export const fetchDataWithRetry = async (
  url: string,
  apiKey: string,
  retries = 3
): Promise<any> => {
  try {
    const response = await axios.get(`${url}&apikey=${apiKey}`);
    return response.data;
  } catch (error: any) {
    if (
      retries > 0 &&
      (error.response?.status > 205 ||
        (error.isAxiosError && error.response?.status === undefined))
    ) {
      // Retry with the next API key
      const nextApiKey = getNextApiKey();
      console.log(`Retrying with API key: ${nextApiKey}`);
      return fetchDataWithRetry(url, nextApiKey, retries - 1);
    } else {
      throw error;
    }
  }
};
