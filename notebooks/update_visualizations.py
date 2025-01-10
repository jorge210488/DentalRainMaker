fetch('http://localhost:3000/data/histogram_age_distribution.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.x,
                datasets: [{
                    label: 'Cantidad de Pacientes',
                    data: data.y,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: data.xaxis_title } },
                    y: { title: { display: true, text: data.yaxis_title } }
                }
            }
        });
    });
