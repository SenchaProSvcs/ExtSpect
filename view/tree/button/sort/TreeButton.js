Ext.define( 'uxExtSpect.view.tree.button.sort.TreeButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'treebutton',
		config : {
			text : 'Tree',
			pressed : true,
			handler : function () { this.showTree(); }
		}
	}
);
