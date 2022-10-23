import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loadingURL: string = environment.APIURL + "images/loading.gif";
  cssBackGround: any;
  cssDim: any;
  constructor(private sanitizer: DomSanitizer) {
    let windowHeight = Math.floor(window.innerHeight);
    let windowWidth = Math.floor(window.innerWidth);
    let top = (windowHeight - 200) / 2;
    let left = (windowWidth - 200) / 2;
    this.cssDim = 'z-index:2000; position:absolute; top:' + top + 'px;left:' + left + 'px;';
    this.cssDim = this.sanitizer.bypassSecurityTrustStyle(this.cssDim);

    this.cssBackGround = 'width:100%; height:100%; z-index:1000; background-color: #eeeeee; opacity: 0.5; position:absolute; top:' + 0 + 'px; left:' + 0 + 'px;';
    this.cssBackGround = this.sanitizer.bypassSecurityTrustStyle(this.cssBackGround);
  }

  ngOnInit(): void {
  }

}
