Ext.define( 'uxExtSpect.object.pointer.PropertyPointerWithValue',
	{  extend: 'uxExtSpect.object.pointer.PropertyPointer',
		isPropertyPointerWithValue: true,
		value: null,
		listenersOk: false,

		extspectString: function () {

			var property = this.property;
			if ( this.object instanceof Array ) { property = '[' + property + ']'; }
			var string = property + ': ';

			return String.fromCharCode( 0x25cf ) + // 0x25cf = big bullet char,  smaller bullet  : 0x2022
				' ' + string;
		}
	}
);
