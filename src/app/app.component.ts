import { Component } from '@angular/core';
import { SearchListComponent } from './search-list/search-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "audio_gui";

  show_control = false;
  show_results = false;
  loading = false;

  query = "";
  result_list:any;
  song_data:any;

  //audio control move
  play_status = false;
  song_title = "";
  play_time = 0;
  play_time_str = "0:00";

  //implement way to read config
  server_addr = "192.168.1.100";
  port = ":5001";




  async search(query:string){
    this.loading = true;
    let r = await fetch("http://"+this.server_addr+this.port+"/search?song="+query)
      .then(
        (response:any)=>{
          return response.json().then(
            (data:any)=>{
              console.log(data);
              this.result_list = data;
              return data;
            }
          ).then(()=>{
              this.show_results = true;
              this.loading = false;
            }
          )
        }
      );
  }

  async stream(id:number){
    this.loading = true;
    console.log(this.result_list[id].videoId);
    this.song_data = ("http://"+this.server_addr+this.port+"/stream?id="+this.result_list[id].videoId);
    this.play_status = true;
    this.show_control = true;
    this.loading = false;
  }




}
