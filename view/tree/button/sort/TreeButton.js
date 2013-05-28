Ext.define( 'uxExtSpect.view.tree.button.sort.TreeButton',
	{  extend: 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype: 'treebutton',
		config: {
			text: 'Tree',
			handler: function () { this.showTree(); }
		}
	}
);
