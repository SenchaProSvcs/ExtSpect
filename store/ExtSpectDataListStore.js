Ext.define( 'ux.extspect.store.ExtSpectDataListStore',
	{  extend : 'Ext.data.Store',
		requires : 'ux.extspect.model.row.RowRecord',
		config : {
			clearOnPageLoad : true,
			model : 'ux.extspect.model.row.RowRecord'
		}
	}
);
