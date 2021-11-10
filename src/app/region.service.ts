import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IRegionData from './IRegionData';
import Region from './region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  currentRegion = Region.RU;

  constructor(private http: HttpClient) { }

  setRegion(regionName: string) {
    this.currentRegion = regionName as Region;
  }

  async getRegionLanguage(regionName: string) {
    let url = new URL(`https://ddragon.leagueoflegends.com/realms/${regionName}.json`);
    let regionData = await this.http.get<IRegionData>(url.toString(), {
      responseType: 'json'
    }).toPromise();
    return regionData.l;
  }
}
