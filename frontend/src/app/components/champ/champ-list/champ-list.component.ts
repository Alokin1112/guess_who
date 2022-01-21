import { Component, OnInit } from '@angular/core';
import { Champ, CHAMP_LIST } from '../../../../assets/lolChamps';
@Component({
  selector: 'app-champ-list',
  templateUrl: './champ-list.component.html',
  styleUrls: ['./champ-list.component.scss'],
})
export class ChampListComponent implements OnInit {
  constructor() {}
  champs: Array<Champ> = CHAMP_LIST.slice(0, 5);
  isGreyVisible: boolean = true;

  ngOnInit(): void {}

  reset() {
    this.champs.forEach((champ) => (champ.isGreyed = false));
  }
  toogleVisibility() {
    this.isGreyVisible = !this.isGreyVisible;
  }
  changeState(champ: Champ) {
    this.champs[
      this.champs.findIndex((obj) => obj.name === champ.name)
    ].isGreyed = this.champs[
      this.champs.findIndex((obj) => obj.name === champ.name)
    ].isGreyed
      ? false
      : true;
  }
}
