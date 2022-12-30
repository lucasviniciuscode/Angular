import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  editHero: FormGroup;
  hero: Hero | undefined;

  createForm(): FormGroup{
    return new FormGroup({
      name: new FormControl(),
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.editHero = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    const createdHero = {
        "id": this.hero.id,
        "name": this.editHero.value.name
    } as Hero;
    if (createdHero) {
      this.heroService.updateHero(createdHero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}