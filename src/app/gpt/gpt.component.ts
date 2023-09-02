import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent {

  queryformGroup!: FormGroup;

  result: any;

  error: any;

  "messages": [{ "role": "system", "content": "You are a helpful assistant." }];

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.queryformGroup = this.fb.group({
      query: this.fb.control("")   // Initializing query with empty string first
    });
  }


  handleAskGPT() {

    let url = "https://api.openai.com/v1/chat/completions";

    let httpHeaders = new HttpHeaders().
      set("Authorization", "Bearer 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")
      .set("OpenAI-Organization", "org-UQ2KEcCmzPxDNFK0zG86zVPn")

    let payload = {

      "model": "gpt-3.5-turbo",
      "messages": this.messages

    };

    this.httpClient.post(url, payload, { headers: httpHeaders })
      .subscribe(
        (resp) => {
          this.result = resp;
        },
        (err) => {
          this.error = err.error["error"]["message"]
          console.log(err.error["error"])
        }
      );
  }
}



