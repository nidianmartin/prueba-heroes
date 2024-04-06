import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HeroesService } from '../service/heroes.service';
import { Material } from '../../../../shared/material/material.module';

@Component({
  selector: 'heroes-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, Material],
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchText$ = new Subject<string>();
  public search!: string;

  constructor(private service: HeroesService) {}

  ngOnInit(): void {
    this.searchText$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((name: string) => {
       this.service.filterHeroesByName(name).subscribe((resp) => {
        this.service.updateResults(resp);
       });
    });
  }
}
