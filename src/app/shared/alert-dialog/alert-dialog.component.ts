import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-alert-dialog',
  imports: [MatDialogModule, MatButtonModule, NgIf],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
