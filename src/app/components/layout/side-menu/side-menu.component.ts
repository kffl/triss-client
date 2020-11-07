import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @Input() sidenav;
  paths: string[] = [];

  constructor(private router: Router) {
  }


  ngOnInit(): void {
    this.router.config.forEach(route => this.paths.push('/' + route.path));
  }

  ngAfterViewInit() {
    this.setOnLinksClickListeners();
  }

  setOnLinksClickListeners() {
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
