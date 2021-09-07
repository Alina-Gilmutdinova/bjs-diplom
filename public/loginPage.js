//Для работы с формой регистрации и авторизации используется класс UserForm. Для работы с сервером используется класс ApiConnector

"use strict";

let userForm = new UserForm(); 


userForm.loginFormCallback = (data) => { //функция, которая будет выполняться при попытке авторизации
    ApiConnector.login(data, (response)=>{
        if (response.success === true) {
            location.reload();
        }
        else {
            userForm.setLoginErrorMessage(`Ошибка: ${response.error}`); //вывод ошибки если неверно введено
        }
    });
};

userForm.registerFormCallback = (data) => { //функция, которая будет выполняться при попытке регистрации
    ApiConnector.register(data, (response) => { //объект, который содержит логин и пароль
       if (response.success === true) {
           userForm.id = response.id;
           location.reload();
       }
       else {
           userForm.setRegisterErrorMessage(`Произошла ошибка регистрации пользователя ${data.login}: ${response.error}`);
       }
    });
}
