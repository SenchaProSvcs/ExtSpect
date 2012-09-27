Ext.define( 'extspect.view.tree.toolbar.TreeListToolbar',
	{  extend : 'extspect.view.ExtSpectToolbar',
		xtype : 'treelisttoolbar',
		requires : [
			'extspect.view.tree.button.sort.TreeButton' ,
			'extspect.view.tree.button.sort.ListingButton'
		]
	}
);
