Ext.define( 'extspect.view.tree.button.sort.TreeButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'treebutton',
		config : {
			text : 'Tree',
			pressed : true,
			handler : function () { this.showTree(); }
		}
	}
);
