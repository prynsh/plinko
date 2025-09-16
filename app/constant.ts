export const DECIMAL_MULTIPLIER = 10000

export const WIDTH = 800
export const HEIGHT = 800
export const ballRadius = 7
export const obstacleRadius = 4
export const gravity = pad(0.2) //gravity if increased the speed of the ball increases. Hence we have kept it at 0.2
export const horizontalFriction = 0.4 //why is it less even though we need to take it more because when we multiply speed with this then it is less and hence it is less here
export const verticalFriction = 0.8


//both of these function are purely added to avoid precision errors
export function pad(n: number) {
    return (n * DECIMAL_MULTIPLIER)
}

export function unPad(n: number) {
    return Math.floor(n / DECIMAL_MULTIPLIER)
}
