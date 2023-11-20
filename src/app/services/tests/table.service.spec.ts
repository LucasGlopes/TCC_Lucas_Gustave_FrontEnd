import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDialogComponent } from 'src/app/components/user-dialog/user-dialog.component';
import { TableService } from '../table.service';


describe('TableService', () => {
  let service: TableService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableService
      ]
    });

    service = TestBed.inject(TableService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return zero length when length is zero', () => {
		const page = 1;
		const pageSize = 5;
		const minLength = 0;

		const result = service.getCustomRangeLabel(page, pageSize, minLength);

		expect(result).toBe(`0 de ${minLength}`)
  });

	it('should return zero length when pageSize is zero', () => {
		const page = 1;
		const pageSize = 0;
		const minLength = 10;

		const result = service.getCustomRangeLabel(page, pageSize, minLength);

		expect(result).toBe(`0 de ${minLength}`)
  });

	it('should return customRangeLabel', () => {
		const page = 0;
		const pageSize = 5;
		const length = 20;

		const result = service.getCustomRangeLabel(page, pageSize, length);

		expect(result).toBe(`1 - 5 de ${length}`)
  });


});