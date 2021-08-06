/**
 * @jest-environment jsdom
 */

import Section from '../Section';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Section', () => {
  it('Should render', () => {
    const counter = renderer.create(<Section />).toJSON();
    expect(counter).toMatchSnapshot();
  });
});
