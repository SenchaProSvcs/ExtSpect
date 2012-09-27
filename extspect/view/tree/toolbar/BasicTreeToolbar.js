Ext.define( 'extspect.view.tree.toolbar.BasicTreeToolbar',
	{  extend : 'extspect.view.tree.toolbar.TreeListToolbar',
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
