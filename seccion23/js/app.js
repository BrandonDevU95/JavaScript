//Constructores
function Seguro(marca, year, tipo) {
	(this.marca = marca), (this.year = year), (this.tipo = tipo);
}
function UI() {}

const ui = new UI();

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

	// Diferencia entre el año actual y el año del coche
	const diff = new Date().getFullYear() - this.year;

	//Pos cada año de diferencia se reduce un 3% en el costo

	cantidad -= (diff * 3 * cantidad) / 100;

	//Un seguro basico se multiplica por un 30% mas
	//Un seguro completo se multiplica por un 50% mas

	if (this.tipo === 'basico') {
		cantidad *= 1.3;
	} else {
		cantidad *= 1.5;
	}

	return cantidad;
};

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

UI.prototype.mostrarResultado = (seguro, total) => {
	const div = document.createElement('div');
	const { marca, year, tipo } = seguro;
	let textoMarca = '';
	switch (marca) {
		case '1':
			textoMarca = 'Americano';
			break;
		case '2':
			textoMarca = 'Asiatico';
			break;
		case '3':
			textoMarca = 'Europeo';
			break;
	}

	div.classList.add('mt-10');
	div.innerHTML = `
		  <p class='header'>Tu Resumen: </p>
          <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span> </p>
          <p class="font-bold">Año: <span class="font-normal"> ${year} </span> </p>
          <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span> </p>
          <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
	`;

	const resultadoDiv = document.querySelector('#resultado');

	//mostrar spin
	const spinner = document.querySelector('#cargando');
	spinner.style.display = 'block';

	setTimeout(() => {
		spinner.style.display = 'none';
		resultadoDiv.appendChild(div);
	}, 2000);
};

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

	const resultados = document.querySelector('#resultado div');
	if (resultados != null) resultados.remove();

	const seguro = new Seguro(marca, year, tipo);
	const total = seguro.cotizarSeguro();

	ui.mostrarResultado(seguro, total);
}

function eventListeners() {
	const formulario = document.querySelector('#cotizar-seguro');
	formulario.addEventListener('submit', cotizarSeguro);
}

document.addEventListener('DOMContentLoaded', () => {
	ui.llenarOpciones(); //Llena el select con los años
});

eventListeners();
