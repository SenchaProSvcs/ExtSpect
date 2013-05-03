Ext.define( 'uxExtSpect.store.ExtSpectDataListStore',
	{  extend : 'Ext.data.Store',
		requires : 'uxExtSpect.model.row.RowRecord',
		config : {
			clearOnPageLoad : true,
			model : 'uxExtSpect.model.row.RowRecord'
		}
	}
);
