class Game {
    // This class handles the main logic of the game

    constructor(game_duration) {
        this.game_duration = game_duration;
        this.score = { score : 0 };
        this.game_over = false;
        this.elements = [];
        this.clicked_numbers = {};
        this.number_interval = null;
        this.start_game();
        this.set_timer();
    };

    set_timer() {
        setTimeout(() => {
            this.game_over = true;
            clearInterval(this.number_interval);
            const game_over = document.getElementById('game-over');
            game_over.textContent = `Game finished. Total score: ${this.score['score']}`;
            game_over.classList.add('show'); // Over-writting the 'display: none' attribute of the 'game-over' element
            this.fetch_leaderboard();

            this.store_data();
        }, this.game_duration);
    };

    start_game() {
        this.number_interval = setInterval(() => {
            if (!this.game_over) {
                let new_number = new Element();
                if (!this.clicked_numbers[new_number.id]) {
                    this.elements.push(new_number);
                    document.getElementById('number-container').appendChild(new_number.element);
                }
            }
        }, 1000);
    };

    update_score(points) {
        if (!this.game_over) {
            this.score['score'] += points;
        }
    };

    store_data() {
        const json_data = JSON.stringify(this.score);
        localStorage.setItem('Total score', json_data);
    };

    fetch_leaderboard() {
        fetch('../static/data/leaderboard.json')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`An error occured. ${response.status}`)
                }
            })
            .then((data) => {
                this.show_leaderboard(data)
            })
            .catch((error) => console.log(error))
    };

    show_leaderboard(data) {
        data.sort((a,b) => b.score - a.score);
        const leaderboard = document.getElementById('leaderboard');
        leaderboard.classList.add('show') // Over-writting the 'display: none' attribute of the 'game-over' element
        leaderboard.innerHTML = '<h2>Leaderboard</h2>';
        data.forEach((entry, index) => {
            leaderboard.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score}</p>`;
        });
    };
};
