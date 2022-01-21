import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Champ } from 'src/assets/lolChamps';

@Component({
  selector: 'app-champ-item',
  templateUrl: './champ-item.component.html',
  styleUrls: ['./champ-item.component.scss'],
})
export class ChampItemComponent implements OnInit {
  constructor() {}
  @Input() champ!: Champ;
  @Input() isGreyVisible: boolean = true;
  ngOnInit(): void {}
  @Output() toogleGrey = new EventEmitter<Champ>();
  changeState() {
    this.toogleGrey.emit(this.champ);
  }
}
