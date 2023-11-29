import { Injectable } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateTo(segments: string[], route?: ActivatedRoute) {
    return this.router.navigate(segments, { relativeTo: route });
  }

  navigateWithUrl(url: string) {
    return this.router.navigateByUrl(url);
  }

  navigateWithParams(segments: string[], params: Params) {
    return this.router.navigate(segments, {
      queryParams: params,
    });
  }

  navigateWithData(segments: any[], data: any, route?: ActivatedRoute) {
    return this.router.navigate(segments, {
      state: data,
      relativeTo: route,
    });
  }

  navigateWithMultipleOutlet(segments: string[], outletName: string) {
    return this.router.navigate([{ outlets: { [outletName]: segments } }]);
  }

  goBack() {
    window.history.back();
  }
}
