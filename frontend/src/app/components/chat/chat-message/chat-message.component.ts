import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MSG } from 'src/app/type';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  constructor() {}
  @Input() messages: Array<MSG> = [];
  @Input() role: string = '';
  @Output() sendAnswer = new EventEmitter<{ msg: MSG; answer: string }>();
  ngOnInit(): void {}
  answer(message: MSG, ans: string) {
    this.sendAnswer.emit({ msg: message, answer: ans });
  }
}
