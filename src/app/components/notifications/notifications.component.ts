import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WelcomeComponent } from '../heroes/welcome/welcome.component';
import { Material } from '../../../shared/material/material.module';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [Material],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {

  constructor(public dialogRef: MatDialogRef<WelcomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
