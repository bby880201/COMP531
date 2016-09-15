import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle()
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        var arr = [p.position, p.velocity, p.acceleration]
        arr.forEach((x)=>{
            expect(x).to.have.length.of(2)
            expect(x[0]).to.be.a('number')
            expect(x[1]).to.be.a('number')
        })
        expect(p.mass).to.be.a('number')
    })

    it('should update the position by the velocity', () => {
        const p = particle()
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.closeTo(1.5, 0.1)
        expect(position[1]).to.be.closeTo(0.5, 0.1)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle()
        p.position = [1, 1]
        p.velocity = [0.5, -0.5]
        const { position } = update(p, 2.0) // dt is different here
        expect(position[0]).to.be.closeTo(2.0, 0.1)
        expect(position[1]).to.be.closeTo(0.0, 0.1)

    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle()
        p.position = [2, 2]
        p.velocity = [0.1, -0.1]
        p.acceleration = [0.3,0.3]
        const { position, velocity } = update(p, 2.0) 
        expect(position[0]).to.be.closeTo(3.4, 0.1)
        expect(position[1]).to.be.closeTo(3, 0.1)
        expect(velocity[0]).to.be.closeTo(0.7, 0.1)
        expect(velocity[1]).to.be.closeTo(0.5, 0.1)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        const canvas = {width:1000,height:800}
        const p = particle()
        p.position = [-100, 100]
        p.velocity = [1,1]
        var {position} = update(p,1.0,canvas)
        expect(position[0]).to.be.closeTo(901, 0.1)
        expect(position[1]).to.be.closeTo(101, 0.1)

        p.position = [100,-100]
        var {position} = update(p,1.0,canvas)
        expect(position[0]).to.be.closeTo(101, 0.1)
        expect(position[1]).to.be.closeTo(701, 0.1)        

        p.position = [1200,400]
        var {position} = update(p,1.0,canvas)
        expect(position[0]).to.be.closeTo(201, 0.1)
        expect(position[1]).to.be.closeTo(401, 0.1)

        p.position = [600,900]
        var {position} = update(p,1.0,canvas)
        expect(position[0]).to.be.closeTo(601, 0.1)
        expect(position[1]).to.be.closeTo(101, 0.1)         

    })

})
