import {Component, OnInit, AfterViewInit, Input} from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const links = document.getElementsByClassName('link');
    const that = this;
    Array.from(links).forEach(link => {
      link.addEventListener('click', () => {
        if (that.sidenav.mode === 'over') {
          that.sidenav.close();
        }
      });
    });
  }

}
