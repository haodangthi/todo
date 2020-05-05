import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


//   const defineKindOfTriangle = (sideA, sideB, sideC) => {
//     //Your implementation
//     if (less(sideA, sideB, sideC)) {
//       return "not exists";
//     }
  
//     if (
//       sideEquals(sideA, sideB, sideC) ||
//       sideEquals(sideA, sideC, sideB) ||
//       sideEquals(sideB, sideC, sideA)
//     ) {
//       return "rectangular";
//     } else if (
//       sideMore(sideA, sideB, sideC) ||
//       sideMore(sideA, sideC, sideB) ||
//       sideMore(sideB, sideC, sideA)
//     ) {
//       return "obtuse";
//     } else if (
//       sideLess(sideA, sideB, sideC) &&
//       sideLess(sideA, sideC, sideB) &&
//       sideLess(sideB, sideC, sideA)
//     ) {
//       return "acute-angled";
//     }
//   };
//   const sideEquals = (a, b, c) => a * a + b * b === c * c;
//   const sideMore = (a, b, c) => a * a + b * b < c * c;
//   const sideLess = (a, b, c) => a * a + b * b > c * c;
//   const less = (a, b, c) => a + b < c || b + c < a || a + c < c;
  
//   module.exports = defineKindOfTriangle;
  
  
// //git config user.name "lienavu"
// //git config user.email "vulena13@gmail.com"  
