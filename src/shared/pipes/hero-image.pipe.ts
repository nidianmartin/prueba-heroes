import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../../app/components/heroes/model/hero.model';

@Pipe({
  name: 'heroImage',
  standalone: true
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (hero.no_image) {
      return 'assets/heroes/no-image.png';
    } else {
      return `assets/heroes/${hero.id}.jpg`;
    }
   
  }
}
