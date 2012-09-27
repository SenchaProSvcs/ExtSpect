Ext.define( 'extspect.view.object.tabpanel.ArrayTabPanel',
	{  extend : 'extspect.view.ExtSpectTabPanel',
		xtype : 'arraytabpanel',
		requires : ['extspect.view.object.datalist.ArrayList'],

		config : {
			items : [
				{    title : 'Array',
					items : { xtype : 'arraylist' }
				}
			]
		}
	}
);
