Ext.define( 'extspect.store.tree.TreeListStore',
	{  extend : 'extspect.store.ExtSpectDataListStore',
		config : { clearOnPageLoad : true,
			model : 'extspect.model.row.RowRecord'
		}
	}
);
