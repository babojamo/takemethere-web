import { AxiosPromise } from 'axios';
import apiClient from '../api/http-common';
import { Route, RouteFare } from '../types/route';
import { ExplorePayload } from '../types/api/route';

const PATH = '/api/routes';
class RouteService {
  getRoutes(): AxiosPromise<Route[]> {
    return apiClient.get(`${PATH}`);
  }
  getNearestRoutes(payload: ExplorePayload): AxiosPromise<RouteFare[][]> {
    return apiClient.get(`${PATH}/nearest`, { params: { ...payload } });
  }
}
export default new RouteService();
