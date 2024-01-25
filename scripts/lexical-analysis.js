const TogoDictionary = [
    { tipo: "Palabra reservada", regex: /^fn\b/ },
    { tipo: "Palabra reservada", regex: /^str\b/ },
    { tipo: "Palabra reservada", regex: /^void\b/ },
    { tipo: "Palabra reservada", regex: /^bool\b/ },
    { tipo: "Palabra reservada", regex: /^num\b/ },
    { tipo: "Palabra reservada", regex: /^if\b/ },
    { tipo: "Palabra reservada", regex: /^for\b/ },
    { tipo: "Palabra reservada", regex: /^(true|false)\b/ },
    { tipo: "Identificador", regex: /^"([^"]*)"/ },
    { tipo: "Identificador", regex: /^\d+(\.\d+)?/ },
    { tipo: "Identificador", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
    { tipo: "Operador", regex: /^\+\+/ },
    { tipo: "Operador", regex: /^--/ },
    { tipo: "Paréntesis", regex: /^\(/ },
    { tipo: "Paréntesis", regex: /^\)/ },
    { tipo: "Llaves", regex: /^\{/ },
    { tipo: "Llaves", regex: /^\}/ },
    { tipo: "Simbolos", regex: /^:/ },
    { tipo: "Simbolos", regex: /^,/ },
    { tipo: "Simbolos", regex: /^;/ },
    { tipo: "Simbolos", regex: /^\=\=\=/ },
    { tipo: "Simbolos", regex: /^\=\=/ },
    { tipo: "Simbolos", regex: /^=/ },
    { tipo: "Simbolos", regex: /^\!\=\=/ },
    { tipo: "Simbolos", regex: /^\!\=/ },
    { tipo: "Simbolos", regex: /^\<\=/ },
    { tipo: "Simbolos", regex: /^\>\=/ },
    { tipo: "Simbolos", regex: /^</ },
    { tipo: "Simbolos", regex: /^>/ },
]

let palabrasReservadasList = []
let identificadoresList = []
let operadorList = []
let parentesisList = []
let llavesList = []
let simbolosList = []
let unknownList = []

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

        for (const { tipo, regex } of this.dictionary) {
            const match = this.input.substr(this.pos).match(regex);
            if (match && match.index === 0) {
                const value = match[0];
                this.addToTokenList(tipo, value);
                this.pos += value.length;
                return { type: tipo, value };
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
            this.addToTokenList('Identificador', word);
            return { type: 'Identificador', value: word };
        }

        this.pos++;
        this.addToTokenList('UNKNOWN', char);
        return { type: 'UNKNOWN', value: char };
    }

    skipWhitespace() {
        while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
            this.pos++;
        }
    }

    addToTokenList(tipo, value) {
        switch (tipo) {
            case 'Palabra reservada':
                palabrasReservadasList.push(value);
                break;
            case 'Identificador':
                identificadoresList.push(value);
                break;
            case 'Operador':
                operadorList.push(value);
                break;
            case 'Paréntesis':
                parentesisList.push(value);
                break;
            case 'Llaves':
                llavesList.push(value);
                break;
            case 'Simbolos':
                simbolosList.push(value);
                break;
            case 'UNKNOWN':
                unknownList.push(value);
        }
    }
}


const validateBtn = document.getElementById('analysisBtn');
validateBtn.addEventListener('click', () => {
    palabrasReservadasList = [];
    identificadoresList = [];
    operadorList = [];
    parentesisList = [];
    llavesList = [];
    simbolosList = [];
    unknownList = [];
    editor = document.getElementById('editor').value;
    const lexer = new Lexer(editor);
    let token;
    let output = document.getElementById('output');
    output.innerHTML = '';
    while (token = lexer.nextToken()) { }
    output.innerHTML += `
    ${palabrasReservadasList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Palabras Reservadas:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(palabrasReservadasList).join(' , ')}</td>
        </tr>` : ''}
    ${identificadoresList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Identificadores:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(identificadoresList).join(' , ')}</td>
        </tr>` : ''}
    ${operadorList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Operadores:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(operadorList).join(' , ')}</td>
        </tr>` : ''}
    ${parentesisList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Paréntesis:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(parentesisList).join(' , ')}</td>
        </tr>` : ''}
    ${llavesList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Llaves:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(llavesList).join(' , ')}</td>
        </tr>` : ''}
    ${simbolosList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Símbolos:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(simbolosList).join(' , ')}</td>
        </tr>` : ''}
    ${unknownList.length > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Desconocidos:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(unknownList).join(' , ')}</td>
        </tr>` : ''}
    `;
});



const cleanBtn = document.getElementById('cleanBtn');
palabrasReservadasList = [];
identificadoresList = [];
operadorList = [];
parentesisList = [];
llavesList = [];
simbolosList = [];
unknownList = [];
cleanBtn.addEventListener('click', () => {
    let output = document.getElementById('output');
    output.innerHTML = '';

})


const exampleBtn = document.getElementById('exampleBtn');
let output = document.getElementById('output');
output.innerHTML = '';
exampleBtn.addEventListener('click', () => {
    var examples = [
        'fn setPassowrd(str pwd): void{}',
        'if 12 == age {}',
        'if algo != algo {}',
        'for(i = 0, 1 < 5, i ++){}',
        'str name: "pepe";',
        'num age: 30;',
        'bool married: true;',
        ""
    ];
    let editor = document.getElementById('editor');
    var randomExample = examples[Math.floor(Math.random() * examples.length)];
    editor.innerHTML = randomExample;
})  