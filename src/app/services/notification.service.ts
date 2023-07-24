import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string) {
    return this._snackBar.open(message, 'X', { panelClass: ['snackbar-error'] });
  }

  success(message: string) {
    return this._snackBar.open(message, 'X', { panelClass: ['snackbar-success'] });
  }

  info(message: string) {
    return this._snackBar.open(message, 'X', { panelClass: ['snackbar-info'] });
  }

}