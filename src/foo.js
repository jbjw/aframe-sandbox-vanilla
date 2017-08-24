import AFRAME from 'aframe';

var extendDeep = AFRAME.utils.extendDeep;
// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
var meshMixin = AFRAME.primitives.getMeshMixin();
AFRAME.registerPrimitive('a-pl', extendDeep({}, meshMixin, {
	// Preset default components. These components and component properties will be attached to the entity out-of-the-box.
	defaultComponents: {
		geometry: {primitive: 'plane', buffer: 'false', segmentsHeight: 10, segmentsWidth: 10, },
		material: {wireframe: 'true', },
		rotation: {x: -90, y: 0, z: 0},
		foo: {},
	},
	// Defined mappings from HTML attributes to component properties (using dots as delimiters). If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
	mappings: {
		depth: 'geometry.depth',
		height: 'geometry.height',
		width: 'geometry.width',
	}
}));

AFRAME.registerComponent('foo', {
	schema: {
		bar: {type: 'number'},
		baz: {type: 'string'}
	},
	init: function () {
		// console.log(this)
		console.log(this.el.getObject3D('mesh').geometry)
		// console.log(this.el.getObject3D('geometry'))
		// Do something when component is plugged in.
	},
	update: function () {
		// Do something when component's data is updated.
	},
	tick: function (time, timeDelta) {

	}
})
