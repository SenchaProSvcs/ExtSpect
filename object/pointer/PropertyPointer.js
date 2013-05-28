/* Using a config here causes stack overflow with some objects such as Ext :
 Base.implement.initConfig => Ext.Object.merge => Ext.apply.clone which executes a deep clone
 for arrays and for objects.
 */
// used in ObjectNavigationView#pushNewArrayPanel()

Ext.define( 'uxExtSpect.object.pointer.PropertyPointer',
	{  defaultIdPrefix: 'es-pp-',

		object: undefined,
		property: undefined,

		fetchValue: function () { return this.object[ this.property ]; },

		valueString: function ( value ) {
			return uxExtSpect.util.StringOf.to$( value )
		},

		extspectString: function () { return this.valueString( this.object ) + '.' + this.property; }
	}
);
