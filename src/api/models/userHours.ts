export interface createTokenData {
  state: string;
  callback_url: string;
}

export interface AuthUrlResponse {
  google_auth_url: string;
  state: string;
}

export interface SyncWithGoogleSheetsData {
  spreadsheet: string;
  is_agree?: boolean;
  year?: number;
  month?: number;
}
