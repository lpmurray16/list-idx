import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Item } from '../app/app.component';  // Ensure correct import path

@Injectable({
  providedIn: 'root',
})
export class RealtimeDbService {

  constructor(private db: AngularFireDatabase) {}

  // Retrieve the shopping list (keys are already part of the Item objects)
  getShoppingList(): Observable<Item[]> {
    return this.db.list<Item>('shoppingList').valueChanges();
  }

  // Generate a unique key for a new item without pushing data
  generateItemKey(): string {
    return this.db.database.ref('shoppingList').push().key as string;
  }

  // Add an item to the shopping list using a custom key
  addShoppingItemWithKey(item: Item): Promise<void> {
    return this.db.object(`shoppingList/${item.key}`).set(item)
      .then(() => Promise.resolve())
      .catch(err => Promise.reject(err));
  }

  // Update an item in the shopping list (e.g., marking as purchased)
  updateShoppingItem(key: string, item: Item): Promise<void> {
    return this.db.object(`shoppingList/${key}`).update(item)
      .then(() => Promise.resolve())
      .catch(err => Promise.reject(err));
  }

  // Remove an item from the shopping list
  deleteShoppingItem(key: string): Promise<void> {
    return this.db.object(`shoppingList/${key}`).remove()
      .then(() => Promise.resolve())
      .catch(err => Promise.reject(err));
  }
}
