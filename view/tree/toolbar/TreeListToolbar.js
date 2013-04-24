Ext.define( 'ux.extspect.view.tree.toolbar.TreeListToolbar',
	{  extend : 'ux.extspect.view.ExtSpectToolbar',
		xtype : 'treelisttoolbar',
		requires : [
			'ux.extspect.view.tree.button.sort.TreeButton' ,
			'ux.extspect.view.tree.button.sort.ListingButton'
		]
	}
);
