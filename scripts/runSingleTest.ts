import {timeout} from '@wren/utils';
import {$, question} from 'zx';

const query = 'Can you pass name of test?';

const runSingleTest = async () => {
  const testNamePatternPromise = question(query);
  const testNamePatternValue = await timeout(testNamePatternPromise, 10_000);

  $`jest --config --testNamePattern '${testNamePatternValue}'`;
};

void runSingleTest();
