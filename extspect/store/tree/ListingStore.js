Ext.define( 'extspect.store.tree.ListingStore',
	{  extend : 'extspect.store.ExtSpectDataListStore',
		config : { grouper : { groupFn : function ( record ) { return record.get( "text" )[0]; } },
			sorters : "string"
		}
	}
);
