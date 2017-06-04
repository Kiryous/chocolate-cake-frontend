var popupModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		popups : ['order', 'call', 'register-seminar', 'action', 'question', 'order-get', 'partners', 'consult', 'buy', 'plans'],
		successPopupClass : '.popup--js-success',
		errorPopupClass : '.popup--js-error',
		popupTextClass : '.popup__text'
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		_popupsBindClose();
		_popupsBindOpen();
	};

	var _showPopup = function (popup) {
		// Если открыт другой попап, то сначала его прячем,
		// а потом показываем этот, чтобы не было багов
		if (_hidePopup()) {
			if (!popup) {
				return false
			};

			var overlay = document.querySelector('.overlay');

			popup.classList.add('popup--active');
			if (overlay) overlay.classList.add('overlay--active');

			return true;
		};
	};

	// returns true
	// if no popup searches for active and closes it
	var _hidePopup = function (popup) {
		if (!popup) {
			popup = document.querySelector('.popup--active');
		}

		var overlay = document.querySelector('.overlay');

		if (popup) popup.classList.remove('popup--active');
		if (overlay) overlay.classList.remove('overlay--active');

		return true;
	};

	var _popupsBindClose = function () {
		var popups = document.querySelectorAll('.popup'),
				overlay = document.querySelector('.overlay');

		// Событие скрытия попапов при нажатии на кнопку .js--close-popup
		if (popups) {
			Array.prototype.forEach.call(popups, function(popup, index) {
				var hideBtns = popup.querySelectorAll('.js--close-popup');

				Array.prototype.forEach.call(hideBtns, function(hideBtn, index) {
					hideBtn.addEventListener('click', function(e) {
						e.preventDefault();
						_hidePopup(popup);
					});
				});
			});
		};


		// Событие скрытия попапов при нажатии на overlay
		if (overlay) {
			overlay.addEventListener('click', function(e) {
				e.preventDefault();
				_hidePopup();
			});
		};
	};

	var _bindPopup = function (mod) {
		var btns = document.querySelectorAll('.js--show-' + mod +'-popup'),
				popup = document.querySelector('.popup--js-' + mod);

		Array.prototype.forEach.call(btns, function(btn, index) {
			btn.addEventListener('click', function(e) {
				e.preventDefault();

				_showPopup(popup);
			});
		});
	};

	var _popupsBindOpen = function () {

		for (var number in _vars.popups) {
			if (document.querySelector('.popup--js-' + _vars.popups[number])) {
				_bindPopup(_vars.popups[number]);
			};
		};
	};

	var showError = function (text) {
		var errPopup = document.querySelector(_vars.errorPopupClass),
		    errPopupText = errPopup.querySelector(_vars.popupTextClass);

		if (!text) text = "Что-то пошло не так. Попробуйте снова!";

		errPopupText.innerText = text;

		return _showPopup(errPopup);
	};

	var showSuccess = function (text) {
		var succPopup = document.querySelector(_vars.successPopupClass),
		    succPopupText = succPopup.querySelector(_vars.popupTextClass);

		if (!text) text = "Всё получилось!";

		succPopupText.innerText = text;

		return _showPopup(succPopup);
	};

	return {
		init: init,
		showError: showError,
		showSuccess: showSuccess
	};

})();

var formsModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _vars = {
		formsClass : '.js--form',
		inputClass : 'input',
		msgClass : 'textarea',
		inputNames : ['tel', 'email']
	};

	var TODO = {
		_formsListener : ['Замена текста на кнопке и её блокировка, пока не получен ответ от сервера', 'Использование массива для обхода полей без явного указания их названий']
	};

	var _setUpListeners = function () {
		_formsListener();
	};

	var _defaultRun = function () {
	};

	var _formsListener = function () {
		var forms = document.querySelectorAll(_vars.formsClass);

		Array.prototype.forEach.call(forms, function(form, index) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				var inputs = form.querySelectorAll(_vars.inputClass),
						method = form.method,
						action = form.action,
						succMsg = form.dataset.msg,
						tel = false,
						email = false,
						msg = form.querySelector(_vars.msgClass) || false,
						json;

				if (!method || !action) {
					console.error('Ошибка в formsModule._formsBindSubmit: у формы ' + form + ' наличие method: ' + method + ' наличие action: ' + action);
					return false;
				};

				Array.prototype.forEach.call(inputs, function(input, index) {

					if (input.name === 'tel') {
						tel = input.value;
					};

					if (input.name === 'email') {
						email = input.value;
					};
				});

				if (msg) msg = msg.value;

				if (!tel && !email) {
					console.error('Ошибка в formsModule._formsBindSubmit: у формы ' + form + ' не заполнены контактные данные.');
					popupModule.showError('Пожалуйста, введите ваши контактные данные!');
					return false;
				};

				if (!tel) tel = 'Не заполнено';
				if (!email) email = 'Не заполнено';
				if (!msg) msg = 'Не заполнено';

				json = {
					tel: tel,
					email: email,
					msg: msg
				};

				_sendAction(json, method, action, succMsg);

				return true;
			});
		});
	};

	var _sendAction = function (json, method, action, succMsg) {
		var xhr = new XMLHttpRequest();

		xhr.open(method, action);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify(json));

		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) {
				console.error('Ошибка в formsModule._sendAction: статус xhr запроса не 4.');
			};

			if (xhr.status != 200) {
				console.error('Ошибка в formsModule._sendAction: ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
				popupModule.showError('Что-то пошло не так. Пока мы решаем проблему, позвоните нам!');
				return false;
			}

			else {
				console.info('Ответ сервера в formsModule._sendAction: ' + xhr.responseText);
				popupModule.showSuccess(succMsg);
				return true;
			};
		};
	};

	return {
		init: init
	};

})();

popupModule.init();
formsModule.init();
