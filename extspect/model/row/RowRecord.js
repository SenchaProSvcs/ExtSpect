Ext.define( 'extspect.model.row.RowRecord',
	{  extend : 'Ext.data.Model',

		config : {
			fields : [
				{    name : 'value',
					type : 'auto'
				} ,
				{    name : 'text',
					type : 'string'
				}
			]
		}
	}
);
