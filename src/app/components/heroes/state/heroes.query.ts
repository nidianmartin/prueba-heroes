import { QueryEntity } from '@datorama/akita';
import { HeroesStore, HeroesState } from './heroes.store';
import { Hero } from './hero.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroesQuery extends QueryEntity<HeroesState, Hero> {

  public heroes$ = this.selectAll();
  public loading$ = this.selectLoading();

  constructor(store: HeroesStore) {
    super(store);
  }

}
