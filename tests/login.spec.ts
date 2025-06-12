import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { SecureAreaPage } from '../src/pages/SecureAreaPage';
import * as fs from 'fs';
import * as path from 'path';

const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../data/loginUsers.json'), 'utf-8')
);

const validUser = users.find((u: any) => u.type === 'valid');
const invalidUsernameUser = users.find((u: any) => u.type === 'invalidUsername');
const invalidPasswordUser = users.find((u: any) => u.type === 'invalidPassword');
const emptyFieldsUser = users.find((u: any) => u.type === 'emptyFields');
const onlyUsernameUser = users.find((u: any) => u.type === 'onlyUsername');
const onlyPasswordUser = users.find((u: any) => u.type === 'onlyPassword');

test.describe('Login Scenarios', () => {
    test('TS_Login_Positive_ValidCredentials', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(validUser.username, validUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('You logged into a secure area!');

        // Validate landed on home/secure area page
        const secureAreaPage = new SecureAreaPage(page);
        const headerText = await secureAreaPage.getHeaderText();
        expect(headerText?.trim()).toBe('Secure Area');
        expect(page.url()).toContain('/secure');
    });

    test('TS_Login_Negative_InvalidUsername', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(invalidUsernameUser.username, invalidUsernameUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('Your username is invalid!');
        // Validate not landed on secure area
        expect(page.url()).not.toContain('/secure');
    });

    test('TS_Login_Negative_InvalidPassword', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(invalidPasswordUser.username, invalidPasswordUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('Your password is invalid!');
        expect(page.url()).not.toContain('/secure');
    });

    test('TS_Login_Negative_EmptyFields', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(emptyFieldsUser.username, emptyFieldsUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('Your username is invalid!');
    });

    test('TS_Login_Negative_OnlyUsername', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(onlyUsernameUser.username, onlyUsernameUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('Your password is invalid!');
    });

    test('TS_Login_Negative_OnlyPassword', async ({ page, baseURL }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(baseURL!);
        await loginPage.login(onlyPasswordUser.username, onlyPasswordUser.password);
        const flash = await loginPage.getFlashMessage();
        console.log('Flash message:', flash);
        expect(flash).toContain('Your username is invalid!');
    });
}); 