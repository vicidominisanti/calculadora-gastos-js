const form = document.getElementById('form');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');
const btnLimpiar = document.getElementById('limpiar');
const canvas = document.getElementById('graficoGastos');

let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
let miGrafico;

function renderGrafico() {
    const nombres = gastos.map(g => g.nombre);
    const montos = gastos.map(g => parseFloat(g.monto));

    if (miGrafico) {
        miGrafico.destroy();
    }

    miGrafico = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Gastos $',
                data: montos,
                backgroundColor: '#4e73df',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
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
    const nombre = document.getElementById('nombre').value;
    const monto = document.getElementById('monto').value;
    
    gastos.push({ nombre, monto });
    actualizarVista();
    form.reset();
});

btnLimpiar.addEventListener('click', () => {
    if(confirm('¿Seguro que quieres borrar todo?')) {
        gastos = [];
        actualizarVista();
    }
});

// Arrancar la app
actualizarVista();
