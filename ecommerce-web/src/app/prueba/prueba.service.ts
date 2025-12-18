import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  private API_URL = 'http://localhost:8081/api/prueba';

  constructor(private http: HttpClient) {}

    acceder() {
      return this.http.get(this.API_URL);

  }
}
