import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Champ, CHAMP_LIST } from '../../../../assets/lolChamps';
@Component({
  selector: 'app-champ-list',
  templateUrl: './champ-list.component.html',
  styleUrls: ['./champ-list.component.scss'],
})
export class ChampListComponent implements OnInit {
  constructor() {}
  champs: Array<Champ> = CHAMP_LIST.slice(0, 20);
  champResults = this.champs;
  isGreyVisible: boolean = true;

  ngOnInit(): void {}
  search: FormControl = new FormControl('');
  champResult() {
    return this.champs.filter((champ) =>
      champ.name.toLowerCase().startsWith(this.search.value.toLowerCase())
    );
  }
  reset() {
    this.champResults.forEach((champ) => (champ.isGreyed = false));
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
