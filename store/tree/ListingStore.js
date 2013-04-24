Ext.define( 'ux.extspect.store.tree.ListingStore',
	{  extend : 'ux.extspect.store.ExtSpectDataListStore',
		config : { grouper : { groupFn : function ( record ) { return record.get( "text" )[0]; } },
			sorters : "string"
		}
	}
);
