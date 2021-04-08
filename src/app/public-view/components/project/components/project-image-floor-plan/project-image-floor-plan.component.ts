import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-image-floor-plan',
  templateUrl: './project-image-floor-plan.component.html',
  styleUrls: ['./project-image-floor-plan.component.scss']
})
export class ProjectImageFloorPlanComponent {

  @Input() floorPlanImagePath: string;

}
