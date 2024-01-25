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

const palabrasReservadasList = new Set();
const identificadoresList = new Set();
const operadorList = new Set();
const parentesisList = new Set();
const llavesList = new Set();
const simbolosList = new Set();
const unknownList = new Set();

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
                palabrasReservadasList.add(value);
                break;
            case 'Identificador':
                identificadoresList.add(value);
                break;
            case 'Operador':
                operadorList.add(value);
                break;
            case 'Paréntesis':
                parentesisList.add(value);
                break;
            case 'Llaves':
                llavesList.add(value);
                break;
            case 'Simbolos':
                simbolosList.add(value);
                break;
            case 'UNKNOWN':
                unknownList.add(value);
        }
    }
}


const validateBtn = document.getElementById('analysisBtn');
validateBtn.addEventListener('click', () => {
    palabrasReservadasList.clear();
    identificadoresList.clear();
    operadorList.clear();
    parentesisList.clear();
    llavesList.clear();
    simbolosList.clear();
    editor = document.getElementById('editor').value;
    const lexer = new Lexer(editor);
    let token;
    let output = document.getElementById('output');
    output.innerHTML = '';
    while (token = lexer.nextToken()) { }
    output.innerHTML += `
    ${palabrasReservadasList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Palabras Reservadas:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(palabrasReservadasList).join(' , ')}</td>
        </tr>` : ''}
    ${identificadoresList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Identificadores:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(identificadoresList).join(' , ')}</td>
        </tr>` : ''}
    ${operadorList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Operadores:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(operadorList).join(' , ')}</td>
        </tr>` : ''}
    ${parentesisList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Paréntesis:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(parentesisList).join(' , ')}</td>
        </tr>` : ''}
    ${llavesList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Llaves:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(llavesList).join(' , ')}</td>
        </tr>` : ''}
    ${simbolosList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Símbolos:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(simbolosList).join(' , ')}</td>
        </tr>` : ''}
    ${unknownList.size > 0 ?
            `<tr>  
            <td class="py-4 pl-4 sm:pl-6 pr-3 text-sm text-[#dfe6e9]"> Desconocidos:</td>
            <td class="pr-4 pl-3 text-sm text-[#dfe6e9]">${Array.from(unknownList).join(' , ')}</td>
        </tr>` : ''}
    `;
});



const cleanBtn = document.getElementById('cleanBtn');
cleanBtn.addEventListener('click', () => {
    let output = document.getElementById('output');
    output.innerHTML = '';
    palabrasReservadasList.clear();
    identificadoresList.clear();
    operadorList.clear();
    parentesisList.clear();
    llavesList.clear();
    simbolosList.clear();
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
        'bool married: true;'
    ];
    let editor = document.getElementById('editor');
    var randomExample = examples[Math.floor(Math.random() * examples.length)];
    editor.innerHTML = randomExample;
})  