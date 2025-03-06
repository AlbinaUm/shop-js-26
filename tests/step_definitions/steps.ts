const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице регистрации', () => {
    I.amOnPage('/register');
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('нажимаю на кнопу {string}', () => {
    I.click(`//button[contains(., 'Sign Up')]`);
});

Then('я вижу сообщение {string}', (message: string) => {
   I.see(message);
});
