const {I} = inject();
// Add in your custom step files

// [key: string]: string
const pageMap: Record<string, string> = {
    'регистрации': '/register',
    'логина': '/login',
    'создание товара': '/admin/products/new',
};

Given('я нахожусь на странице {string}', (page: string) => {
    I.amOnPage(pageMap[page]);
});


When('я залогинен как {string}', (email: string) => {
    I.amOnPage(pageMap['логина']);
    I.fillField('Email', email);
    I.fillField('Password', '123');
    I.click(`//button[contains(., 'Sign In')]`);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
    I.fillField(name, value);
});

When('нажимаю на кнопу {string}', (btnText: string) => {
    I.click(`//button[contains(., '${btnText}')]`);
});

Then('я вижу сообщение {string}', (message: string) => {
   I.see(message);
});

Then('я жду {int} секунд', (seconds: number) => {
    I.wait(seconds);
});
