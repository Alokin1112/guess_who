import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}
  gameIndeks: FormControl = new FormControl('');
  ngOnInit(): void {}
  startGame() {
    if (this.gameIndeks.value == '') {
      const uid = uuidv4();
      this.router.navigate(['/game', uid]);
    } else {
      this.router.navigate(['/game', this.gameIndeks.value]);
    }
  }
}
