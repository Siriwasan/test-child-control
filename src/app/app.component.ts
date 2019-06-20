import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGp: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGp = this.fb.group({
      Tel1: [null, Validators.required],
      Tel2: [null, Validators.required],
      Tel3: [null, Validators.required]
    });
  }

  onClick() {
    console.log('click');
    document.getElementById('Tel3');
  }
}
