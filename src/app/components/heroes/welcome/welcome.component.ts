import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from '../search-page/search-page.component';
import { HeroesService } from '../service/heroes.service';
import { Hero } from '../model/hero.model';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchPageComponent],
  providers: [HeroesService],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public heroes$!: Observable<Hero[]>;
  public errorMessage!: string;

  constructor(
    private service: HeroesService,
  ) {  }

  ngOnInit(): void {
   this.heroes$ =  this.service.get().pipe(catchError((error: string) => {
    console.log(error)
    this.errorMessage = error;
    return EMPTY
   }))
  }
}
