Ext.define( 'ux.extspect.store.tree.TreeListStore',
	{  extend : 'ux.extspect.store.ExtSpectDataListStore',
		config : { clearOnPageLoad : true,
			model : 'ux.extspect.model.row.RowRecord'
		}
	}
);
