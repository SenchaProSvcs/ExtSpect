Ext.define( 'uxExtSpect.view.tree.toolbar.BasicTreeToolbar',
	{  extend : 'uxExtSpect.view.tree.toolbar.TreeListToolbar',
		xtype : 'basictreetoolbar',

		config : {    items : [
			{    xtype : 'segmentedbutton',
				items : [
					{    xtype : 'treebutton' } ,
					{    xtype : 'listingbutton' }
				]
			}
		]
		}
	}
);
