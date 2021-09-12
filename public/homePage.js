
//Создайте объект класса LogoutButton. В свойство action запишите функцию, которая будет вызывать запрос деавторизации (logout). 
//В колбек запроса добавьте проверку: если запрос выполнился успешно, то обновите страницу (с помощью location.reload();).
let logoutButton = new LogoutButton;

logoutButton.action = () => {
	ApiConnector.logout((response) => { //деавторизация
		if (response.success) { //запрос прошел успешно, обновить
			location.reload();
		} else {
			console.error(`${response.error}`); //вывод ошибки
		}
	})
}

//получение текущего пользователя 
let current = ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data); //вывод пользователя
	} else {
		console.error("Ошибка вывода профиля"); //вывод ошибки если запрос не удался
	}
});

//Получение текущих курсов валюты
let rateBoard = new RateBoard; //создание объекта типа RatesBoard
function getCurrencyRate() { // запрос получения курсов валют
	ApiConnector.getStocks((response) => {
		if (response.success) {
			rateBoard.clearTable(); //очищение таблиц
			rateBoard.fillTable(response.data); //заполнение данными 
		} else {
			console.error("Ошибка получения курсов валют"); //вывод ошибки
		}
	});
}

getCurrencyRate();
setInterval(getCurrencyRate, 60000); //выволнение функции раз в минуту

//Операции с деньгами
let moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = ((data) => { //функция выполняющая запрос,пополнение баланса
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data); //новые данные о пользователе из данных ответа от сервера 
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, "Произошла ошибка ${response.error}");
		}
	})
})

//конвертирование валюты
MoneyManager.conversionMoneyCallback = ((data) => {
   ApiConnector.convertMoney(data, (response) => //запрос на пополнение баланса 
   if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, message);
   } else {
      moneyManager.setMessage(false, "Произошла ошибка ${response.error}");
   }
})
})
//перевод валюты
moneyManager.sendMoneyCallback = ((data) => {
	ApiConnector.transferMoney(data, (response) => { //запрос на пополнение баланса
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, message);
		} else {
			moneyManager.setMessage(false, "Произошла ошибка ${response.error}");
		}
	})
})
 //избранное
 let favoritesWidget = new FavoritesWidget;
 ApiConnector.getFavorites = ((response) = > {
 if (response.success) {
    favoritesWidget.clearTable();//очистите текущий список избранного
    favoritesWidget.fillTable(response.data);//Отрисуйте полученные данные
    moneyManager.updateUsersList(response.data);//список для перевода денег 
 }
});

//добавления пользователя в список избранных

