import { Champ } from 'src/assets/lolChamps';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SocketioService } from 'src/app/services/socketio.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MSG } from 'src/app/type';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  gameId: string = '';
  role: string = '';
  nickname: string = '';
  canBet: boolean = true;
  playersList: Array<string> = [];
  constructor(
    private _route: ActivatedRoute,
    private socketService: SocketioService,
    private snackbar: MatSnackBar
  ) {}

  name: FormGroup = new FormGroup({
    nickname: new FormControl(''),
  });

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('id') || '';
  }

  receiveJoinedPlayers() {
    this.socketService.receiveJoinedPlayers().subscribe((nicks: any) => {
      this.playersList = nicks;
      this.snackbar.open(
        'Player ' + String(nicks[nicks.length - 1]) + ' has joined the game',
        '',
        {
          duration: 2000,
        }
      );
    });
  }
  receiveStartGame() {
    this.socketService
      .receiveStartGame()
      .subscribe((role: any) => (this.role = role));
  }
  startGame() {
    this.socketService.startGame(this.gameId);
  }
  setNickname() {
    this.nickname = this.name.get('nickname')?.value;
    if (this.nickname) {
      this.socketService.connect(this.gameId, this.nickname);
      this.receiveJoinedPlayers();
      this.receiveStartGame();
    }
  }
  sendPickedChamp(champ: Champ) {
    if (this.role == 'picker') this.socketService.sendPick(this.gameId, champ);
    else if (this.role == 'guesser') {
      if (this.canBet) {
        this.socketService.sendPick(this.gameId, champ);
        this.canBet = false;
      }
    }
  }
}
