import './global'

// eslint-disable-next-line no-console
// console.log = jest.fn()

class App extends EffectsRoot {
    static context = true

    foo = 42

    constructor() {
        super()

        this.destroy = (): void => {
            // eslint-disable-next-line no-console
            console.log('app destroyed')
        }
    }
}

class Player extends Effect {
    constructor(deps: EffectDeps) {
        super(deps)

        new Timeout(
            () => {
                // eslint-disable-next-line no-console
                console.log('Player')
            },
            1000,
            [this, App]
        )

        this.destroy = (): void => {
            // eslint-disable-next-line no-console
            console.log('player destroyed')
        }
    }

    onAppContext(app: App): void {
        // eslint-disable-next-line no-console
        console.log(app)
    }
}

test('effect', () => {
    const app = new App()
    new Player(app)

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith('Player')
})
