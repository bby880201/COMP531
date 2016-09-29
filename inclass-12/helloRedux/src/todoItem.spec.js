import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		// findDOMNode and assert 3 children of the ToDoItem element
		// assert the className is ''
		// assert the innerHTML of the todo is the text you initially set

		const text = "testToDo"
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text={text} />
			</div>)
		const element = findDOMNode(node).children[0]
		expect(element.children.length).to.equal(3)
		expect(element.children[1].className).to.equal('')
		expect(element.children[1].innerHTML).to.equal(text)
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		// when the checkbox is clicked via TestUtils.Simulate.click()
		// we expect the variable toggled to be true
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem done={toggled} toggle={()=>{toggled=!toggled}}/>
			</div>)
		const element = findDOMNode(node).children[0]
		TestUtils.Simulate.click(element.children[0])

		expect(toggled).to.be.true


	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		// when the remove button is clicked via TestUtils.Simulate.click()
		// we expect the variable removed to be true
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem remove={()=>{removed=!removed}}/>
			</div>)
		const element = findDOMNode(node).children[0]
		TestUtils.Simulate.click(element.children[2])

		expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		// the item should have done=true
		// assert that the rendered className is "completed"
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem done={true} />
			</div>)
		const element = findDOMNode(node).children[0]
		expect(element.children[1].className).to.equal('completed')
	})

})
