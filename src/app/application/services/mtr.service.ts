import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MtrService {
  host = '';

  constructor(private http: HttpClient) {
    if (location.hostname === 'localhost') {
      this.host = 'http://localhost:9998';
    }
  }

  mtr(data) {
    return this.http.post(this.host + '/mtr', {data});
  }
}
