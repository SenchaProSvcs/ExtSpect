/* This is a property pointer where the value is an 'instance' */

Ext.define( 'extspect.object.pointer.PropertyPointerWithInstance',
	{  extend : 'extspect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithInstance : true,

		extspectString : function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + StringOf.to$( this.value ) + '</span>';
		}
	}
);
