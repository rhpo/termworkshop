
const input_el = document.getElementById("prompt");
const output_el = document.getElementById("output");

var state = {
    x: 0,
    y: 1,
    pi: Math.PI
}

function message(text, isError) {
    var p = document.createElement('p');
    p.innerText = text + '.';

    if (isError) {
        p.style.color = 'red'
    }

    output_el?.appendChild(p);

    output_el.scrollTo({
        top: output_el.scrollHeight
    })
}

function handle_keyup(event) {
    if (event.key === 'Enter') {
        var text = input_el.value;
        var words = text.split(' ');

        var command = words.shift();
        var arguments = words;

        input_el.value = '' // we don't need the input anymore...

        switch (command) {
            case "echo":
                return handleEcho(command, arguments)

            case "assign":
                return handleAssignment(command, arguments);

            case "add":
            case "sub":
            case "mul":
            case "div":
                return handleBinary(command, arguments);

            case "display":
                return handleDisplay(command, arguments)

            default:
                message('command not found', true)
                break;
        }

    }
}

function handleEcho(command, arguments) {
    // print the arguments
    message(arguments.join(' '));
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
            message(`= ${result}`);
            break;

        case "sub":
            result = first - second;
            message(`= ${result}`);
            break;

        case "mul":
            result = first * second;
            message(`= ${result}`);
            break;

        case "div":
            result = first / second;
            message(`= ${result}`);
            break;
    }
}

function isIdentifier(t) {
    return /a-z/.test(t);
}

function handleAssignment(command, arguments) {

    if (arguments.length > 2) {
        return message('You entered too many arguments', true);
    }

    var variable = arguments[0];
    var value = arguments[1];
    state[variable] = value;

    message(`${variable} = ${value}`);
}

input_el?.addEventListener('keyup', handle_keyup);