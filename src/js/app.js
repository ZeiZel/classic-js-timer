class App {
	timer = {
		min_tens: document.querySelector('#min_tens'),
		min: document.querySelector('#min'),
		sec_tens: document.querySelector('#sec_tens'),
		sec: document.querySelector('#sec'),
	};
	#interval;

	submit(event) {
		event.preventDefault();
		// получаем данные с формы
		const formData = new FormData(event.target);
		// получаем данные из инпута с name="time"
		const time = formData.get('time');
		this.#clearTimer(); // очищаем прошлый таймер
		this.#startTimer(time); // активируем таймер
	}

	// приватный метод таймера
	#startTimer(time) {
		// получаем время окончания в мс
		const end = Date.now() + time * 60 * 1000;

		this.#interval = setInterval(() => {
			const now = Date.now();
			const delta = end - now;

			if (delta < 0) {
				clearInterval(this.#interval);
				return;
			}

			this.#setTimer({
				min_tens: Math.floor(delta / 1000 / 60 / 10),
				min: Math.floor((delta / 1000 / 60) % 10),
				sec_tens: Math.floor((delta % (60 * 1000)) / 10000),
				sec: Math.floor(((delta % (60 * 1000)) / 1000) % 10),
			});
		}, 500);
	}

	#clearTimer() {
		if (this.#interval) {
			clearInterval(this.#interval);
		}

		this.#setTimer({
			min_tens: 0,
			min: 0,
			sec_tens: 0,
			sec: 0,
		});
	}

	#setTimer({ min_tens, min, sec_tens, sec }) {
		this.timer.min_tens.innerText = min_tens;
		this.timer.min.innerText = min;
		this.timer.sec_tens.innerText = sec_tens;
		this.timer.sec.innerText = sec;
	}
}

const app = new App();
