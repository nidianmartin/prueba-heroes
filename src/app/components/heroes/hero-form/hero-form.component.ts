import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroImagePipe } from '../../../../shared/pipes/hero-image.pipe';
import { HeroesService } from '../service/heroes.service';
import { Hero } from '../model/hero.model';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  providers: [HeroesService],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  imports: [CommonModule, ReactiveFormsModule, HeroImagePipe],
})
export class HeroFormComponent {
  public hero!: Hero
  public form!: FormGroup;

  constructor(
    private service: HeroesService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      id: new FormControl(null),
      superhero: new FormControl(null, [Validators.required]),
      publisher: new FormControl(null),
      alter_ego: new FormControl(null, [Validators.required]),
      first_appearance: new FormControl(null),
      characters: new FormControl(null),
      no_image: new FormControl(null),
    });

    this.form.get('id')?.disable();
  }

  ngOnInit() {}

  validateForm() {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
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
        
        },
        error: () => {
         
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
        },
        error: () => {
         
        },
      });
    } else {
      this.validateForm();
    }
  }

  cancel() {
  }
}
