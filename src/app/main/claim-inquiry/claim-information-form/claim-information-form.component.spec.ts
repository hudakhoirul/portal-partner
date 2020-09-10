import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ToastrModule} from 'ngx-toastr';

import { ClaimInformationFormComponent } from './claim-information-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClaimInformationFormComponent', () => {
  let component: ClaimInformationFormComponent;
  let fixture: ComponentFixture<ClaimInformationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ClaimInformationFormComponent
      ],
      imports: [
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(
            {
                closeButton: false,
                timeOut: 5000,
                positionClass: 'toast-bottom-right',
                preventDuplicates: false,
                extendedTimeOut: 1000,
            }
        ),
      ],
      providers: [
          AuthenticationService,
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    if (fixture.nativeElement && 'remove' in fixture.nativeElement) {
      (fixture.nativeElement as HTMLElement).remove();
    }
  });
});
