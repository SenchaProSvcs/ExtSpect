/* This is a property pointer where the value is an 'instance' */

Ext.define( 'ux.extspect.object.pointer.PropertyPointerWithInstance',
	{  extend : 'ux.extspect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithInstance : true,

		extspectString : function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + ux.extspect.util.StringOf.to$( this.value ) + '</span>';
		}
	} );
