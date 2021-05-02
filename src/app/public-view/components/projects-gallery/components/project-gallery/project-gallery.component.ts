import {Component, Input, OnInit} from '@angular/core';
import {ConfigurationService} from '../../../../../configuration/services/configuration-service';
import {EndpointConfigData} from '../../../../../configuration/models/enpoint-config-data';
import {FileService} from '../../../../../admin-view/services/file-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Project} from '../../../../../models/project/project.model';

@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrls: ['./project-gallery.component.scss']
})
export class ProjectGalleryComponent implements OnInit {

  @Input() project: Project;

  private resource: EndpointConfigData;
  public image: SafeUrl;
  public projects = new Array<SafeUrl>();
  public loading = false;

  constructor(private config: ConfigurationService,
              private fileService: FileService,
              private sanitizer: DomSanitizer) {
    this.resource = this.config.endpoints.find(resource => resource.name === 'photo-endpoint');
  }

  ngOnInit() {
    this.loading = true;
    this.fileService.getFileFromPath(this.project.titleImage).subscribe(photo => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(new Blob([photo],
          {type: 'application/octet-stream'}))
      );
      this.loading = false;
    });
  }

}
