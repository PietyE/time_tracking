type LocalStorageKeysType = 'profileData';

class LocalStorage {
  get<T = unknown>(key: LocalStorageKeysType): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  }

  set(key: LocalStorageKeysType, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: LocalStorageKeysType): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

const lsApi = new LocalStorage();

export { lsApi };

export interface ProfileDataStorageI {
  key: string;
  userId: string;

  date_create: Date;

  expiration_timestamp: number;

  imageUrl?: string;
}
