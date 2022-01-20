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
  role: string = 'guesser';
  constructor(
    private _route: ActivatedRoute,
    private socketService: SocketioService,
    private snackbar: MatSnackBar
  ) {}

  messages: Array<MSG> = [];
  chat: FormGroup = new FormGroup({
    msg: new FormControl(''),
  });

  ngOnInit(): void {
    this.gameId = this._route.snapshot.paramMap.get('id') || '';
    console.log(this.gameId);
    this.socketService.connect(this.gameId);
    this.receiveJoinedPlayers();
    this.receiveMessage();
    this.receiveAnswer();
  }

  receiveJoinedPlayers() {
    this.socketService.receiveJoinedPlayers().subscribe((message) => {
      this.snackbar.open(String(message), '', {
        duration: 2000,
      });
    });
  }
  receiveMessage() {
    this.socketService.receiveMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
  sendQuestion() {
    let msg: MSG = {
      content: this.chat.get('msg')?.value,
      sender: 'gracz',
      answer: '',
    };
    this.messages.push(msg);
    this.socketService.sendMessage(this.gameId, msg);
    this.chat.get('msg')?.reset();
  }
  answer(msg: MSG, answer: string) {
    if (this.role == 'picker') {
      this.messages[this.messages.indexOf(msg)].answer = answer;
      this.socketService.sendAnswer(
        this.gameId,
        this.messages[this.messages.indexOf(msg)]
      );
    }
  }
  receiveAnswer() {
    this.socketService.receiveAnswer().subscribe((message: any) => {
      console.log(message);
      this.messages.forEach((item) => {
        if (item.sender == message.sender && item.content == message.content)
          item.answer = message.answer;
      });
    });
  }
}
