Ext.define( 'extspect.store.ExtSpectDataListStore',
	{  extend : 'Ext.data.Store',
		requires : 'extspect.model.row.RowRecord',
		config : {    clearOnPageLoad : true,
			model : 'extspect.model.row.RowRecord'
		}
	}
);
