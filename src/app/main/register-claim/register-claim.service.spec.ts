import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RegisterClaimService } from './register-claim.service';
import { AuthenticationService } from '@app/core';

describe('RegisterClaimService', () => {
  let service: RegisterClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
          AuthenticationService,
      ],
    });

    service = TestBed.get(RegisterClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a promise', (done: DoneFn) => {
    service.getPromises().then(value => {
      expect(value).toBe('from promise');
      done();
    });
  });

  it('should return a observable', (done: DoneFn) => {
    service.getObservables().subscribe(value => {
      expect(value).toBe('from observable');
      done();
    });
  });

});
