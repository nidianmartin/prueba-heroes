import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { antDesing } from '../../../antDesing/antDesing.module';
import { Hero, HeroesQuery, HeroesService, HeroesStore } from '../state';
import { Observable } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HeroImagePipe } from '../../../pipes/hero-image.pipe';

interface IModalData {
  heroe: Hero;
}

@Component({
  selector: 'app-hero-form',
  standalone: true,
  providers: [HeroesService, HeroesQuery, HeroesStore],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  imports: [CommonModule, ReactiveFormsModule, antDesing, HeroImagePipe],
})
export class HeroFormComponent {
  public form!: FormGroup;

  public heroes$: Observable<Hero[]> = this.query.heroes$;

  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  constructor(
    private query: HeroesQuery,
    private service: HeroesService,
    private modal: NzModalRef,
    private formBuilder: FormBuilder,
    private message: NzMessageService
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

    if (this.nzModalData.heroe) {
      this.form.patchValue(this.nzModalData.heroe);
    }

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
          this.message.success('Successfully create hero');
          this.modal.destroy();
        },
        error: () => {
          this.message.error('Error in server');
        },
      });
    } else {
      this.validateForm();
      this.message.error('Please complete the form');
    }
  }

  update() {
    if (this.form.valid) {
      this.service.update(this.form.value).subscribe({
        next: () => {
          this.message.success('Successfully update hero');
          this.modal.destroy();
        },
        error: () => {
          this.message.error('Error in server');
        },
      });
    } else {
      this.validateForm();
      this.message.error('Please complete the form');
    }
  }

  cancel() {
    this.modal.destroy();
  }
}
