import { Component, OnInit } from '@angular/core';
import { CmService } from './cm.service';
import IFormattedEntry from './IFormattedEntry';
import { MatDialog } from '@angular/material/dialog';
import { EditNameDialogComponent } from './edit-name-dialog/edit-name-dialog.component';
import { SaveDataService } from './save-data.service';
import { transition, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('searchBarToggle', [
      transition(':enter', [
        style({height: '0'}),
        animate('100ms', style({height: '*'}))
      ]),
      transition(':leave', [
        animate('100ms', style({height: 0}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'CMHelper';
  
  masteryList: IFormattedEntry[] = [];
  name = "GamesKaiser";
  showFavourited: boolean = false;
  showSearchBar = false;
  searchTerm = '';
  currentView = 'cards';
  constructor(private cmService: CmService, public dialog: MatDialog, private saveData: SaveDataService) { }

  async updateMasteryList() {
    this.name = this.saveData.name;
    this.masteryList = await this.cmService.getFormattedMasteryList(this.name);
  }

  async ngOnInit() {
    await this.updateMasteryList();
    this.sortBy(this.saveData.sortCriteria);
    this.showFavourited = this.saveData.showFavourited;
    this.currentView = this.saveData.view;
  }

  showEditNameDialog() {
    const dialogRef = this.dialog.open(EditNameDialogComponent, {
      data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.name = result;
        this.saveData.name = this.name;
        this.masteryList = [];
        this.updateMasteryList();
      }
    });
  }

  toggleShowFavourited() {
    this.showFavourited = !this.showFavourited;
    this.saveData.showFavourited = this.showFavourited;
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchTerm = "";
    }
  }

  set view(newValue: string) {
    this.currentView = newValue;
    this.saveData.view = newValue;
  }

  get view(): string {return this.currentView};

  get favouritedMasteryList(): IFormattedEntry[] {
    return this.masteryList.filter(val => {
      if (this.cmService.favourited.includes(val.championId)) return true;
      return false;
    })
  }

  sortBy(criteria: string) {
    this.saveData.sortCriteria = criteria;
    let sortFunction = function(a: IFormattedEntry, b: IFormattedEntry) {
      return b.championPoints - a.championPoints
    };
    switch(criteria) {
      case "championPoints":
        sortFunction = function(a: IFormattedEntry, b: IFormattedEntry) {
          return b.championPoints - a.championPoints
        }
        break;
      case "reverseChestGranted":
        sortFunction = function(a: IFormattedEntry, b: IFormattedEntry) {
          return a.chestGranted - b.chestGranted
        }
        break;
      case "championLevel":
        sortFunction = function(a: IFormattedEntry, b: IFormattedEntry) {
          return b.championLevel - a.championLevel
        }
        break;
      case "hasTokens":
        sortFunction = function(a: IFormattedEntry, b: IFormattedEntry) {
          return b.tokensEarned - a.tokensEarned
        }
        break;
    }
    this.masteryList.sort(sortFunction)
  }

  get currentMasteryList(): IFormattedEntry[] {
    const filterFunction = (val: IFormattedEntry) => val.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    if (this.showFavourited) {
      return this.favouritedMasteryList.filter(filterFunction)
    } else {
      return this.masteryList.filter(filterFunction)
    }
  }
}