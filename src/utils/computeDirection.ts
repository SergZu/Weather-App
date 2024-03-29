
const computeDirection = function(deg : number) : string {
    if (deg > 337.5 || deg < 22.5) return 'N'
    if (deg < 67.5) return 'N-E'
    if (deg < 112.5) return 'E'
    if (deg < 157.5) return 'S-E'
    if (deg < 202.5) return 'S'
    if (deg < 247.5) return 'S-W'
    if (deg < 292.5) return 'W'
    return 'N-W'
}
export default computeDirection;