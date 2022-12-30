import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  heroForm : FormControl = new FormControl('');

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(): void {
    const createdHero = {
        "name": this.heroForm.value,
    } as Hero;
    if (!this.heroForm.valid) { return; }
    this.heroService.addHero(createdHero)
      .subscribe(hero => {
        this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
