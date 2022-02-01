import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  constructor() {}
  @Input() players: Array<string> = [];
  @Input() picker: string = '';
  ngOnInit(): void {}
  getRole(player: string) {
    if (this.picker == '') return '';
    return player == this.picker ? 'Picker' : 'Guesser';
  }
}
