/* eslint-disable no-console */
import 'helpers/EventEmitter/global'

const test = EventEmitter.extend(() => {
    console.log('I am a function!')
})

const dispose = test.on('test', () => console.log('test'))
test.emit('test')
dispose()

test()
