Ext.define( 'uxExtSpect.object.pointer.PropertyPointerWithArray',
	{  extend: 'uxExtSpect.object.pointer.PropertyPointerWithValue',

		isPropertyPointerWithArray: true,

		extspectString: function () {
			return this.callParent( arguments ) +
				'<span style = "font-weight : normal">' + '[...' + this.value.length + ']' + '</span>';
		}
	}
);
