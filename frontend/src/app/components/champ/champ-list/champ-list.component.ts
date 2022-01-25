import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() role: string = 'guesser';
  pick!: Champ;

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
    if (this.role == 'guesser') {
      //dziala normalnie jezeli jesteś zgadującym
      this.champs[
        this.champs.findIndex((obj) => obj.name === champ.name)
      ].isGreyed = this.champs[
        this.champs.findIndex((obj) => obj.name === champ.name)
      ].isGreyed
        ? false
        : true;
    } else if (this.role == 'picker') {
      //sluzy do wyboru postaci jezeli jesteś pickerem
      this.pick = champ;
    }
  }
}
