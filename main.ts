function ΕΥΘΕΙΑ () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
}
function ΑΡΙΣΤΕΡΑ_ () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
}
function ΠΙΣΩ () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 100)
}
function ΔΕΞΙΑ_ () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
}
function ΣΤΑΜΑΤΑ () {
    maqueen.motorStop(maqueen.Motors.All)
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) > 5) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            ΕΥΘΕΙΑ()
        } else {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                ΔΕΞΙΑ_()
            } else {
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    ΑΡΙΣΤΕΡΑ_()
                } else {
                    ΣΤΑΜΑΤΑ()
                }
            }
        }
    } else {
        ΣΤΑΜΑΤΑ()
    }
})
