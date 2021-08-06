/**
 * @jest-environment jsdom
 */

import { BoxedCounter } from '../index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Counters', () => {
  it('Should render', () => {
    const counter = renderer
      .create(
        <BoxedCounter
          event={{
            eventStartEnd: {
              StartDateTime: new Date('2021-12-31T23:59:59'),
              EndDateTime: new Date('2022-12-31T23:59:59'),
            },
          }}
        />
      )
      .toJSON();
    expect(counter).toMatchSnapshot();
  });
});
