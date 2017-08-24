import './graph.js'

import extras from 'aframe-extras'

import 'aframe-gridhelper-component'
import 'aframe-meshline-component'
import 'aframe-look-at-component'
import './ground.js'
import './shader.js'
// Register a single component.
// AFRAME.registerComponent('ocean', extras.primitives.aOcean);
extras.primitives.registerAll();

window.onload = function () {
	var $ = document.querySelector.bind(document);
	// const line = document.createElement('a-entity')
	// line.setAttribute('meshline', {
	// 	path: '-1 0 0, 1 0 0, 1 0 1',
	// 	lineWidth: '5',
	// 	lineWidthStyler: 'Math.random()',
	// 	color: '#E20049',
	// })
	// $('a-scene').appendChild(line)

	const graph = $('#graph')

	setTimeout( () => {
		const n = 15 // Math.round(Math.random()*10)
		const arr = []
		for (let i = 0; i < n; i++) {
			arr.push({
				value: Math.random()*15,
				label: 'blah',
			})
		}
		graph.setAttribute('graph', 'values', arr)
	}, 2000)

	setInterval( () => {

	})

	// setTimeout( () => {
	// 	graph.setAttribute('graph', 'values', [1, 2, 3, 4, 5])
	// }, 4000)
	//
	// setTimeout( () => {
	// 	graph.setAttribute('graph', 'values', [3, 1, 5])
	// }, 7000)
}
