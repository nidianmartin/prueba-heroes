import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroImagePipe } from '../../../../shared/pipes/hero-image.pipe';
import { HeroesService } from '../service/heroes.service';
import { Material } from '../../../../shared/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  providers: [HeroesService],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroImagePipe,
    Material,
    FormsModule,
  ],
})
export class HeroFormComponent {

  public form!: FormGroup;

  constructor(
    private service: HeroesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public heroData: any
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
      superhero: new FormControl(null, [Validators.required]),
      publisher: new FormControl(null),
      alter_ego: new FormControl(null, [Validators.required]),
      first_appearance: new FormControl(null),
      characters: new FormControl(null),
      no_image: new FormControl(false),
    });

    if (this.heroData.hero) {
      this.form.patchValue(this.heroData.hero);
    }
  }

  ngOnInit() {}

  validateForm() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        this.notification('Please complete the form')
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  create() {
    let idRandom = crypto.randomUUID;
    this.form.get('id')?.patchValue(idRandom);

    if (this.form.valid) {
      this.service.createHero(this.form.value).subscribe({
        next: () => {
          this.service.get().subscribe((response) => {
            this.service.updateResults(response);
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.notification(error)
        },
      });
    } else {
      this.validateForm();
    }
  }

  update() {
    if (this.form.valid) {
      this.service.update(this.form.value).subscribe({
        next: () => {
          this.notification('Successfully update hero')
          this.dialogRef.close();
        },
        error: (error) => {
          this.notification(error)
        },
      });
    } else {
      this.validateForm();
    }
  }

  notification(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
