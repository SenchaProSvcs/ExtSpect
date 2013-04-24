Ext.define( 'ux.extspect.view.object.tabpanel.ArrayTabPanel',
	{  extend : 'ux.extspect.view.ExtSpectTabPanel',
		xtype : 'arraytabpanel',
		requires : ['ux.extspect.view.object.datalist.ArrayList'],

		config : {
			items : [
				{    title : 'Array',
					items : { xtype : 'arraylist' }
				}
			]
		}
	}
);
