Ext.define( 'ux.extspect.view.tree.toolbar.BasicTreeToolbar',
	{  extend : 'ux.extspect.view.tree.toolbar.TreeListToolbar',
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
