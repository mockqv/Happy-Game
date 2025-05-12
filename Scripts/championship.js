document.addEventListener('DOMContentLoaded', () => {
    const championships = [
        {
            name: "Worlds 2025",
            game: "League of Legends",
            date: "03 a 31 de outubro de 2025",
            viewers: "4.5",
            prize: "US$ 2.2M"
        },
        {
            name: "The International 2025",
            game: "Dota 2",
            date: "10 a 25 de julho de 2025",
            viewers: "2.8",
            prize: "US$ 15M"
        },
        {
            name: "CS:GO Major 2025",
            game: "Counter-Strike 2",
            date: "05 a 18 de maio de 2025",
            viewers: "1.6",
            prize: "US$ 1M"
        },
        {
            name: "VCT Champions 2025",
            game: "Valorant",
            date: "01 a 15 de setembro de 2025",
            viewers: "3.2",
            prize: "US$ 2M"
        },
        {
            name: "Rocket League Championship Series",
            game: "Rocket League",
            date: "16 a 25 de agosto de 2025",
            viewers: "1.1",
            prize: "US$ 1.5M"
        }
    ];

    const tableContainer = document.getElementById('championships-table-container');

    function renderChampionshipsTable(data) {
        let tableHTML = `
            <table class="table table-striped table-hover table-bordered">
                <thead class="table-header-custom">
                    <tr>
                        <th>Campeonato</th>
                        <th>Jogo</th>
                        <th>Data</th>
                        <th>Média de Espectadores (Milhões)</th>
                        <th>Premiação</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(championship => {
            tableHTML += `
                <tr>
                    <td>${championship.name}</td>
                    <td>${championship.game}</td>
                    <td>${championship.date}</td>
                    <td>${championship.viewers}</td>
                    <td>${championship.prize}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;
        tableContainer.innerHTML = tableHTML;
    }

    renderChampionshipsTable(championships);
});