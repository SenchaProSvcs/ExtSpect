Ext.define( 'ux.extspect.store.object.property.InternalListStore',
	{  extend : 'ux.extspect.store.object.property.PropertiesListStore'
	}
);
// groupFn screws up properties with all caps names
//	config : {	grouper : { groupFn : function( record ) { return record.get( "id" )[1] } } }
