Ext.define( 'ux.extspect.store.object.property.PropertiesListStore',
	{  extend : 'ux.extspect.store.ExtSpectDataListStore',
		requires : 'ux.extspect.model.row.GroupedRowRecord',
		config : { model : 'ux.extspect.model.row.GroupedRowRecord',
			grouper : { groupFn : function ( record ) { return record.get( "id" )[ 0 ]; } }
		}
	}
);
{}
