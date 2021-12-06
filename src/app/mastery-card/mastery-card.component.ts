import { Component, Input, OnInit } from '@angular/core';
import { CmService } from '../cm.service';

@Component({
  selector: 'app-mastery-card',
  templateUrl: './mastery-card.component.html',
  styleUrls: ['./mastery-card.component.scss']
})
export class MasteryCardComponent implements OnInit {
  @Input() name = '';
  @Input() championLevel = 0;
  @Input() tokensEarned = 0;
  @Input() imageURL = '';
  @Input() chestGranted = 0;
  @Input() championId = 0;
  @Input() championPoints = 0;
  @Input() appearance = 'card';

  constructor(private cmService: CmService) { }

  ngOnInit(): void {
  }

  get tokenArray() {
    const secondArrayLength = (this.championLevel === 5 ? 2 : 3) - this.tokensEarned;
    return [new Array(this.tokensEarned).fill(0), new Array(secondArrayLength).fill(0)];
  }

  get isFavourited(): boolean {
    return !this.cmService.favourited.includes(this.championId);
  }

  setFavourited(state: boolean) {
    if (state) this.cmService.addFavourite(this.championId);
    else this.cmService.removeFavourite(this.championId);
  }

  get className(): string {
    var returnValue = "";
    returnValue += this.championLevel === 7 ? 'done' : '';
    returnValue += " " + this.appearance;
    return returnValue;
  }
}
