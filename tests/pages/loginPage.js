// @ts-check
import { expect } from '@playwright/test';
import '../hooks/hooks.js';
 

export class LoginPage {

/**
   * @param {import('playwright').Page} page
   */

  constructor(page) {
    this.page = page;
    this.emailInput = this.page.getByTestId("login-email");
    this.passwordInput = this.page.getByTestId("login-password");
    this.loginButton = this.page.getByTestId("login-submit");
    this.alertMessage = this.page.getByTestId("alert-message");
  }
 
  async navigate(url) {
    await this.page.goto(url);
  }
 
  async enterEmail(email) {
    if (email) {
      await this.emailInput.fill(email);
    }
  }
 
  async enterPassword(password) {
    if (password) {
      await this.passwordInput.fill(password);
    }
  }
 
  async clickLogin() {
    await this.loginButton.click();
  }
 
  async verifyHomePage(message) {
    await expect(this.page.getByTestId('home')).toHaveText(message);
  }
 
  async verifyErrorMessages(expectedMessages) {
    const expectedMessagesArray = expectedMessages.split(',').map(msg => msg.trim());
    for (const expectedMessage of expectedMessagesArray) {
      if (expectedMessage === 'Password is required') {
        await expect(this.page.getByText('Password is required')).toBeVisible();
      } else if (expectedMessage === 'Email address is required') {
        await expect(this.page.getByText('Email address is required')).toBeVisible();
      } else {
        const alertMessage = await this.alertMessage.textContent();
        expect(alertMessage).toContain(expectedMessage);
      }
    }
  }
}
 