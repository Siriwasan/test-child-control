import { Component, Input, OnInit, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RegistryService } from '../../../feature/registry/registry.service';
import { RegistryControlComponent } from './registry-control.component';
import { MatSelectChange, MatSelect } from '@angular/material';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'reg2-select',
  template: `
    <mat-form-field class="item" style="width: 100%">
      <mat-select (selectionChange)="selectionChanged($event)" [placeholder]="placeholder" ngModel [required]="require">
        <mat-option *ngFor="let choice of choices" [value]="choice">{{ choice }}</mat-option>
      </mat-select>
      <mat-hint>
        <mat-icon style="cursor: help;" (click)="openInfo(formControlName)" *ngIf="hasInfo(formControlName)"
          >info_outline</mat-icon
        >
      </mat-hint>
      <mat-error *ngFor="let validation of getValidations(formControlName)">
        <mat-error *ngIf="isInvalid(formControlName, validation.type)">
          <a>{{ validation.message }}</a>
          <mat-icon style="cursor: help;" (click)="openInfo(formControlName)" *ngIf="hasInfo(formControlName)"
            >info_outline</mat-icon
          >
        </mat-error>
      </mat-error>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegistrySelect2Component),
      multi: true
    }
  ]
})
export class RegistrySelect2Component extends RegistryControlComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() require = true;
  @Input() choices = [];

  // tslint:disable-next-line: variable-name
  public _value: any;

  @Input()
  disabled = false;

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }

  ngOnInit() {}

  // get value() {
  //   return this._value;
  // }

  // set value(val) {
  //   if (val) {
  //     this._value = val;
  //     this.onChange(this._value);
  //   }
  // }

  // addEvent($event) {
  //   this.value = this._value;
  //   this.onChange(this.value);
  // }

  selectionChanged(event: MatSelectChange) {
    this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
    this.valueChange.emit(event.value);
    this.onChange(event.value);
    this.onTouched();
  }

  /* Takes the value  */
  writeValue(value: any) {
    // if (value !== undefined) {
    //   this.value = value;
    //   this.onChange(this.value);
    // }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
