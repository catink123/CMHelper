import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string
}

@Component({
  selector: 'app-edit-name-dialog',
  templateUrl: './edit-name-dialog.component.html',
  styleUrls: ['./edit-name-dialog.component.scss']
})
export class EditNameDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogRef: MatDialogRef<EditNameDialogComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }

}