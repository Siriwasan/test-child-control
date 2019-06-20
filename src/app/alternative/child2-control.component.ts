import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RegistryControlComponent } from './registry-control.component';
import { RegistryService } from 'src/app/feature/registry/registry.service';

@Component({
  selector: 'reg2-input',
  template: `
    <mat-form-field class="item" style="width: 100%">
      <input
        type="number"
        matInput
        [placeholder]="placeholder"
        (input)="addEvent($event)"
        [(ngModel)]="_value"
        [value]="_value"
        [required]="require"
      />
      <mat-hint>
        <a>Please enter a valid input.</a>
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
      useExisting: forwardRef(() => Child2ControlComponent),
      multi: true
    }
  ]
})
export class Child2ControlComponent extends RegistryControlComponent implements ControlValueAccessor, OnInit {
  // tslint:disable-next-line: variable-name
  public _value: any;

  @Input()
  disabled = false;

  @Input() formGroup: string;
  @Input() formControlName: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() require = true;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }

  ngOnInit() {}

  get value() {
    return this._value;
  }

  set value(val) {
    if (val) {
      this._value = val;
      this.onChange(this._value);
    }
  }

  addEvent($event) {
    this.value = this._value;
    this.onChange(this.value);
  }

  /* Takes the value  */
  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.onChange(this.value);
    }
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
