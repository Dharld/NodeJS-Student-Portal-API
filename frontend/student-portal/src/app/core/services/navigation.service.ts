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

  navigateWithData(segments: string[], data: any, route?: ActivatedRoute) {
    return this.router.navigate(segments, {
      state: data,
      relativeTo: route,
    });
  }

  goBack() {
    window.history.back();
  }
}
