import { HeroesStore } from './heroes.store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Hero } from './hero.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { setLoading } from '@datorama/akita';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = environment.baseUrl;
  constructor(private store: HeroesStore, public http: HttpClient) {}

  get(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
      setLoading(this.store),
      tap((response: any) => {
        console.log(response);
        this.store.set(response);
      }),
      catchError(this.handleError)
    );
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
      tap((response) => {
        this.store.set(response);
      })
    );
  }

  createHero(hero: Hero) {
    return this.http.post<Hero>(`${this.baseUrl}/heroes/`, hero).pipe(
      setLoading(this.store),
      tap((response) => {
        this.store.add(response);
      }),
      catchError(this.handleError)
    );
  }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.baseUrl}/heroes/{id}`.replace(
      '{id}',
      hero.id.toString()
    );
    return this.http.patch<Hero>(url, hero).pipe(
      setLoading(this.store),
      tap((response) => {
        this.store.replace(response.id, response);
      })
    );
  }

  deleteHero(heroId: any) {
    const url = `${this.baseUrl}/heroes/{id}`.replace(
      '{id}',
      heroId.toString()
    );
    return this.http.delete<Hero>(url, heroId).pipe(
      setLoading(this.store),
      tap((response) => {
        this.store.remove(heroId);
      })
    );
  }

  setActive(id: number | null) {
    this.store.setActive(id);
  }

  private handleError(response: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(response?.error));
  }
}
