import {createAutoPercentage} from '../../_api';

describe('node - utils:factories:createAutoPercentage', () => {
  it('should count to `1`', () => {
    const autoPercentage = createAutoPercentage();
    const steps = [
      {name: 'init', progress: autoPercentage.percentage()},
      {name: 'modify', progress: autoPercentage.percentage()},
      {name: 'verify', progress: autoPercentage.percentage()},
      {name: 'cleanup', progress: 0},
    ];
    let progess = 0;

    steps.forEach(step => {
      progess += Number(step.progress);
    });

    expect(progess).toBe(1);
  });

  it('should count to `0.75`', () => {
    const autoPercentage = createAutoPercentage();
    const steps = [
      {name: 'init', progress: autoPercentage.percentage()},
      {name: 'modify', progress: autoPercentage.percentage()},
      {name: 'verify', progress: autoPercentage.percentage()},
      {name: 'cleanup', progress: 0},
    ];
    let progess = 0;

    autoPercentage.count();

    steps.forEach(step => {
      progess += Number(step.progress);
    });

    expect(progess).toBe(0.75);
  });
});
