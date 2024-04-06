import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Hero } from '../model/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  private heroesList = new BehaviorSubject<Hero[]>([]);
  public currentHeroesList$ = this.heroesList.asObservable();
  
  constructor(public http: HttpClient) {}

  get(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(tap((response: Hero[])=> {
      this.heroesList.next(response)
    }));
  }


  filterHeroesByName(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
      map((heroes: Hero[]) =>
        heroes.filter((hero) =>
          hero.superhero.toLowerCase().includes(query.toLowerCase())
        )
      ),
      tap((response: any) => { console.log(response)})
    );
  }

  createHero(hero: Hero) {
    return this.http.post<Hero>(`${this.baseUrl}/heroes/`, hero).pipe(
      tap((hero: Hero) => {
         this.addHero(hero)
      }),
      catchError(this.handleError)
    );
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/{id}`.replace(
      '{id}',
      hero.id
    );
    return this.http.patch<Hero>(url, hero).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  deleteHero(heroId: any) {
    const url = `${this.baseUrl}/heroes/{id}`.replace(
      '{id}',
      heroId.toString()
    );
    return this.http.delete<Hero>(url, heroId).pipe(
      tap()
    );
  }

  //Suscripciones

  updateResults(results: Hero[]) {
    this.heroesList.next(results);
  }

  addHero(hero: Hero) {
    const currentValue = this.heroesList.value;
    this.heroesList.next([...currentValue, hero]);
  }


  private handleError(response: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(response?.error));
  }
}
