import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from '../search-page/search-page.component';
import { HeroesService } from '../service/heroes.service';
import { Hero } from '../model/hero.model';
import { Subscription, catchError } from 'rxjs';
import { Material } from '../../../../shared/material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchPageComponent, Material],
  providers: [HeroesService],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public errorMessage!: string;
  public heroes = new MatTableDataSource<Hero>();
  public updateHeroes!: Hero[];
  public isLoading: boolean = false;

  //Material
  public displayedColumns: string[] = [
    'superhero',
    'publisher',
    'alter_ego',
    'characters',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.heroes.paginator = this.paginator;
  }

  public subscription!: Subscription;

  constructor(private service: HeroesService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.get().subscribe({
      next: (response) => {
        this.heroes = new MatTableDataSource(response);
        this.heroes.paginator = this.paginator;
        this.heroes.sort = this.sort;
        this.updateHeroes = response;
        this.isLoading = false;
      },
      error: (error) => {
        catchError(error);
      },
    });

    this.subscription = this.service.currentHeroesList$.subscribe((results) => {
      this.heroes = new MatTableDataSource(results);
      this.heroes.paginator = this.paginator;
      this.heroes.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal(hero?: Hero) {
    this.dialog.open(HeroFormComponent, {
      data: {
        hero,
      },
      width: '500px',
    });
  }

  deleteHero(heroId: any) {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      width: '350px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.deleteHero(heroId).subscribe((resp: any) => {
          let index = this.updateHeroes.findIndex((item) => item.id === resp.id);
          if (index > -1) {
            this.updateHeroes.splice(index, 1);
            this.heroes.data = this.updateHeroes;
          }
        });
        this.snackBar.open('Eliminated hero', 'Close', {
          duration: 2000,
        });
      }
    });
    
  }
}
