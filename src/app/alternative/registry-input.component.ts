import { Component, Input } from '@angular/core';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg-input',
  template: `
    <mat-form-field class="item" [formGroup]="formGroup" style="width: 100%">
      <input [type]="this.typed" matInput [placeholder]="placeholder" [formControlName]="controlName" [required]="require" />
      <mat-hint>
        <a>Please enter a valid input.</a>
        <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="hasInfo(controlName)"
          >info_outline</mat-icon
        >
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations(controlName)">
        <mat-error *ngIf="isInvalid(controlName, validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo(controlName)" *ngIf="hasInfo(controlName)"
            >info_outline</mat-icon
          >
        </mat-error>
      </mat-error>
    </mat-form-field>
  `
})
export class RegistryInputComponent extends RegistryControlComponent {
  @Input() formGroup: string;
  @Input() controlName: string;
  @Input() typed = 'number';
  @Input() placeholder: string;
  @Input() require = true;

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }
}
