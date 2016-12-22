import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-edit-course',
  templateUrl: './add-edit-course.component.html'
})
export class AddEditCourseComponent {
  public id: string;
  private sub: any;
	
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('hello `Add/Edit Course` component');
	
	this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
