import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AfterViewInit, Input, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export abstract class DelegatingValueAccessor implements ControlValueAccessor, AfterViewInit {
  @Input() formControlName: string;
  @ViewChild('valueAccessor', { static: true, read: NG_VALUE_ACCESSOR }) valueAccessor: ControlValueAccessor;

  // Remove, if you don't use Angular Material
  @ViewChild('matSelect', { static: true }) matSelect;

  delegatedMethodCalls = new ReplaySubject<(_: ControlValueAccessor) => void>();

  ngAfterViewInit(): void {
    // #WORKAROUND MatSelect doesn't provide a control value accessor
    // Remove, if you don't use Angular Material
    if (!this.valueAccessor && this.matSelect) {
      this.valueAccessor = this.matSelect;
    }

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
