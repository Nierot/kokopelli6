<script lang="ts">
	import { Session, type Game } from '$lib/session'
	import { getStorageItem } from '$lib/storage'
	import { onMount } from 'svelte'
	import './game.sass'
	import { parseTime } from '$lib'
	import PhGear from '~icons/ph/gear'
	import type { IMinigame } from '$lib/games/_template'
	import { GameIntroduction } from '$lib/games/introduction'
	import { renderGame, type RenderedGame } from '$lib/render'

	let loading = $state(true)
	let game = $state()
	let gameRender = $state()
	let timer = $state(0)
	let song = $state()
	let session = $state<Session>()
	let error = $state()

	onMount(() => {
		const loadingTimeout = setTimeout(() => (loading = false), 100)

		const songInterval = setInterval(() => {})

		start()

		return {
			destroy() {
				clearTimeout(loadingTimeout)
				clearInterval(songInterval)
			},
		}
	})

	function start() {
		const oldGameState = getStorageItem<Game>('game-state')

		try {
			if (oldGameState && oldGameState.players.length > 0) {
				session = Session.from(oldGameState)
			} else {
				// Start a new game with the default settings
				session = Session.fromNothing()
			}
		} catch (err) {
			console.error(err)
			error = err
		}

		// We can assume we have a session here
		session = session!

		session.on<'next'>('next', onNextGame)
		session.on<'error'>('error', onError)
		session.on<'tick'>('tick', onTick)

		session.start()
	}

	function onNextGame(nextGame: IMinigame | undefined) {
		// set new game state
		// flash alert
		// set new background
		game = nextGame
		if (nextGame) {
			let renderedGame = renderGame(nextGame, session?.getCurrentPlayers() ?? [])

			gameRender = renderedGame

			session?.updatePlayerScores(renderedGame.score ?? 0, renderedGame.selectedPlayers)
		}
	}

	function onError(err: unknown) {
		// Show error
		// custom alert
		error = err
	}

	function onTick(tick: number) {
		timer = tick
	}

	function openSettings() {
		alert()
	}
</script>

{#snippet errorSnippet(err)}
	<div class="error">
		<h1>Er is iets misgegaan</h1>
		<h3>{err ?? 'Balen man...'}</h3>
	</div>
{/snippet}

{#snippet loadingSnippet()}
	<div class="loading">
		<h1>
			Kokopelli is aan het laden
			<span class="dots">{'.'.repeat(1 + ((timer ?? 0) % 3))}</span>
		</h1>
	</div>
{/snippet}

{#snippet gameSnippet(game)}
	<div class="game">
		<div class="header">
			<div class="button"><button onclick={openSettings}><PhGear /></button></div>
			<p>{@html game?.body?.title ?? 'Kokopelli'}</p>
			<div class="time">
				<p>{parseTime(timer ?? 0)}</p>
			</div>
		</div>

		<div class="content">
			<!-- {console.log({ game })} -->
			<h1>{@html game.body.title ?? ''}</h1>
			<h2>{@html game.body.content ?? ''}</h2>
			<h3>{@html game.body.footer ?? ''}</h3>
		</div>
	</div>
{/snippet}

{#snippet songSnippet({ title })}
	<div class="song">
		<h1>song</h1>
	</div>
{/snippet}

<main>
	<dialog>
		<h1>Instellingen</h1>
		<p>Instellingen komen hier</p>
	</dialog>

	{#if loading}
		{@render loadingSnippet()}
	{:else if error}
		{@render errorSnippet(error)}
	{:else if game}
		{@render gameSnippet(gameRender)}
	{:else if song}
		{@render songSnippet(song)}
	{:else}
		{@render errorSnippet(undefined)}
	{/if}
</main>

<style lang="sass">
	main
		// css animation on background change
		-moz-transition: all 1s ease-in
		-webkit-transition: all 1s ease-in
		-o-transition: all 1s ease-in
		transition: all 1s ease-in

		height: 100vh
		width: 100vw


	.loading, .error
		display: flex
		justify-content: center
		align-items: center
		height: 95vh

		h1
			font-size: 3rem
			line-height: 1
		h3
			font-size: 2rem

	.error
		position: absolute
		flex-direction: column
		top: 0
		left: 0
		height: 100vh
		width: 100vw
		background-color: red
		color: white
</style>
