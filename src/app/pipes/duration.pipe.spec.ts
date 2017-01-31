import { it, describe, expect, beforeEach, inject } from 'angular2/testing';
import { DurationPipe } from "./duration.pipe";

describe('DurationPipe Tests', () => {
    let pipe: DurationPipe;

    beforeEach(() => {
        pipe = new DurationPipe();
    });

    it('Should transform minutes to the "Nh Mmin" format', () => {
      expect(pipe.transform(0, null)).toEqual('0h 0min');
      expect(pipe.transform(5, null)).toEqual('0h 5min');
      expect(pipe.transform(120, null)).toEqual('2h 0min');
      expect(pipe.transform(75, null)).toEqual('1h 15min');
    });

    it('Should throw error in case of negative parameter', () => {
      expect(function() { pipe.transform(-100500, null) }).toThrow(new RangeError('Parameter must be positive'));
    });
});