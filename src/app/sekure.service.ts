import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class SekureService {
  constructor(private http: HttpClient) {}

  getRecord() {
    return this.http.get("http://localhost:4500/sekure");
  }
}
