import React from 'React';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import LoginPage from '../client/components/LoginPage';

describe('Upcoming coaching sessions', () => {
  let loginPage;
  beforeEach(() => {
    jest.clearAllMocks();
    loginPage = render(<LoginPage />, {
      wrapper: BrowserRouter
    });
  });

  it('should render username/email input', () => {
    expect(loginPage.getByText(/Sign in with Google/i)).toBeInTheDocument();
  });

  //   it('should render empty username/email input text', () => {
  //     const userNameInputEl = loginPage.getByPlaceholderText(/email@email.com/i);
  //     expect(userNameInputEl.value).toBe('');
  //   });

  //   it('should render username input values', async () => {
  //     const userNameInputEl = loginPage.getByPlaceholderText(/email@email.com/i);
  //     const testEmail = 'test@gmail.com';
  //     await userEvent.type(userNameInputEl, testEmail);
  //     expect(userNameInputEl.value).toBe(testEmail);
  //   });

  //   it('should render password input', () => {
  //     expect(loginPage.getByPlaceholderText(/\*\*\*\*\*\*\*\*/i)).toBeInTheDocument();
  //   });
});
