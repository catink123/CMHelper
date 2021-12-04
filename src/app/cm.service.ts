import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import IChampionList from './IChampionList';
import IFormattedEntry from './IFormattedEntry';
import IMastery from './IMastery';
import { RegionService } from './region.service';
import { SaveDataService } from './save-data.service';
import { VersionService } from './version.service';

@Injectable({
  providedIn: 'root'
})
export class CmService {
  champions: IChampionList = {};
  favourited: Array<number> = [];

  constructor(private accountService: AccountService,
    private http: HttpClient,
    private regionService: RegionService,
    private versionService: VersionService,
    private saveData: SaveDataService) {
    this.setupChampionList();
    this.getChampionList().then(val => console.log(val));
    this.favourited = this.saveData.favourited;
  }

  async setupChampionList() {
    let versions = await this.versionService.getVersions();
    let language = await this.regionService.getRegionLanguage(this.regionService.currentRegion);
    let champList = await this.http.get<any>(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/${language}/champion.json`, {
      responseType: 'json'
    }).toPromise();
    this.champions = champList.data as IChampionList;
  }

  async getMasteryList(summonerName: string) {
    let id = await this.accountService.getSummonerId(summonerName);
    let url = new URL(`https://${this.regionService.currentRegion}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`);
    url.searchParams.set('api_key', environment.riotAPIKey);
    return (await this.http.get<IMastery[]>(url.toString(), {
      responseType: 'json'
    }).toPromise())
  }

  async getChampionList() {
    let resArr = [];
    if (this.champions === {} || Object.values(this.champions).length === 0) {
      await this.setupChampionList();
    }
    resArr = Object.values(this.champions);
    return resArr;
  }

  async getFormattedMasteryList(summonerName: string) {
    let masteryList = await this.getMasteryList(summonerName)
    let champions = await this.getChampionList()
    let resultList: IFormattedEntry[] = [];
    for (const mastery of masteryList) {
      const champion = champions.find(val => parseInt(val.key) === mastery.championId);
      const name = champion!.name;
      const versions = await this.versionService.getVersions();
      const version = versions[0];
      const imageURL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion?.id}.png`;
      const {championLevel, chestGranted, tokensEarned, championId, championPoints} = mastery;
      resultList.push({name, championLevel, chestGranted, tokensEarned, imageURL, championId, championPoints});
    }
    return resultList;
  }

  addFavourite(id: number) {
    if (!this.favourited.includes(id)) {
      this.favourited.push(id);
      this.saveData.favourited = this.favourited;
    }
  }

  removeFavourite(id: number) {
    if (this.favourited.includes(id)) {
      const index = this.favourited.findIndex(val => val === id);
      this.favourited.splice(index, 1);
      this.saveData.favourited = this.favourited;
    }
  }
}
