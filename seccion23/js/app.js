//Constructor
function Seguro(marca, year, tipo) {
	this.marcas, this.year, this.tipo;
}

//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
	let cantidad;
	const base = 2000;

	switch (this.marca) {
		case '1':
			cantidad = base * 1.15;
			break;
		case '2':
			cantidad = base * 1.05;
			break;
		case '3':
			cantidad = base * 1.35;
			break;

		default:
			break;
	}
};

function UI() {}

//Llenar las opciones de los años
UI.prototype.llenarOpciones = () => {
	const max = new Date().getFullYear();
	const min = max - 20;

	const selectYear = document.querySelector('#year');
	for (let i = max; i > min; i--) {
		let option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		selectYear.appendChild(option);
	}
};

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
	const div = document.createElement('div');

	if (tipo === 'error') {
		div.classList.add('error');
	} else {
		div.classList.add('correcto');
	}

	div.classList.add('mensaje', 'mt-10');
	div.textContent = mensaje;
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.insertBefore(div, document.querySelector('#resultado'));

	setTimeout(() => {
		div.remove();
	}, 2000);
};

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.llenarOpciones(); //Llena el select con los años
});

eventListeners();
function eventListeners() {
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
	e.preventDefault();

	const marca = document.querySelector('#marca').value;
	const year = document.querySelector('#year').value;
	const tipo = document.querySelector('input[name="tipo"]:checked').value;

	if (marca === '' || year === '' || tipo === '') {
		ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
		return;
	}

	ui.mostrarMensaje('Cotizando...', 'correcto');
	const seguro = new Seguro(marca, year, tipo);
	seguro.cotizarSeguro();
}
