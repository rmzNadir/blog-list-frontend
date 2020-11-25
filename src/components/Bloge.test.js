import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders only title and author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 5,
    url: 'this is the url',
    user: {
      username: 'username',
      name: 'name',
    },
  };

  const component = render(<Blog blog={blog} />);

  const defaultInfo = component.container.querySelector('.defaultInfo');
  expect(defaultInfo).toHaveTextContent('title by author');
  expect(component.container.querySelector('.extraInfo')).toBe(null);
});
