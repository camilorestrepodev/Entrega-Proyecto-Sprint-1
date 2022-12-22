/* Almacenar un array de datos con: 
nombre, numero de documento, contraseña y tipo de usuario (1. administrador o 2. cliente)*/

const users = [
	{
		name: "Andres",
		id: 12025,
		typeUser: 1,
		pass: 123,
	},
	{
		name: "Angela",
		id: 12028,
		typeUser: 2,
		pass: 123456,
	},
];

// creamos una clase para el Billete

class Billete {
	constructor(d, c) {
		this.denominacion = d;
		this.saldo = c;
	}
}

// creamos variables para darle una función
let quantity = [];
let result = [];
let value = [];

let depositoCajero = 0;
let divCajero = 0;
let billetesCajero = 0;

// Array de almacenamiento de billetes
let billeteCinco = 0;
let billeteDiez = 0;
let billeteVeinte = 0;
let billeteCincuenta = 0;
let billeteCien = 0;

// Array de almacenamiento de carga de billetes
let cargaBilleteCinco = 0;
let cargaBilleteDiez = 0;
let cargaBilleteVeinte = 0;
let cargaBilleteCincuenta = 0;
let cargaBilleteCien = 0;

// creamos una función para iniciar el login
start();

function start() {
	// Creamos una variable para el numero de identificación
	let id = parseInt(prompt('Indique su número de identificación'));

	const user = users.find((userFound) => {

		if (userFound.id == id) {

			//Creamos una variable para la contraseña
			let pass = prompt('Introduzca su contraseña');

			if (userFound.pass == pass) {
				console.log('Ha iniciado sesión correctamente');

				// Menú del administrador

				if (userFound.typeUser == 1) {
					quantity = [];
					depositarBillete(quantity);
				}

				// Menú del cliente

				if (userFound.typeUser == 2) {
					if (quantity.length == 0) {

						start();

					} else {
						retirarDinero(quantity);
					}
				}

			} else {
				console.log("Contraseña incorrecta, intente nuevamente");
				start();
			}
		}

	});
	console.log("El usuario no existe, intente de nuevo por favor");
	start();
}

// Creamos una función para cargar dinero al cajero

function depositarBillete(quantity) {

	billeteCien = parseInt(prompt("Cantidad de billetes de 100"));
	cargaBilleteCien += billeteCien;
	quantity.push(new Billete(100, cargaBilleteCien));

	billeteCincuenta = parseInt(prompt("Cantidad de billetes de 50"));
	cargaBilleteCincuenta += billeteCincuenta;
	quantity.push(new Billete(50, cargaBilleteCincuenta));

	billeteVeinte = parseInt(prompt("Cantidad de billetes de 20"));
	cargaBilleteVeinte += billeteVeinte;
	quantity.push(new Billete(20, cargaBilleteVeinte));

	billeteDiez = parseInt(prompt("Cantidad de billetes de 10"));
	cargaBilleteDiez += billeteDiez;
	quantity.push(new Billete(10, cargaBilleteDiez));

	billeteCinco = parseInt(prompt("Cantidad de billetes de 5"));
	cargaBilleteCinco += billeteCinco;
	quantity.push(new Billete(5, billeteCinco));

	sumaPorDenominacion(quantity);
}

// Creamos una función que nos indica la cantidad de denominación de cada billete

function sumaPorDenominacion(quantity) {

	quantity.forEach((billete) => {

		let product = (billete.denominacion) * (billete.saldo);

		console.log(`Total en billetes de ${billete.denominacion} -> ${product} en cajero`)

		value += product;
	})

	console.log("Valor total  $" + value);

	value = 0;

	if (quantity.length > 0) {

		cargaBilleteCien = quantity[0].saldo;

		cargaBilleteCincuenta = quantity[1].saldo;

		cargaBilleteVeinte = quantity[2].saldo;

		cargaBilleteDiez = quantity[3].saldo;

		cargaBilleteCinco = quantity[4].saldo;
	}

	start();
}

// Creamos una función para retirar dinero del cajero

function retirarDinero(quantity) {

	depositoCajero = parseInt(prompt('Digite el valor que desea retirar: '));

	for (let billete of quantity) {

		if (depositoCajero > 0) {

			divCajero = Math.floor(depositoCajero / billete.denominacion);

			if (divCajero > billete.saldo) {

				billetesCajero = billete.saldo;

			} else {

				billetesCajero = divCajero;
			}
			result.push(new Billete(billete.denominacion, billetesCajero));

			depositoCajero = depositoCajero - (billete.denominacion * billetesCajero);
		}

	}

	if (depositoCajero > 0) {

		console.log('Cajero en mantenimiento, vuelva pronto.');

		result = [];

		start();
	}
	else {

		result.forEach((userCash) => {

			if (userCash.saldo > 0) {

				console.log(`${userCash.saldo}  billete(s) de $ ${userCash.denominacion} result(s)`);

				quantity.find((userRetire) => {

					if (userCash.denominacion == userRetire.denominacion) {

						userRetire.saldo -= userCash.saldo;
					}
				})
			}
		})

		result = [];

		sumaPorDenominacion(quantity);
	}
}
