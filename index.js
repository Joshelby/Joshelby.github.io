const leagueOfTriviaButton = document.getElementById("league-of-trivia-button")

const linkTo = game => {
    window.location.href = `./${game}.html`
}

leagueOfTriviaButton.onclick = (event) => linkTo("league-of-trivia")