<script lang="ts">
	import { navigate } from '$lib'
	import { findOldPlayers } from '$lib/players'
	import { setStorageItem } from '$lib/storage'

	const players = $state(findOldPlayers())

	console.log(players)

	function addPlayer() {
		const name = prompt('Naam van de speler')
		if (name) {
			// find highest id
			const id = players.reduce((max, player) => Math.max(max, player.id), 0) + 1

			players.push({
				id,
				name,
				score: 0,
			})

			setStorageItem('players', players)
		}
	}

	function removePlayer(id: number) {
		const index = players.findIndex(player => player.id === id)
		players.splice(index, 1)
		setStorageItem('players', players)
	}

	function start() {
		if (players.length > 0) {
			navigate('/game')
		} else {
			alert('Voeg eerst spelers toe')
		}
	}
</script>

<main>
	<div class="container">
		<div>
			<h1>Welkom bij Kokopelli</h1>
			<h4>Wie spelen er mee?</h4>
		</div>

		<div class="button-bar">
			<button onclick={addPlayer}>Speler toevoegen</button>
			<button onclick={start}>Begin spel</button>
		</div>

		{#if players.length === 0}
			<p id="no-players">Er zijn nog geen spelers</p>
		{:else}
			<ul>
				{#each players as player}
					<li>
						<div><button onclick={() => removePlayer(player.id)}>x</button></div>
						<p>{player.name}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

<style lang="sass">
	main
		display: flex
		justify-content: center

	.container
		display: flex
		flex-direction: column
		align-items: flex-start
		margin-top: 2rem
		

	h4
		margin-bottom: 1rem

	#no-players
		margin-top: 1rem

	li
		display: grid
		grid-template-columns: 60px 1fr
		margin-top: 0.5rem

		p
			display: flex
			align-items: center
			margin: 0
			padding: 0
			font-size: 1.5rem
</style>
