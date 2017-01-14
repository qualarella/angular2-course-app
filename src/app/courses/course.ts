export class Course {
  constructor(public id: number,
              public name: string,
              public duration: number,
              public description,
              public created: Date) { }
}