/* This is a property pointer where the value is an 'instance' */

Ext.define( 'uxExtSpect.object.pointer.PropertyPointerWithInstance',
	{  extend : 'uxExtSpect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithInstance : true,

		extspectString : function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + uxExtSpect.util.StringOf.to$( this.value ) + '</span>';
		}
	} );
