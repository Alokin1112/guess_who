import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-chat-sender',
  templateUrl: './chat-sender.component.html',
  styleUrls: ['./chat-sender.component.scss'],
})
export class ChatSenderComponent implements OnInit {
  constructor() {}
  chat: FormGroup = new FormGroup({
    msg: new FormControl(''),
  });
  canSend: Boolean = true;
  @Output() sendMSG = new EventEmitter<string>();
  ngOnInit(): void {}
  sendQuestion() {
    if (this.chat.get('msg')?.value && this.canSend) {
      this.canSend = false;
      this.sendMSG.emit(this.chat.get('msg')?.value);
      this.chat.get('msg')?.reset();
      setTimeout(() => {
        this.canSend = true;
      }, 4000);
    }
  }
}
