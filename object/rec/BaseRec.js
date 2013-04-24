Ext.define( 'ux.extspect.object.rec.BaseRec',
	{  defaultIdPrefix : 'es-br-',

		object : undefined,
		children : [],
		listenersOk : false,

		properties : [],
		listenerProperties : [],

		// This needs to append the properties in superclasses
		fetchProperties : function () {
			var properties = this.properties;
			if ( this.listenersOk )
			{ properties = properties.concat( this.listenerProperties ); }
			return properties;
		}
	}
);

ux.extspect.object.rec.BaseRec.prototype.extspectString =
	function () { return 'Rec{' + ux.extspect.util.StringOf.to$( this.object ) + '}[' +
		( this.children ? this.children.length : '' ) + ']'; };
