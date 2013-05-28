Ext.define( 'uxExtSpect.object.rec.SimpleObjectRec',
	{  extend: 'uxExtSpect.object.rec.BaseRec',

		fetchProperties: function () {
			var properties = [];
			var object = this.object;

			for ( var property in object ) {
				var object2 = object[ property ];
				if ( ( object2 instanceof Object ) && ! ( object2  instanceof Function ) &&
					! object2.hasOwnProperty( "superClass" ) ) {
					properties.push( property );
				}
			}
			return properties;
		}
	}
);
