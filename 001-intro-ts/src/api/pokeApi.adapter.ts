import axios from "axios"

export interface HttpAdapter {
  get<T>(url:string):Promise<T> ;
}


export class PokeApiFetchAdapter implements HttpAdapter{
  async get<T>(url:string):Promise<T> {
    const response = await fetch(url)
    const data = await response.json()
    return data as T
  }
}

// adaptar una funcionalidad externa a mi codigo
export class PokeApiAxiosAdapter implements HttpAdapter{
  private readonly axios = axios;
  async get<T>(url:string):Promise<T> {
    const response = await this.axios.get<T>(url)
    return response.data
  }

  async post(url:string,data:any){}
  async patch(url:string,data:any){}
  async delete(url:string){}
}