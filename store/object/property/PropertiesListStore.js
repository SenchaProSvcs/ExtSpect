Ext.define( 'uxExtSpect.store.object.property.PropertiesListStore',
	{  extend : 'uxExtSpect.store.ExtSpectDataListStore',
		requires : 'uxExtSpect.model.row.GroupedRowRecord',
		config : { model : 'uxExtSpect.model.row.GroupedRowRecord',
			grouper : { groupFn : function ( record ) { return record.get( "id" )[ 0 ]; } }
		}
	}
);
{}
