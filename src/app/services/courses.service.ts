import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { Course } from '../courses/course';

//REST Server Courses service mock
export class CoursesService {
  private SERVER_DELAY: number = 1200;

  private courses: Course[] = [
      new Course(1, 'Matt LeBlanc tackles the Ariel Nomad! - New Top Gear Teaser', 100, 'The brand new series of TG is weeks away. Here\'s one of the films to look forward to... What happens when you introduce a star from Hollywood to a car from Somerset? An utterly bonkers car, at that?', new Date('05.05.2010')),
      new Course(2, 'Ken Block Drifts London - EXTENDED Director\'s Cut - Top Gear - BBC', 200, 'Ladies and gentlemen, allow us to present you with an extended cut of a very special film: Matt LeBlanc on a tour of London with Ken Block and his Hoonicorn Mustang. Turn it up very, very loud, sit back, and enjoy... Taken from Top Gear: Series 23', new Date()),
      new Course(3, 'Rory Reid vs Ford Focus RS - Top Gear: Series 23 - BBC', 17, 'Today\'s hot hatch world is populated with talent, with many Fast Things like the Mercedes-AMG A45 and Civic Type R. Which means the new 345bhp Ford Focus RS has its work cut out..', new Date('05.05.2011'))
  ];

  constructor() {
  }

  public get(id?: number): Observable<Course[]> {
    if (id) {
      throw new Error('Not implemented');
    }

    return new Observable<Course[]>((subscriber: Subscriber<Course[]>) => {
      setTimeout(() => {
        return subscriber.next([].concat(this.courses));
      }, this.SERVER_DELAY);
    });
  }

  public post() {
    throw new Error('Not implemented');
  }

  public put() {
    throw new Error('Not implemented');
  }

  public delete(id: number): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      setTimeout(() => {
        let removingIndex: number;

        this.courses.forEach((item, index) => {
            if (item.id === id) {
                removingIndex = index;
            }
        });

        if (removingIndex) {
            this.courses.splice(removingIndex, 1);
        }

        return subscriber.next(true)
      }, this.SERVER_DELAY);
    });
  }
}