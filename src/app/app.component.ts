import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { CabeceraComponent } from "./shared/cabecera/cabecera.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, CabeceraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NgAFondoLimpiezas';
}
