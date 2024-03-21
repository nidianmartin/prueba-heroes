import { Component, Inject, OnInit } from '@angular/core';
import { Hero, HeroesQuery, HeroesService, HeroesStore } from '../state';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { antDesing } from '../../../antDesing/antDesing.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SearchPageComponent } from '../search-page/search-page.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, antDesing, SearchPageComponent],
  providers: [HeroesService, HeroesStore, HeroesQuery, NzModalService],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public heroes$: Observable<Hero[]> = this.query.heroes$;
  public loading$: Observable<boolean> = this.query.loading$;

  constructor(
    private service: HeroesService,
    private query: HeroesQuery,
    private modal: NzModalService,
    private message: NzMessageService
  ) {
    this.service.get().subscribe();
  }

  ngOnInit() {}

  openModal(hero?: Hero) {
    const modal = this.modal.create({
      nzContent: HeroFormComponent,
      nzTitle: hero ? 'Update Hero' : 'New Hero',
      nzData: { heroe: hero },
      nzFooter: null
    });
    const instance = modal.getContentComponent();
  }

  remove(heroId: any) {
    this.service.deleteHero(heroId).subscribe({
      next: () => {
        this.message.success('Successfully delete hero');
      },
      error: () => {
        this.message.error('Error in server');
      },
    });
  }

  cancel() {}
}
