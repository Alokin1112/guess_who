import { Champ } from 'src/assets/lolChamps';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  picker: string = '';

  playersList: Array<string> = [];
  constructor(
    private _route: ActivatedRoute,
    private router: Router,
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
    this.socketService.receiveStartGame().subscribe((role: any) => {
      this.role = role;
    });
    this.socketService.receivePicker().subscribe((nick: any) => {
      console.log(nick);
      this.picker = nick;
    });
  }
  receiveSendPick() {
    this.socketService.receiveSendPick().subscribe((result: any) => {
      const snackBarText = result
        ? 'Congratulations U Have guessed correctly'
        : "Unfortunately u haven't won, wait for game end";
      this.snackbar.open(snackBarText, '', {
        duration: 3000,
      });
    });
  }
  receivGameEnded() {
    this.socketService.receiveGameEnded().subscribe((obj: any) => {
      this.snackbar.open(
        `GAME ENDED !!! Won: ${obj.who} || Correct Answer was: ${obj.what}`,
        '',
        {
          duration: 2000,
        }
      );
      this.gameId = obj.nextGame;
      this.role = '';
      this.canBet = true;
      setTimeout(() => {
        this.router.navigate(['/game', obj.nextGame]);
        this.setNickname();
      }, 2000);
    });
  }
  startGame() {
    this.socketService.startGame(this.gameId);
  }
  setNickname() {
    this.nickname =
      this.nickname == '' ? this.name.get('nickname')?.value : this.nickname;
    if (this.nickname) {
      this.socketService.connect(this.gameId, this.nickname);
      this.receiveJoinedPlayers();
      this.receiveStartGame();
      this.receivGameEnded();
    }
  }
  sendPickedChamp(champ: Champ) {
    if (this.role == 'picker') this.socketService.sendPick(this.gameId, champ);
    else if (this.role == 'guesser') {
      if (this.canBet) {
        this.socketService.sendPick(this.gameId, champ);
        this.canBet = false;
        this.receiveSendPick();
      }
    }
  }
}
