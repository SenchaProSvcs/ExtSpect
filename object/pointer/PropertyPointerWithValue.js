Ext.define( 'ux.extspect.object.pointer.PropertyPointerWithValue',
	{  extend : 'ux.extspect.object.pointer.PropertyPointer',
		isPropertyPointerWithValue : true,
		value : null,
		listenersOk : false,

		extspectString : function () {
			//var value = this.object ? this.fetchValue() : null;

			var property = this.property;
			if ( this.object instanceof Array ) { property = '[' + property + ']'; }
			var string = property + ': ';

			return String.fromCharCode( 0x25cf ) + // 0x25cf = big bullet char,  smaller bullet  : 0x2022
				' ' + string;
		}
	}
);
