import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Hero } from './hero.model';
import { Injectable } from '@angular/core';

export interface HeroesState extends EntityState<Hero> {}
@Injectable()
@StoreConfig({ name: 'heroes', idKey: 'id' })
export class HeroesStore extends EntityStore<HeroesState, Hero> {

  constructor() {
    super();
  }
}

