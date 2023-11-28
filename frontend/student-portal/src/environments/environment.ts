import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken('API URL');

export const environment = {
  production: false,
  apiUrl: 'localhost:8081/api/v1',
};
