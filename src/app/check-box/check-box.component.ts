import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'check-box',
    templateUrl: './check-box.component.html',
    styleUrls: ['./check-box.component.scss'],
    imports: [
        CommonModule
    ],
    standalone: true
})
export class CheckBoxComponent {
    
    @Input() label?: string;
    @Input() checked: boolean;
    @Output() markAsPurchased = new EventEmitter<any>();
    @Output() markAsInCart = new EventEmitter<any>();

    markAsInCartClick() {
        this.markAsInCart.emit();
    }
    markAsPurchasedClick() {
        this.markAsPurchased.emit();
    }

    @Output() checkedChange = new EventEmitter<boolean>();

    onCheckChanged() {
        this.checkedChange.emit(this.checked);
    }
}
