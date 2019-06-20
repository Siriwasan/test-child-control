import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTelInput } from './example-tel-input-example/example-tel-input-example.component';
import { ExampleInputComponent } from './example-input/example-input.component';

@NgModule({
  declarations: [AppComponent, MyTelInput, ExampleInputComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
