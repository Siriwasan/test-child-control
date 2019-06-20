import { Component, Input } from '@angular/core';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-select',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <mat-label>{{ placeholder }}</mat-label>
      <mat-hint>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="hasInfo(controlName)"
          >info_outline</mat-icon
        >
      </mat-hint>
      <mat-select [formControlName]="controlName" [required]="require">
        <mat-option *ngFor="let choice of choices" value="{{ choice }}">{{ choice }}</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class RegistrySelectComponent extends RegistryControlComponent {
  @Input() formGroup: string;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() choices = [];

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }
}
