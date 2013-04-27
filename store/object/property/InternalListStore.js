Ext.define( 'uxExtSpect.store.object.property.InternalListStore',
	{  extend : 'uxExtSpect.store.object.property.PropertiesListStore'
	}
);
// groupFn screws up properties with all caps names
//	config : {	grouper : { groupFn : function( record ) { return record.get( "id" )[1] } } }
