
const input_el = document.getElementById("prompt");
const output_el = document.getElementById("output");
const terminal_el = document.getElementById("terminal");

var state = {
	x: 0,
	y: 1,
	pi: Math.PI
}

let user = 'esst'

function message(text, colorText) {
	// Create the box that will hold our message.
	var p = document.createElement('p');

	// if no color then set it to white.
	if (!colorText) colorText = 'green';
	p.style.color = colorText

	// Assign text of the new message element.
	p.innerText = text;

	// Push this box to the output element.
	output_el?.appendChild(p);

	// Scroll down to see the last output we just wrote.
	output_el.scrollTo({
		top: output_el.scrollHeight
	})
}

function handle_keypress(event) {

	if (event.key == 'Enter') {
		var text = input_el.value;

		if (text.length === 0)
			return;

		// To remove any sort of confusion we write the command, with the user's name before.
		message(user + "#~: " + text, 'white');

		// we don't need the input anymore...
		input_el.value = ''

		var words = text.split(' ');
		var command = words.shift();
		var arguments = words;

		// Handle = Manage (little definition to give).
		switch (command) {
			case "echo":
				// Call the handleEcho 'procedure'
				return handleEcho(command, arguments)

			// NEW FUNCTIONS:
			case "open":
				return handleOpen(command, arguments);

			case "display":
				return handleDisplay(command, arguments);

			case "color":
				// I don't want to write many functions, let's keep this
				// here so that they won't feel like each thing requires
				// a function.

				if (arguments.length < 1) {
					return message('Please provide a color.')
				}

				else {
					let color = arguments[0];
					document.body.style.backgroundColor = color;
					message(`Changed color to ${color}.`);
				}

				break;

			// implement some nice algorithmic challenges:
			case "printnum":
				if (arguments.length < 1) {
					return message('Please provide N.')
				}

				else {
					// TODO: explain what parseInt does.
					let n = parseInt(arguments[0]);

					for (var i = 0; i < n; i++) {
						message(i + 1);
					}

					message('Finished.')
				}

				break;

			case "triangle":
				if (arguments.length < 1) {
					return message('Please provide a size.')
				}

				else {
					// TODO: explain what parseInt does.
					let n = parseInt(arguments[0]);

					for (var i = 0; i <= n; i++) {
						var result = ''

						for (var j = 0; j < i; j++) {
							result = result + "*"
						}

						message(result)
					}

					message('Finished.')
				}

				break;

			case "cos":
				if (arguments.length < 1) {
					return message('Please provide X.')
				}

				else {
					// TODO: explain what parseInt does.
					let x = parseInt(arguments[0]);

					// Math is a record of functions...
					message(`Result: ${Math.cos(x)}`)
				}

				break;

			case "rename":
				return handleRename(command, arguments);

			case "stock":
				return handleAssignment(command, arguments);

			case "show":
				return handleShow(command, arguments);

			// END NEW FUNCTIONS.
			case "clear":
				return handleClear(command, arguments);

			// Explain that we can handle multiple cases
			// with one Action.
			case "add":
			case "sub":
			case "mul":
			case "div":
				return handleBinary(command, arguments);

			default:
				message(`${command}: command not found`, "red")
				break;
		}

	}
}

function handleEcho(command, arguments) {
	// print the arguments
	message(arguments.join(' '));
}

function handleRename(command, arguments) {

	if (arguments.length < 1)
		return message('Error: Please provide a name.', 'orange');

	let newName = arguments[0];

	let oldName = user
	user = newName

	message(`Renamed ${oldName} to ${newName}`);
}

function handleOpen(command, arguments) {

	if (arguments.length < 1)
		return message('You have provided no link!', "red");

	let link = arguments[0];
	message(`Opening ${link}...`);

	open(link);
}

function handleClear(command, arguments) {
	// remove all paragraphs inside the output
	output_el.innerHTML = ''

	message('Console is cleared.')
}

function handleDisplay(command, arguments) {
	// print the arguments
	alert(arguments.join(' '));
}

function handleBinary(command, arguments) {

	var first = parseFloat(arguments[0]);
	var second = parseFloat(arguments[1]);

	var result;
	switch (command) {
		case "add":
			result = first + second;
			message(`Result: ${result}`);
			break;

		case "sub":
			result = first - second;
			message(`Result: ${result}`);
			break;

		case "mul":
			result = first * second;
			message(`Result: ${result}`);
			break;

		case "div":
			result = first / second;
			message(`Result: ${result}`);
			break;
	}
}

function handleAssignment(command, arguments) {

	if (arguments.length > 2) {
		return message('You entered too many arguments', "red");
	}

	var variable = arguments[0];
	var value = arguments[1];
	state[variable] = value;

	message(`${value} has been assigned to ${variable}.`);
}

function handleShow(command, arguments) {

	if (arguments.length < 1) {
		return message('Please provide a variable name');
	}

	var variable = arguments[0];

	// get the value from the variable.
	var value = state[variable];

	message(`${variable} is equal to ${value}.`);
}

input_el?.addEventListener('keypress', handle_keypress);
