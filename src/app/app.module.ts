import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreListComponent } from './store-list/store-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const appRoutes: Routes = [
  { path: 'store-list', component: StoreListComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: '', component: MainDashboardComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    StoreListComponent,
    ItemListComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only      
    ),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
