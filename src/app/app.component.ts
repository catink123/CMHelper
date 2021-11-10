import { Component, OnInit } from '@angular/core';
import { CmService } from './cm.service';
import IFormattedEntry from './IFormattedEntry';
import { MatDialog } from '@angular/material/dialog';
import { EditNameDialogComponent } from './edit-name-dialog/edit-name-dialog.component';
import { SaveDataService } from './save-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CMHelper';
  
  masteryList: IFormattedEntry[] = [];
  name = "GamesKaiser";
  showFavourited: boolean = false;
  constructor(private cmService: CmService, public dialog: MatDialog, private saveData: SaveDataService) { }

  async updateMasteryList() {
    this.name = this.saveData.name;
    this.masteryList = await this.cmService.getFormattedMasteryList(this.name);
  }

  async ngOnInit() {
    await this.updateMasteryList();
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

  get favouritedMasteryList(): IFormattedEntry[] {
    return this.masteryList.filter(val => {
      if (this.cmService.favourited.includes(val.championId)) return true;
      return false;
    })
  }
}