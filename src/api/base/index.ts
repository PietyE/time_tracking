import { AxiosInstance } from "axios";

interface IConfig {
  request: AxiosInstance;
  url: string;
}

class CRUD {
  protected url;
  protected request;
  constructor(config: IConfig) {
    this.url = config.url;
    this.request = config.request;
  }
}

export default CRUD;
