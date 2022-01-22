import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.scss'],
})
export class PlayerItemComponent implements OnInit {
  constructor() {}
  @Input() player: string = '';
  ngOnInit(): void {}
}
