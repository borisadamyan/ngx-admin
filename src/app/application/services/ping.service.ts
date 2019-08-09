import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PingService {

  host = '';

  constructor(private http: HttpClient) {
    if (location.hostname === 'localhost') {
      this.host = 'http://localhost:9999';
    }
  }

  ping(data) {
    return this.http.post(this.host + '/ping', {data});
  }
}
