const TogoDictionary = [
    { tipo: "Palabra reservada", nombre: "fn", regex: /^fn\b/ },
    { tipo: "Palabra reservada", nombre: "str", regex: /^str\b/ },
    { tipo : "Palabra reservada", nombre: "void", regex: /^void\b/ },
    { tipo : "Palabra reservada", nombre: "bool", regex: /^bool\b/ },
    { tipo : "Palabra reservada", nombre: "num", regex: /^num\b/ },
    { tipo : "Palabra reservada", nombre: "if", regex: /^if\b/ },
    { tipo : "Palabra reservada", nombre: "for", regex: /^for\b/ },
    { tipo: "Variable", nombre: "Cadena de Caracteres", regex: /^"([^"]*)"/ },
    { tipo: "Variables", nombre: "Booleano", regex: /^(true|false)\b/ },
    { tipo: "Variable", nombre: "Números", regex: /^\d+(\.\d+)?/ },
    { tipo: "Variables", nombre: "Variable", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
    { tipo: "Simbolo", nombre: "Paréntesis Apertura", regex: /^\(/ },
    { tipo: "Simbolo", nombre: "Paréntesis Cierre", regex: /^\)/ },
    { tipo: "Simbolo", nombre: "Llaves Apertura", regex: /^\{/ },
    { tipo: "Simbolo", nombre: "Llaves Cierre", regex: /^\}/ },
    { tipo: "Simbolos", nombre: "Dos puntos", regex: /^:/ },
    { tipo: "Simbolos", nombre: "Coma", regex: /^,/ },
    { tipo: "Simbolos", nombre: "Punto y coma", regex: /^;/ },
    { tipo: "Símbolos", nombre: "Triple igual", regex: /^\=\=\=/ },
    { tipo: "Símbolos", nombre: "Doble igual", regex: /^\=\=/ },
    { tipo: "Símbolos", nombre: "Igual", regex: /^=/ },
    { tipo: "Símbolos", nombre: "Doble distinto de", regex: /^\!\=\=/ },
    { tipo: "Símbolos", nombre: "Distinto de", regex: /^\!\=/ },
    { tipo: "Símbolos", nombre: "Menor igual", regex: /^\<\=/ },
    { tipo: "Símbolos", nombre: "Mayor igual", regex: /^\>\=/ },
    { tipo: "Operador", nombre: "Menor que", regex: /^</ },
    { tipo: "Símbolos", nombre: "Mayor que", regex: /^>/ },
    { tipo: "Operador", nombre: "Incremento", regex: /^\+\+/ },
    { tipo: "Operador", nombre: "Decremento", regex: /^--/ },
]


class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
        this.dictionary = TogoDictionary;
    }

    nextToken() {
        this.skipWhitespace();
        if (this.pos >= this.input.length) {
            return null;
        }

        for (const { tipo, nombre, regex } of this.dictionary) {
            const match = this.input.substr(this.pos).match(regex);

            if (match && match.index === 0) {
                this.pos += match[0].length;
                return { type: tipo, value: match[0], nombre: nombre };
            }
        }

        let char = this.input[this.pos];


        if (/[a-zA-Z0-9_]/.test(char)) {
            let word = '';
            while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(char)) {
                word += char;
                this.pos++;
                char = this.input[this.pos];
            }
            return { type: 'Identificador', value: word };
        }

        this.pos++;
        return { type: 'UNKNOWN', value: char };
    }

    skipWhitespace() {
        while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
            this.pos++;
        }
    }
}


const validateBtn = document.getElementById('analysisBtn');
    validateBtn.addEventListener('click', ()=> {
    code = document.getElementById('code').value;    
    const lexer = new Lexer(code);
    let token;
    let output = document.getElementById('output');
    output.innerHTML = ''; 
    while (token = lexer.nextToken()) {
        output.innerHTML += `
        <tr">  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> ${token.type}:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${token.value}</td>
        </tr>`; 
    }
});


const cleanBtn = document.getElementById('cleanBtn');
    cleanBtn.addEventListener('click', ()=>{
        let output = document.getElementById('output');
        let code = document.getElementById('code');
        output.innerHTML = ''; 
        code.innerHTML = ''; 
})

const exampleBtn = document.getElementById('exampleBtn');
var examples = [
    'fn setPassowrd(str pwd): void{}',
    'if 12 == age {}',
    'if algo != algo {}',
    'for(i = 0, 1 < 5, i ++){}',
    'str name: "pepe";',
    'num age: 30;',
    'bool married: true;'
];
    exampleBtn.addEventListener('click', ()=>{
        let code = document.getElementById('code');
        var randomExample = examples[Math.floor(Math.random() * examples.length)];
        code.innerHTML = randomExample; 
    })  