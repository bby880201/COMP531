import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'
    const newheadline = "new headline test"

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        // .sendKeys(new headline message)
        // verify the headline is updated
        // .sendKeys(the old headline message)
        // verify the headline is updated
        const oldheadline = findId('message').getText()
        sleep(500)
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(newheadline))
        .then(findId('headline').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.eql(`Update headline to "${newheadline}"`)
            })
            )
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(oldheadline))
        .then(findId('headline').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal(`Update headline to "${oldheadline}"`)
            })
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})