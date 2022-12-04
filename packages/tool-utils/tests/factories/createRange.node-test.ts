import {createRange} from '../../_api';

describe('node - utils:factories:createRange', () => {
  it('should throw error when initialization is invalid', () => {
    expect(() => {
      const upper = 10;

      createRange(upper + 1, upper);
    }).toThrowError();
  });

  it('should throw error when token is invalid', () => {
    expect(() => {
      const range = createRange(0, 10);
      const token = Symbol();

      range.read(token);
    }).toThrowError();
  });

  it('should return `true` when range has ...', () => {
    const range = createRange(0, 10);

    expect(range.has(4)).toBeTruthy();
    expect(range.has(11)).toBeFalsy();
  });

  it('should return `true` when ranges are equals', () => {
    const initialization = [0, 10] as const;

    const range1 = createRange(...initialization);
    const range2 = createRange(...initialization);

    expect(range1.equals(range2));
  });

  it('should return `true` when range is superrange of second', () => {
    const rangeFrom0To10 = createRange(0, 10);
    const rangeFrom3To6 = createRange(3, 6);

    expect(rangeFrom0To10.isSuperrange(rangeFrom3To6)).toBeTruthy();
    expect(rangeFrom3To6.isSuperrange(rangeFrom0To10)).toBeFalsy();
  });

  it('should return `true` when range is subrange of second', () => {
    const rangeFrom0To10 = createRange(0, 10);
    const rangeFrom3To6 = createRange(3, 6);

    expect(rangeFrom3To6.isSubrange(rangeFrom0To10)).toBeTruthy();
    expect(rangeFrom0To10.isSubrange(rangeFrom3To6)).toBeFalsy();
  });

  it('should return `true` when range intersects with second', () => {
    const rangeFrom0To10 = createRange(0, 10);
    const rangeFrom3To6 = createRange(3, 6);
    const rangeFrom0To2 = createRange(0, 2);

    expect(rangeFrom0To10.intersects(rangeFrom3To6)).toBeTruthy();
    expect(rangeFrom0To2.intersects(rangeFrom3To6)).toBeFalsy();
  });
});
