import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Hero } from '../model/hero.model';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  constructor(public http: HttpClient) {}

  get(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError(this.handleError));
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
      tap(),
      catchError(this.handleError)
    );
  }

  update(hero: Hero): Observable<Hero> {
    console.log(hero)
    const url = `${this.baseUrl}/heroes/{id}`.replace(
      '{id}',
      hero.id
    );
    return this.http.patch<Hero>(url, hero).pipe(
      tap((hero: Hero) => {
        console.log(hero)
        //return hero
      })
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


  private handleError(response: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(response?.error));
  }
}
