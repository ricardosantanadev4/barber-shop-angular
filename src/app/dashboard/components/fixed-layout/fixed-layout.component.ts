import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-fixed-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavbarComponent],
  templateUrl: './fixed-layout.component.html',
  styleUrl: './fixed-layout.component.scss'
})
export class FixedLayoutComponent implements OnInit {
  title = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setInitialTitle();
    this.listenRouteChanges();
  }

  private setInitialTitle() {
    const currentTitle = this.route.firstChild?.snapshot.data['title'];
    if (currentTitle) {
      this.title = currentTitle;
    }
  }

  private listenRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentTitle = this.route.firstChild?.snapshot.data['title'];
      if (currentTitle) {
        this.title = currentTitle;
      }
    })
  }
}