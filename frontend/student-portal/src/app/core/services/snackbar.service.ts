import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackBarRef: MatSnackBarRef<any> | null = null;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this._snackBar.open(message, action);
    return this.snackBarRef.onAction();
  }
}
