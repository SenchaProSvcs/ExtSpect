/* This is a property pointer where the value is an 'instance' */

Ext.define( 'uxExtSpect.object.pointer.PropertyPointerWithInstance',
	{  extend: 'uxExtSpect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithInstance: true,

		extspectString: function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + this.valueString( this.value ) + '</span>';
		}
	} );
