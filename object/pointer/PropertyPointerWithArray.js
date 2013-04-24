Ext.define( 'ux.extspect.object.pointer.PropertyPointerWithArray',
	{  extend : 'ux.extspect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithArray : true,

		extspectString : function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + '[...' + this.value.length + ']' + '</span>';
		}
	}
);
