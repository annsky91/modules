import 'sky/features/ecs/global'
import Vector3 from 'sky/math/Vector3'

/**
 * @property {Vector3} acceleration
 * @param {Entity} entity
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 */
export default class Acceleration3Able extends Component {
    acceleration: Vector3

    /**
     */
    constructor(entity: Entity, x?: number, y?: number, z?: number) {
        super(entity)

        this.acceleration = new Vector3(x, y, z)
    }
}
