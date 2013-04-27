Ext.define( 'uxExtSpect.store.tree.TreeListStore',
	{  extend : 'uxExtSpect.store.ExtSpectDataListStore',
		config : { clearOnPageLoad : true,
			model : 'uxExtSpect.model.row.RowRecord'
		}
	}
);
