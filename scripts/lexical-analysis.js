class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
        this.reservedWords = {
            'fn': 'PALABRA RESERVADA',
            'str': 'PALABRA RESERVADA',
            'void': 'PALABRA RESERVADA',
            'bool': 'PALABRA RESERVADA',
            'num': 'PALABRA RESERVADA',
            'if': 'PALABRA RESERVADA',
            'for': 'PALABRA RESERVADA',
            '=': 'TOKEN',
            '==': 'TOKEN',
            '===': 'TOKEN',
            '>': 'TOKEN',
            '<': 'TOKEN',
            '>=': 'TOKEN',
            '<=': 'TOKEN',
            '!=': 'TOKEN',
            '!==': 'TOKEN',
            '++': 'TOKEN',
            ',': 'SIMBOLO',
            ')': 'SIMBOLOS',
            '(': 'SIMBOLOS',
            '{': 'SIMBOLOS',
            '}': 'SIMBOLOS',
            ':': 'SIMBOLOS',
        };
    }

    nextToken() {
        this.skipWhitespace();
        if (this.pos >= this.input.length) {
            return null;
        }
        for (let word in this.reservedWords) {
            if (this.input.substr(this.pos, word.length) === word) {
                this.pos += word.length;
                return { type: this.reservedWords[word], value: word };
            }
        }
        let char = this.input[this.pos];
        let number = '';
        while (this.pos < this.input.length && /[0-9]/.test(char)) {
            number += char;
            this.pos++;
            char = this.input[this.pos];
        }
        if (number !== '') {
            return { type: 'NUMBER', value: number };
        }
        let word = '';
        while (this.pos < this.input.length && /[a-z0-9]/i.test(char)) {
            word += char;
            this.pos++;
            char = this.input[this.pos];
        }
        if (word !== '') {
            return { type: 'UNRECOGNIZED WORDS', value: word };
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
        output.innerHTML += `<div>${token.type}: ${token.value}</div>`; 
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