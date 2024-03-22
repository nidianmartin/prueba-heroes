import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../components/heroes/state';

@Pipe({
  name: 'heroImage',
  standalone: true
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id || !hero.alt_img) {
      return 'assets/heroes/no-image.png';
    }
    if (hero.alt_img) {
      return hero.alt_img; //https://google.com/flash.png
    }
    return `assets/heroes/${hero.id}.jpg`;
  }
}
