import { type Component, createSignal, createEffect, Show } from 'solid-js'

// tell typescript that this function is defined in the global scope
declare function consentGranted(): void
declare function getCookieConsent(): string

const CookieConsent: Component = () => {
	const [cookies, setCookies] = createSignal('unk')
	const [isMounted, setIsMounted] = createSignal(false)

	// get dates for cookie expiration
	let d = new Date()
	let oneYear = new Date(d.getFullYear() + 1, d.getMonth(), d.getDate())

	const handleAccept = () => {
		setCookies('granted')
		// accepted cookie lasts for a year
		document.cookie = 'cookie-consent=granted; expires=' + oneYear + '; path=/'
		// call global function (head defined) to update GA4
		consentGranted()
	}

	const handleDecline = () => {
		setCookies('denied')
		// declined cookie only lasts for the session
		// if you don't want to be evil you can set it to a year
		document.cookie = 'cookie-consent=denied; path=/'
	}

	// this waits to load the cookie banner until the component is mounted
	// so that there is not a component flash
	createEffect(() => {
		setIsMounted(true)
		// get cookie approval after component is mounted
		setCookies(getCookieConsent())
	})

	// if there is no cookie for "cookie-consent", display the banner
	return (
		<Show when={isMounted()} fallback={null} children={null}>
			<div
				id="cookie-banner"
				class={`${cookies() === 'granted' || cookies() === 'denied' ? 'hidden' : ''} fixed bottom-8 rounded border-2 border-slate-700 p-4`}
			>
				<div class="space-y-2">
					<p>
						We use cookies to analyze our website and make your experience even better. To learn
						more, see our{' '}
						<a class="underline" href="/privacy-policy">
							Privacy Policy.
						</a>
					</p>

					<div class="flex gap-2">
						<button class="rounded p-2 hover:bg-slate-700 dark:bg-slate-900" onClick={handleAccept}>
							Accept
						</button>
						<button
							class="rounded p-2 hover:bg-slate-700 dark:bg-slate-900"
							onClick={handleDecline}
						>
							Decline
						</button>
					</div>
				</div>
			</div>
		</Show>
	)
}

export default CookieConsent
