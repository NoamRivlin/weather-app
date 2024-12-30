import axios, { AxiosError, AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
}

interface ApiResponse<T> {
  data: T;
  apiKeyUsed: string;
}

class ApiKeyManager {
  private apiKeys: string[];
  private currentIndex: number;

  constructor(apiKeys: string[]) {
    this.validateApiKeys(apiKeys);
    this.apiKeys = apiKeys;
    this.currentIndex = 0;
    console.log(`Initialized ApiKeyManager with ${this.apiKeys.length} keys`);
  }

  private validateApiKeys(keys: string[]): void {
    const validKeys = keys.filter(key => key && key.trim() !== "");
    if (validKeys.length === 0) {
      throw new Error("No valid API keys provided");
    }
  }

  public getCurrentKey(): string {
    const key = this.apiKeys[this.currentIndex];
    console.log(`Using API key ${this.currentIndex + 1} of ${this.apiKeys.length}`);
    return key;
  }

  public getNextKey(): string {
    this.currentIndex = (this.currentIndex + 1) % this.apiKeys.length;
    const key = this.getCurrentKey();
    console.log(`Switched to API key ${this.currentIndex + 1} of ${this.apiKeys.length}`);
    return key;
  }

  public reset(): void {
    this.currentIndex = 0;
  }
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 5000, // 5 seconds
};

const apiKeyManager = new ApiKeyManager([
  process.env.API_KEY7,
  // process.env.API_KEY8,
  // process.env.API_KEY1,
  // process.env.API_KEY2,
  // process.env.API_KEY3,
  // process.env.API_KEY4,
  // process.env.API_KEY5,
  // process.env.API_KEY6,
  
].filter((key): key is string => !!key));

const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

const calculateBackoff = (attempt: number, config: RetryConfig): number => {
  const delay = Math.min(
    config.baseDelay * Math.pow(2, attempt),
    config.maxDelay
  );
  return delay + Math.random() * 1000; // Add jitter
};

const isRetryableError = (error: AxiosError): boolean => {
  const status = error.response?.status;
  return (
    !status || // Network errors
    status === 429 || // Too many requests
    status >= 500 || // Server errors
    status === 403 // Forbidden (possibly due to API key exhaustion)
  );
};

export async function fetchDataWithRetry<T>(
  url: string,
  config: Partial<RetryConfig> = {}
): Promise<ApiResponse<T>> {
  const retryConfig = { ...defaultRetryConfig, ...config };
  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= retryConfig.maxRetries) {
    const currentKey = attempt === 0 
      ? apiKeyManager.getCurrentKey() 
      : apiKeyManager.getNextKey();

    try {
      const response: AxiosResponse<T> = await axios.get(`${url}&apikey=${currentKey}`);
      
      return {
        data: response.data,
        apiKeyUsed: currentKey
      };
    } catch (error) {
      lastError = error as Error;
      
      if (error instanceof AxiosError && !isRetryableError(error)) {
        throw error;
      }

      if (attempt === retryConfig.maxRetries) {
        break;
      }

      const backoffDelay = calculateBackoff(attempt, retryConfig);
      console.warn(
        `Request failed with API key ${currentKey}. ` +
        `Retrying in ${Math.round(backoffDelay/1000)}s... ` +
        `(Attempt ${attempt + 1}/${retryConfig.maxRetries})`
      );

      await sleep(backoffDelay);
      attempt++;
    }
  }

  throw new Error(
    `Max retries (${retryConfig.maxRetries}) exceeded. Last error: ${lastError?.message}`
  );
}
