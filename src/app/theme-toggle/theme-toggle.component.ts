import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true
})
export class ThemeToggleComponent implements OnInit {
  
  lightModeEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('shoppingListLightMode') === 'true') {
      this.lightModeEnabled = true;
      document.body.classList.add('light-mode');
    } else {
      this.lightModeEnabled = false;
      document.body.classList.remove('light-mode');
    }
  }

  toggleTheme() {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('shoppingListLightMode', 'true');
      this.lightModeEnabled = true;
    } else {
      localStorage.setItem('shoppingListLightMode', 'false');
      this.lightModeEnabled = false;
    }
  }
}
