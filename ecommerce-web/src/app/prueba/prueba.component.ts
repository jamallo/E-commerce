import { Component } from "@angular/core";
import { PruebaService } from "./prueba.service";

@Component ({
  selector: 'app-prueba',
  standalone: true,
  template: `<button (click) = "probar()">Probar endpoint protegido</button>`
})

export class PruebaComponent {

  constructor(private pruebaService: PruebaService) {}

  probar() {
    this.pruebaService.acceder().subscribe({
      next: res => console.log(res),
      error: err => console.error(err)
    });
  }
}
