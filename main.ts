function ΕΥΘΕΙΑ (ταχύτητα: number) {
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, ταχύτητα)
}
function ΑΡΙΣΤΕΡΑ_ () {
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
}
function ΠΙΣΩ () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
}
function ΔΕΞΙΑ_ () {
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
}
function ΣΤΑΜΑΤΑ () {
    maqueen.motorStop(maqueen.Motors.All)
}
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
basic.showIcon(IconNames.Asleep)
basic.pause(500)
basic.showIcon(IconNames.Surprised)
basic.pause(500)
basic.showIcon(IconNames.Happy)
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) > 5) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            basic.showIcon(IconNames.Happy)
            ΕΥΘΕΙΑ(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                ΑΡΙΣΤΕΡΑ_()
                strip.showColor(neopixel.colors(NeoPixelColors.Green))
            } else {
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                    ΔΕΞΙΑ_()
                    strip.showColor(neopixel.colors(NeoPixelColors.Green))
                } else {
                    basic.showLeds(`
                        # . . . #
                        . # . # .
                        . . # . .
                        . # . # .
                        # . . . #
                        `)
                    ΣΤΑΜΑΤΑ()
                    music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
                    strip.showColor(neopixel.colors(NeoPixelColors.Red))
                }
            }
        }
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        ΣΤΑΜΑΤΑ()
        music.play(music.builtinPlayableSoundEffect(soundExpression.sad), music.PlaybackMode.UntilDone)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
    }
})
