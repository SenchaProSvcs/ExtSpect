Ext.define( 'uxExtSpect.view.object.tabpanel.ArrayTabPanel',
	{  extend : 'uxExtSpect.view.ExtSpectTabPanel',
		xtype : 'arraytabpanel',
		requires : ['uxExtSpect.view.object.datalist.ArrayList'],

		config : {
			items : [
				{    title : 'Array',
					items : { xtype : 'arraylist' }
				}
			]
		}
	}
);
