const uName = "Abc";
console.log(uName);

const button = document.querySelector('button')!;
button.addEventListener('click', () => {
    console.log('Clicked!');
})

function clickHandler(message: string) {
    console.log('clicked' + message);
}
button.addEventListener('click', clickHandler.bind(null, 'Hello'));

function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
}

