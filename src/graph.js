import AFRAME from 'aframe'
// import 'three';
// let THREE;

AFRAME.registerComponent('graph', {
	schema: {
		values: {type: 'array', default: []},
		// xSegments: {type: 'int', default: 1},
		// ySegments: {type: 'int', default: 1},
		// xSize: {type: 'number', default: 1},
		// ySize: {type: 'number', default: 1},
		layout: {type: 'string', default: 'ring'},
		radius: {type: 'number', default: 1},
		layers: {type: 'int', default: 1},
		offset: {type: 'number', default: 0.9},

		// custom property types are allowed!
		// https://aframe.io/docs/0.5.0/core/component.html#custom-property-type
	},
	init: function () {
		// ring/cylinder, sphere, grid, box
		// if (this.layout === 'ring') {
		// 	const arc = 360/this.data.length
		// 	const x = 2
		// 	// for (let datum in data) {
			// for (let i = 0; i < this.data.length; i++) {
			// 	const box = document.createElement('a-box')
			// 	this.el.appendChild(box)
			// }
		// }
		// console.log(this)
		// console.log(this.el.getObject3D('mesh').geometry)
		// console.log(this.el.getObject3D('geometry'))
		// Do something when component is plugged in.
	},

	// 360*(2pi/360)
	update: function (oldData) {
		function rand255() { return Math.round(Math.random()*255) }
		function randrgb() {
			return `rgb(${rand255()}, ${rand255()}, ${rand255()})`
		}
		function multiply(v, s) {
			return { x: v.x*s, y: v.y*s, z: v.z*s}
		}
		function subtract(v1, v2) {
			return { x: v1.x-v2.x, y: v1.y-v2.y, z: v1.z-v2.z }
		}
		function setY(v, n) {
			return { x: v.x, y: n, z: v.z }
		}

		// favorite = favorites[Math.floor(Math.random() * favorites.length)];
		if (this.data.layout === 'ring') {
			const arc = 360/(this.data.values.length)
			const toDelete = Array.from(this.el.children).slice(this.data.values.length)
			for (let el of toDelete) { this.el.removeChild(el) }
			// for (let datum in data) {
			for (let i = 0; i < this.data.values.length; i++) {
				const value = this.data.values[i].value
				const labelText = this.data.values[i].label
				// console.log(this.data.values[i])

				let box
				let label
				if (this.el.children[i] === undefined) {
					box = document.createElement('a-box')
					this.el.appendChild(box)
					box.setAttribute('material', {color: randrgb(), opacity: 0.5})

					label = document.createElement('a-text')
					label.setAttribute('text', {
						value: 'text',
					})

					label.setAttribute('value', labelText)
					box.appendChild(label)
				} else {
					box = this.el.children[i]
					label = box.children[0]
				}
				const boxPos = {
					x: Math.sin(arc*(2*Math.PI/360)*i)*this.data.radius,
					y: value/2,
					z: Math.cos(arc*(2*Math.PI/360)*i)*this.data.radius,
				}
				box.setAttribute('position', boxPos)
				box.setAttribute('scale', {y: value})
				if (boxPos) {
					box.setAttribute('look-at', {x: 0, y: boxPos.y, z: 0})

					const a = multiply(boxPos, this.data.offset)
					let labelPos = subtract(a, boxPos)
					labelPos = setY(labelPos, 0)

					label.setAttribute('position', labelPos)
					// label.setAttribute('position', 'y', 1)
					// label.setAttribute('look-at', {x: 0, y: labelPos.y, z: 0})
				} else {
					console.log('skipped', box, boxPos, box.position, box.getAttribute('position'))
				}

				// console.log(boxPos)

				// box.setAttribute('material', {color: 'rgb(255, 0, 0)'})
			}
		}
	},
	tick: function (time, timeDelta) {

	}
})
