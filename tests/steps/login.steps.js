import { Given, When, Then } from "@cucumber/cucumber"; 
import { expect } from '@playwright/test';
import '../hooks/hooks.js';


    Given('je navigue vers la page {string}', async function (url) {
        await this.page.goto(url);
        
    });

    When('J\'entre l\'email {string}',async function (email) {

        if(email){
            await this.page.getByTestId('login-email').fill(email);
        }
        
    });

    When('J\'entre le mot de passe {string}',async function (password) {
        if(password){
            await this.page.getByTestId('login-password').fill(password);
        }
        
    });


    When('Je clique sur le bouton Login',async function () {
        await this.page.getByTestId('login-submit').click()
    });


    Then('Verifier la présence du mot {string}',async function (message) {

        await expect(this.page.getByTestId('home')).toContainText(message);
    });

    Then('Verifier la présence du message {string}',async function (expectMessage) {

        // Diviser les messages attendus s'il y en a plusieurs (séparés par des virgules)
        const expectMessageArray = expectMessage.split(',').map(msg => msg.trim());

        // Vérifier chaque message attendu
        for(const expectMessage of expectMessageArray) {
            if(expectMessage == "Password is required"){
                await expect(this.page.getByText('Password is required')).toBeVisible();
                //console.log(this.page.getByText('Password is required'));
            } else if(expectMessage == "Email address is required") {
                await expect(this.page.getByText('Email address is required')).toBeVisible();
            } else {

                //const alertMessage = await this.page.getByTestId('alert-message').textContent();
                //expect(alertMessage).toContain(expectMessage);
                await expect(this.page.getByTestId('alert-message')).toContainText(expectMessage);

            }
        }
           
    });
