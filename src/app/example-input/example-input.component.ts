import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

// /** @title Form field with custom telephone number input control. */
// @Component({
//   selector: 'form-field-custom-control-example',
//   templateUrl: 'form-field-custom-control-example.html',
//   styleUrls: ['form-field-custom-control-example.css']
// })
// export class FormFieldCustomControlExample {}

/** Data structure for holding telephone number. */
export class MyTel2 {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'example-input',
  templateUrl: 'example-input.component.html',
  styleUrls: ['example-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: ExampleInputComponent }],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  }
})
// tslint:disable-next-line: component-class-suffix
export class ExampleInputComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;

  // parts: FormGroup;
  _value: string;
  stateChanges = new Subject<void>();
  focused = false;
  errorState = false;
  controlType = 'example-input';
  id = `example-input-${ExampleInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    return !this._value || (this._value.trim() ? false : true);
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    // this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(val: string | null) {
    this._value = val;
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this._value = '';

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  writeValue(val: string | null): void {
    this.value = val;
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

  _handleInput(): void {
    this.onChange(this._value);
  }
}
