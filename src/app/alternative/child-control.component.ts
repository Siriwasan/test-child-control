import { Component, Input, ViewChild, AfterViewInit, forwardRef } from '@angular/core';
import { DefaultValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { RegistryControlComponent } from './registry-control.component';
import { RegistryService } from 'src/app/feature/registry/registry.service';

@Component({
  selector: 'app-child-control',
  template: `
    <mat-form-field class="item" style="width: 100%">
      <input
        [type]="type"
        ngDefaultControl
        matInput
        [placeholder]="placeholder"
        [required]="require"
      />
      <mat-hint>
        <a>Please enter a valid input.</a>
        <mat-icon style="cursor: help;" (click)="openInfo('AN')" *ngIf="hasInfo('AN')">info_outline</mat-icon>
      </mat-hint>
      <mat-error>This field cannot be empty!</mat-error>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChildControlComponent),
      multi: true
    }
  ]
})
export class ChildControlComponent extends RegistryControlComponent implements ControlValueAccessor, AfterViewInit {
  @Input() formGroup: string;
  @Input() controlName: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() require = true;

  @Input() label: string;
  // @Input() formControlName: string;
  @ViewChild(DefaultValueAccessor, { static: true }) valueAccessor: DefaultValueAccessor;

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();

  constructor(protected registryService: RegistryService) {
    super(registryService);
  }

  ngAfterViewInit(): void {
    this.delegatedMethodCalls.subscribe(fn => fn(this.valueAccessor));
  }

  registerOnChange(fn: (_: any) => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnChange(fn));
  }
  registerOnTouched(fn: () => void): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.registerOnTouched(fn));
  }

  setDisabledState(isDisabled: boolean): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.setDisabledState(isDisabled));
  }

  writeValue(obj: any): void {
    this.delegatedMethodCalls.next(valueAccessor => valueAccessor.writeValue(obj));
  }
}
