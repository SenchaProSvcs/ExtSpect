Ext.define( 'ux.extspect.object.rec.PropertyPointerRec',
	{  extend : 'ux.extspect.object.rec.BaseRec',
		isPropertyPointerRec : true,
		properties : ["value"]

	}
);

/* 4/4
 fetchProperties : function ( )
 {	var properties = []
 var object = this.object.fetchValue()

 for ( var property in object )
 { 	var object2 = object[ property ]
 if 	( ! ( ( object2  instanceof Function ) && ! object2.hasOwnProperty( "superClass" ) ) )
 {	properties.push( property )
 }	}
 return properties
 }*/
