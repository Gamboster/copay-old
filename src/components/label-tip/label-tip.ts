import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { AlertType } from '../info-sheet/info-sheet-template';

@Component({
  selector: 'label-tip',
  template: `
    <div class="label-header" *ngIf="header !== 'no-header'">
      <ng-container *ngIf="async; else other">
        <ion-spinner
          class="label-header__icon"
          name="crescent"
          *ngIf="async"
        ></ion-spinner>
      </ng-container>
      <ng-template #other>
        <img
          *ngIf="type === 'info'"
          class="label-header__icon"
          src="assets/img/icon-info-blue.svg"
        />
        <img
          *ngIf="type === 'warn'"
          class="label-header__icon"
          src="assets/img/icon-warning-circled.svg"
        />
        <img
          *ngIf="type === 'danger'"
          class="label-header__icon"
          src="assets/img/icon-danger.svg"
        />
      </ng-template>
      <ng-content select="[label-tip-title]"></ng-content>
    </div>
    <div
      [ngClass]="{
        blue: type === 'info',
        yellow: type == 'warn',
        red: type == 'danger'
      }"
    >
      <ng-content select="[label-tip-body]"></ng-content>
    </div>
  `
})
export class LabelTip {
  @Input()
  type: AlertType;
  @Input()
  async?: boolean;
  @Input()
  header: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.renderer.addClass(this.element.nativeElement, this.type);
  }
}
