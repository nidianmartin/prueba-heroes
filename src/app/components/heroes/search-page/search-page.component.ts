import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { antDesing } from '../../../antDesing/antDesing.module';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeroesService } from '../state';

@Component({
  selector: 'heroes-search-page',
  standalone: true,
  imports: [CommonModule, antDesing, FormsModule],
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchText$ = new Subject<string>();
  public search!: string;

  constructor(private service: HeroesService) {}

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((name: string) => {
       this.service.filterHeroesByName(name).subscribe();
    });
  }
}