import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "betail", pathMatch: "full" },
  {
    path: "betail",
    children: [
      {
        path: "",
        loadChildren: "./betail/betail.module#BetailPageModule"
      },
      {
        path: ":beteId",
        loadChildren:
          "./betail/bete-detail/bete-detail.module#BeteDetailPageModule"
      }
    ]
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
