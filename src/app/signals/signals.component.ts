import { Component, signal, computed, effect, untracked } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor]
})

export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal<number>(0);
  doubleCounter = computed(() => this.counter() * 2);
  buttonsClicked = signal<number>(0);
  private hasInitializedCounterEffect = false;

  constructor() {
    effect(() => {
      this.counter();

      if (!this.hasInitializedCounterEffect) {
        this.hasInitializedCounterEffect = true;
        return;
      }

      untracked(() => {
        this.buttonsClicked.update((val: number) => val + 1);
      });
    });
  }

  increment() {
    this.actions.update((val: string[]) => [...val, 'INCREMENT']);
    this.counter.update((val: number) => val + 1);
  }

  decrement() {
    this.counter.update((val: number) => val - 1);
    this.actions.update((val: string[]) => [...val, 'DECREMENT']);
  }
}
