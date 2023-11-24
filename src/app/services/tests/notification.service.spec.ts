import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../notification.service';
import { UserDialogComponent } from 'src/app/components/user-dialog/user-dialog.component';


describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    const dialogSpyObj = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpyObj },
        { provide: MatDialog, useValue: dialogSpyObj }
      ]
    });

    service = TestBed.inject(NotificationService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should open an error snackbar', () => {
    const errorMessage = 'An error occurred';
    service.openErrorSnackBar(errorMessage);
    expect(snackBarSpy.open).toHaveBeenCalledWith(errorMessage, 'X', {
      duration: 3000,
      panelClass: ['red-snackbar'],
    });
  });

  it('should open a success snackbar', () => {
    const successMessage = 'Operation successful';
    service.openSuccessSnackBar(successMessage);
    expect(snackBarSpy.open).toHaveBeenCalledWith(successMessage, 'X', {
      duration: 3000,
      panelClass: ['green-snackbar'],
    });
  });

  it('should open the delete dialog', () => {
    const deleteMessage = 'Are you sure you want to delete?';
    service.openDeleteDialog(deleteMessage);
    expect(dialogSpy.open).toHaveBeenCalledWith(UserDialogComponent, {
      autoFocus: false,
      data: { msg: deleteMessage },
    });
  });
});