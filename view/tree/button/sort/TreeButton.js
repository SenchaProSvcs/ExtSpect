Ext.define( 'ux.extspect.view.tree.button.sort.TreeButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'treebutton',
		config : {
			text : 'Tree',
			pressed : true,
			handler : function () { this.showTree(); }
		}
	}
);
