import { Component, Input, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';
import { MSG } from 'src/app/type';

@Component({
  selector: 'app-chat-wrapper',
  templateUrl: './chat-wrapper.component.html',
  styleUrls: ['./chat-wrapper.component.scss'],
})
export class ChatWrapperComponent implements OnInit {
  constructor(private socketService: SocketioService) {}
  @Input() role = '';
  @Input() gameId = '';
  messages: Array<MSG> = [];
  ngOnInit(): void {
    this.receiveMessage();
    this.receiveAnswer();
  }

  receiveMessage() {
    this.socketService.receiveMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
  sendQuestion(content: string) {
    let msg: MSG = {
      content: content,
      sender: 'gracz',
      answer: '',
    };
    this.messages.push(msg);
    this.socketService.sendMessage(this.gameId, msg);
  }
  answer(props: { msg: MSG; answer: string }) {
    if (this.role == 'picker') {
      this.messages[this.messages.indexOf(props.msg)].answer = props.answer;
      this.socketService.sendAnswer(
        this.gameId,
        this.messages[this.messages.indexOf(props.msg)]
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
