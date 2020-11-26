import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

// Run ALL tests: CI=true npm test
// Run only the tests in this file: CI=true npm test -- Blog.test.js
// Run a specific test: CI=true npm test -- -t 'renders only title and'

describe('<Blog/> tests', () => {
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

    const button = component.container.querySelector('#toggleInfo');
    fireEvent.click(button);
    const linkDiv = component.container.querySelector('.linkDiv');
    const likesDiv = component.container.querySelector('.likesDiv');
    const userDiv = component.container.querySelector('.posterDiv');
    expect(linkDiv).toHaveTextContent('Link: url');
    expect(likesDiv).toHaveTextContent('Likes: 5');
    expect(userDiv).toHaveTextContent('Poster: username');
  });

  test('If like button is pressed twice, two events are sent', () => {
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

    const handleLike = jest.fn();

    const component = render(<Blog blog={blog} handleLike={handleLike} />);

    // We need to first toggle the info button so we can 'see' the like button
    const toggleInfo = component.container.querySelector('#toggleInfo');
    fireEvent.click(toggleInfo);

    const button = component.container.querySelector('#likeButton');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
