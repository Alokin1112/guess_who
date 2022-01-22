import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatWrapperComponent } from './components/chat/chat-wrapper/chat-wrapper.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatSenderComponent } from './components/chat/chat-sender/chat-sender.component';
import { ChampListComponent } from './components/champ/champ-list/champ-list.component';
import { ChampItemComponent } from './components/champ/champ-item/champ-item.component';
import { PlayerListComponent } from './components/player/player-list/player-list.component';
import { PlayerItemComponent } from './components/player/player-item/player-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    ChatWrapperComponent,
    ChatMessageComponent,
    ChatSenderComponent,
    ChampListComponent,
    ChampItemComponent,
    PlayerListComponent,
    PlayerItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
