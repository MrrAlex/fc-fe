import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnswerPageComponent } from './components/answer-page/answer-page.component';
import { CardModule } from 'primeng/card';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { AppStoreModule } from './store/store.module';
import { StoreFacade } from './store/store.facade';
import { MessageService } from 'primeng/api';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmDialogModule} from "primeng/confirmdialog";

const routes: Routes = [
  {
    path: 'angular/courses',
    loadChildren: () =>
      import('./course/course.module').then((m) => m.CourseModule),
  },
  {
    path: 'lesson',
    component: AnswerPageComponent,
    data: {
      sidebar: false,
    },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnswerPageComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    MenubarModule,
    InputTextModule,
    CardModule,
    SharedModule,
    MenuModule,
    MessagesModule,
    AppStoreModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
  ],
  providers: [HttpClient, StoreFacade, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
