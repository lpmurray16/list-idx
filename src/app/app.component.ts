import { Component, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RealtimeDbService } from '../services/realtime-db.service';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { CheckBoxComponent } from "./check-box/check-box.component";
import { LoadingDirective } from './loading.directive';
import { PushNotificationService } from '../services/push-notification.service';
import { ActionMenuComponent } from './action-menu/action-menu.component';

export class Item {
  key?: string;
  name: string;
  purchased: boolean;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  loading = true;

  removeFromList(item: Item) {
    if(item.key){
      this.dbService.deleteShoppingItem(item.key)
      .then(() => {
        console.log('Item deleted after being unpurchased.');
        this.shoppingList = this.shoppingList.filter(i => i.key !== item.key);
      })
      .catch(err => console.error('Error deleting item:', err));
    }
  }

  markAsPurchased(item: Item) {
    if(item.key) {
      item.purchased = true;
      this.dbService.updateShoppingItem(item.key, item)
          .then(() => console.log('Item updated as purchased.'))
          .catch(err => console.error('Error updating item:', err));
    }
  }

  title = 'myapp';
  lightModeEnabled: boolean = false;
  shoppingList: Item[] = [];
  newItemName: string;
  newItemQuantity: number = 1;

  constructor(private dbService: RealtimeDbService, private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this.dbService.getShoppingList().subscribe(items => {
      // Logic to find new items
      if (!this.loading && items.length > this.shoppingList.length) {
        const newItems = items.filter(item => !this.shoppingList.some(existing => existing.key === item.key));
        newItems.forEach(item => {
          this.pushNotificationService.showNotification('New Item Added', {
            body: `${item.name} (x${item.quantity}) was added to the list.`,
            icon: 'assets/icons/icon-192x192.png'
          });
        });
      }
      
      console.log(items);
      this.shoppingList = items;
      console.log(this.shoppingList);
      this.loading = false;
    });
  }

  addItem() {
    if (this.newItemName) {
      if (this.newItemQuantity === 0 || this.newItemQuantity === undefined || this.newItemQuantity === null) { this.newItemQuantity = 1; }
      const key = this.dbService.generateItemKey();
      const newItem: Item = { key, name: this.newItemName, quantity: this.newItemQuantity, purchased: false };
      this.dbService.addShoppingItemWithKey(newItem)
        .then(() => {
          this.newItemName = '';
          this.newItemQuantity = 1;
          const inputElement = document.querySelector('input[name="newItemName"]') as HTMLInputElement;
          inputElement.focus();
        })
        .catch(err => console.error('Error adding item:', err));
    }
  }

  onSwipeLeft(item: Item) {
    if (item.key) {
      this.dbService.deleteShoppingItem(item.key)
        .then(() => {
          console.log('Item deleted successfully.');
        })
        .catch(err => console.error('Error deleting item:', err));
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ActionMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HammerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ThemeToggleComponent,
    CheckBoxComponent,
    LoadingDirective
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
