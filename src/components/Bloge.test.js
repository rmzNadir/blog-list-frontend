import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

// Run tests: CI=true npm test

test('renders only title and author', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 5,
    url: 'url',
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

test('if "more" button is clicked url, user and likes are shown', () => {
  const blog = {
    title: 'title',
    author: 'author',
    likes: 5,
    url: 'url',
    user: {
      username: 'username',
      name: 'name',
    },
  };

  const component = render(<Blog blog={blog} />);

  const button = component.container.querySelector('.toggleInfo');
  fireEvent.click(button);
  const linkDiv = component.container.querySelector('.linkDiv');
  const likesDiv = component.container.querySelector('.likesDiv');
  const userDiv = component.container.querySelector('.posterDiv');
  expect(linkDiv).toHaveTextContent('Link: url');
  expect(likesDiv).toHaveTextContent('Likes: 5');
  expect(userDiv).toHaveTextContent('Poster: username');
});
