const form = document.getElementById('form');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');
const canvas = document.getElementById('graficoGastos');

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let miGrafico;

function renderGrafico() {
    if (typeof Chart === 'undefined') return;
    const nombres = gastos.map(g => g.nombre);
    const montos = gastos.map(g => parseFloat(g.monto) || 0);

    if (miGrafico) miGrafico.destroy();

    miGrafico = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Monto $',
                data: montos,
                backgroundColor: 'rgba(78, 115, 223, 0.8)',
                borderColor: '#4e73df',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

function eliminarGasto(index) {
    gastos.splice(index, 1);
    actualizarVista();
}

function actualizarVista() {
    lista.innerHTML = '';
    let total = 0;
    
    gastos.forEach((g, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${g.nombre}: $${parseFloat(g.monto).toFixed(2)}</span>
            <button onclick="eliminarGasto(${index})" class="btn-eliminar">X</button>
        `;
        lista.appendChild(li);
        total += parseFloat(g.monto);
    });

    totalDisplay.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('gastos', JSON.stringify(gastos));
    renderGrafico();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const monto = document.getElementById('monto').value;
    gastos.push({ nombre, monto });
    actualizarVista();
    form.reset();
});

document.getElementById('limpiar').addEventListener('click', () => {
    if(confirm('¿Borrar todo?')) {
        gastos = [];
        actualizarVista();
    }
});

actualizarVista();
