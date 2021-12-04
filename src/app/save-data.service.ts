import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  constructor() { }

  private getData(): any | null {
    const lsItem = localStorage.getItem("CMHelperData");
    if (lsItem) {
      const data = JSON.parse(lsItem);
      return data;
    } else return null;
  }

  private setData(newData: any) {
    localStorage.setItem("CMHelperData", JSON.stringify(newData));
  }

  get name(): string {
    const data = this.getData();
    if (data) return data.name as string;
    else return "GamesKaiser";
  }

  set name(newName: string) {
    let data = this.getData();
    if (!data) data = {};
    data.name = newName;
    this.setData(data);
  }

  get favourited(): Array<number> {
    const data = this.getData();
    if (data) {
      if (data.favourited) return data.favourited as Array<number>;
      else return [];
    }
    else return [];
  }

  set favourited(newFavourited: Array<number>) {
    let data = this.getData();
    if (!data) data = {};
    data.favourited = newFavourited;
    this.setData(data);
  }

  get showFavourited(): boolean {
    const data = this.getData();
    if (data) {
      if (data.showFavourited) return data.showFavourited as boolean;
      else return false;
    }
    else return false;
  }

  set showFavourited(newValue: boolean) {
    let data = this.getData();
    if (!data) data = {};
    data.showFavourited = newValue;
    this.setData(data);
  }

  get sortCriteria(): string {
    const data = this.getData();
    if (data) {
      if (data.sortCriteria) return data.sortCriteria;
      else return "";
    }
    return "";
  }

  set sortCriteria(newValue: string) {
    let data = this.getData();
    if (!data) data = {};
    data.sortCriteria = newValue;
    this.setData(data);
  }
}
