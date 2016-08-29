/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { SingleComponent } from './single.component';

describe('Component: Single', () => {
  it('should create an instance', () => {
    let component = new SingleComponent();
    expect(component).toBeTruthy();
  });
});
