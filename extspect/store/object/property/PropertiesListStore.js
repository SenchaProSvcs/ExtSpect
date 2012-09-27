Ext.define( 'extspect.store.object.property.PropertiesListStore',
	{  extend : 'extspect.store.ExtSpectDataListStore',
		requires : 'extspect.model.row.GroupedRowRecord',
		config : { model : 'extspect.model.row.GroupedRowRecord',
			grouper : { groupFn : function ( record ) { return record.get( "id" )[ 0 ]; } }
		}
	}
);
{}
