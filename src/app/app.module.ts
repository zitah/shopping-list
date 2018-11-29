import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { StoreListComponent } from './components/store-list/store-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';

// services
import { StoreDataService } from './services/store-data.service';
import { ItemDataService } from './services/item-data.service';

const appRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'store-list', component: StoreListComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: '', component: MainDashboardComponent },
];

@NgModule({
  declarations: [
    ShoppingListComponent,
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
    ReactiveFormsModule,
  ],
  providers: [
    StoreDataService,
    ItemDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
