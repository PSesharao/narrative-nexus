// gpt.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GptService } from '../gpt.service'; // Import the GptService

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent {
  queryformGroup!: FormGroup;
  result: any;
  error: any;

  constructor(
    private fb: FormBuilder,
    private gptService: GptService // Inject the GptService
  ) {}

  ngOnInit() {
    this.queryformGroup = this.fb.group({
      query: this.fb.control('')
    });
  }

  handleAskGPT() {

    let message = { role: 'user', content: this.queryformGroup.value.query } ; 

    this.gptService.askGPT(message).subscribe(
      (resp) => {
        this.result = resp;
      },
      (err) => {
        this.error = err.error['error']['message'];
        console.log(err.error['error']);
      }
    );
  }
}
