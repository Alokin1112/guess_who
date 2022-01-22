import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  constructor() {}
  @Input() players: Array<string> = [];
  ngOnInit(): void {}
}
