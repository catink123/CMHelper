import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  async getVersions() {
    return await this.http.get<Array<string>>("https://ddragon.leagueoflegends.com/api/versions.json", {
      responseType: 'json'
    }).toPromise();
  }
}
