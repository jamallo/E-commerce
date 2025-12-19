import { Component } from "@angular/core";
import { PruebaService } from "./prueba.service";
import { CommonModule } from "@angular/common";

@Component ({
  selector: 'app-prueba',
  standalone: true,
  template: `<button (click) = "probar()">Probar endpoint protegido</button>`,
  //templateUrl: './prueba.component.html',
  imports: [CommonModule]
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
