import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

// Run ALL tests: CI=true npm test
// Run only the tests in this file: CI=true npm test -- NewBlogForm.test.js
// Run a specific test: CI=true npm test -- -t 'Right details are sent'

describe('<NewBlogForm/> tests', () => {
  test('Right details are sent when the create button is pressed', () => {
    const createBlog = jest.fn();

    const component = render(<NewBlogForm createBlog={createBlog} />);

    // // We need to first toggle the showForm button so we can 'see' the form
    const showForm = component.container.querySelector('#showForm');
    fireEvent.click(showForm);

    const titleInput = component.container.querySelector('#titleInput');
    const authorInput = component.container.querySelector('#authorInput');
    const urlInput = component.container.querySelector('#urlInput');
    const newBlogForm = component.container.querySelector('#newBlogForm');

    fireEvent.change(titleInput, {
      target: { value: 'title' },
    });
    fireEvent.change(authorInput, {
      target: { value: 'author' },
    });
    fireEvent.change(urlInput, {
      target: { value: 'url' },
    });
    fireEvent.submit(newBlogForm);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toStrictEqual({
      title: 'title',
      author: 'author',
      url: 'url',
    });
  });
});
