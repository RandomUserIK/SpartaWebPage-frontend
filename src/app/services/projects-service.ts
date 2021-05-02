import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EndpointConfigData} from '../configuration/models/enpoint-config-data';
import {ConfigurationService} from '../configuration/services/configuration-service';
import {Project} from '../models/project/project.model';
import {PageableProjectMessageResource} from '../models/web/response-bodies/project/pageable-project-message-resource';
import {ProjectMessageResource} from '../models/web/response-bodies/project/project-message-resource';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private resource: EndpointConfigData;

  constructor(private _httpClient: HttpClient,
              private _applicationConfigService: ConfigurationService) {
    this.resource = this._applicationConfigService.endpoints.find(resource => resource.name === 'project-endpoint');
  }

  public createProject(data: Project): Observable<ProjectMessageResource> {
    return this._httpClient
      .post<ProjectMessageResource>(this.resource.address, data, {
        headers: new HttpHeaders({Accept: '*/*'}),
      });
  }


  public getAllOnPageAndCategoryAndQuery(page: number, categoryId: string, query: string): Observable<PageableProjectMessageResource> {
    return this._httpClient
      .get<PageableProjectMessageResource>(`${this.resource.address}/filter?page=${page}&${query}&category=${categoryId}`);
  }

  public getProject(projectId: number): Observable<ProjectMessageResource> {
    return this._httpClient
      // TODO: configure the given method to fetch an object of type MessageResource
      .get<ProjectMessageResource>(`${this.resource.address}/${projectId}`, {
        headers: new HttpHeaders({Accept: 'application/json'})
      });
  }

}

