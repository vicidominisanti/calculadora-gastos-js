const form = document.getElementById('form');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');
const btnLimpiar = document.getElementById('limpiar');

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

function actualizarVista() {
    lista.innerHTML = '';
    let total = 0;
    gastos.forEach((g, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${g.nombre} <span>$${g.monto}</span>`;
        lista.appendChild(li);
        total += parseFloat(g.monto);
    });
    totalDisplay.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    gastos.push({ nombre: document.getElementById('nombre').value, monto: document.getElementById('monto').value });
    actualizarVista();
    form.reset();
});

btnLimpiar.addEventListener('click', () => {
    gastos = [];
    actualizarVista();
});

actualizarVista();
