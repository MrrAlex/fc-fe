import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { StoreFacade } from './store/store.facade';
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private storeFacade: StoreFacade
  ) {}

  isSidebarNeeded = false;
  loading$ = this.storeFacade.loading$;

  ngOnInit() {
    const user = window["user_data" as any];
    console.log(user)
    console.log(window);
    setTimeout(() => {
      console.log(window["user_data" as any])
    }, 5000)
    this.storeFacade.errorMessage.subscribe((error) => {
      if (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
      }
    });
    this.storeFacade.successMessages.subscribe((success) => {
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: success,
        });
      }
    });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap((route) => route.data),
        map((data) => data['sidebar'])
      )
      .subscribe((sidebar) => {
        this.isSidebarNeeded = sidebar;
      });
  }
}
