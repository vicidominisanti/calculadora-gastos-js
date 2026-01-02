const form = document.getElementById('form');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');
const canvas = document.getElementById('graficoGastos');

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let miGrafico;

function renderGrafico() {
    // Verificamos si la librería Chart existe
    if (typeof Chart === 'undefined') {
        console.error("La librería Chart.js no se cargó correctamente");
        return;
    }

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

function actualizarVista() {
    lista.innerHTML = '';
    let total = 0;
    gastos.forEach((g) => {
        const li = document.createElement('li');
        li.innerHTML = `${g.nombre} <span>$${parseFloat(g.monto).toFixed(2)}</span>`;
        lista.appendChild(li);
        total += parseFloat(g.monto);
    });
    totalDisplay.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('gastos', JSON.stringify(gastos));
    renderGrafico();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    gastos.push({ 
        nombre: document.getElementById('nombre').value, 
        monto: document.getElementById('monto').value 
    });
    actualizarVista();
    form.reset();
});

document.getElementById('limpiar').addEventListener('click', () => {
    gastos = [];
    actualizarVista();
});

actualizarVista();
