import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccount } from './IAccount';
import { environment } from 'src/environments/environment';
import { RegionService } from './region.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private regionService: RegionService) { }

  async getAccountData(summonerName: string) {
    let url = new URL(`https://${this.regionService.currentRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`);
    url.searchParams.set('api_key', environment.riotAPIKey);
    return this.http.get<IAccount>(url.toString(), {
      responseType: 'json'
    }).toPromise().catch(e => console.error(e));
  }

  async getSummonerId(summonerName: string) {
    return (await this.getAccountData(summonerName))?.id;
  }
}
