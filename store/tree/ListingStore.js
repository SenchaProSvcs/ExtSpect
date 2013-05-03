Ext.define( 'uxExtSpect.store.tree.ListingStore',
	{  extend : 'uxExtSpect.store.ExtSpectDataListStore',
		config : { grouper : { groupFn : function ( record ) { return record.get( "text" )[0]; } },
			sorters : "string"
		}
	}
);
