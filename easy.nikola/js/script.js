window.addEventListener("DOMContentLoaded", function() {

	let tab = document.getElementsByClassName("info-header-tab"),
		tabContent = document.getElementsByClassName("info-tabcontent"),
		info = document.getElementsByClassName("info-header")[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if (target.className == "info-header-tab") {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		}
	});

	let deadline = '2018-06-17';

	function getTimeRemaining (endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()) - 10800000,
			seconds = Math.floor( (t/1000) % 60 ),
			minutes = Math.floor( (t/1000/60) %60 ),
			hours = Math.floor( t/(1000*60*60) );

		return {
			"total": t,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds
		};
	};

	function setClock(id, endtime) {

		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');

		function updateClock() {
			let t = getTimeRemaining(endtime);
			if (t.hours < 10) t.hours = "0" + t.hours;
			if (t.minutes < 10) t.minutes = "0" + t.minutes;
			if (t.seconds < 10) t.seconds = "0" + t.seconds;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.innerHTML = '00';
				minutes.innerHTML = '00';
				seconds.innerHTML = '00';
			}
		};

		updateClock();
		var timeInterval = setInterval(updateClock, 1000);
	};

	setClock('timer', deadline);

	//Modal

let more = document.querySelector(".more"),
	overlay = document.querySelector(".overlay"),
	close = document.querySelector(".popup-close");

more.addEventListener("click", function() {
	more.classList.add("more-splash");
	overlay.style.display = "block";
	document.body.style.overflow = 'hidden';
});

close.addEventListener("click", function() {
	overlay.style.display = "none";
	more.classList.remove("more-splash");
	document.body.style.overflow = '';
});

//Modal for all more
let description_btn = document.querySelectorAll(".description-btn"),
	infoFull = document.querySelector(".info");

	infoFull.addEventListener('click', function (event) {
		let target = event.target;
		if (target.className == "description-btn") {
			for (let i = 0; i < description_btn.length; i++) {
				if (target == description_btn[i]) {
					overlay.style.display = "block";
					document.body.style.overflow = 'hidden';
					break;
				}
			}
		}
	});

	//Form
	let message = new Object();
	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с вами свяжемся";
	message.failure = "Что-то пошло не так...";

	let form = document.getElementsByClassName("main-form")[0],
		input = form.getElementsByTagName("input"),
		statusMessage = document.createElement("div");
	statusMessage.classList.add("status");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		form.appendChild(statusMessage);

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", "server.php");

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(form);

		request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState == 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
				}
				else {
					statusMessage.innerHTML = message.failure;
				}
			}
		}
		for(let i = 0; i < input.length; ++i) {
			input[i].value = "";
		}
	});

	//Home Work
	let formBack = document.getElementById("form"),
		inputBack = formBack.getElementsByTagName("input"),
		statusMessageBack = document.createElement("div");
	statusMessageBack.classList.add("status");

	formBack.addEventListener("submit", (event) => {
		event.preventDefault();
		formBack.appendChild(statusMessageBack);
		statusMessageBack.style.color = "white";
		statusMessageBack.style.paddingTop = 10 + "px";

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", "server.php");

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		let formData = new FormData(formBack);

		request.send(formData);

		request.onreadystatechange = function() {
			if (request.readyState < 4) {
				statusMessageBack.innerHTML = message.loading;
			} else if (request.readyState == 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessageBack.innerHTML = message.success;
				}
				else {
					statusMessageBack.innerHTML = message.failure;
				}
			}
		}
		for(let i = 0; i < input.length; ++i) {
			input[i].value = "";
		}
	});

});