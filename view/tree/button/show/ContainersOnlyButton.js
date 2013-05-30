Ext.define( 'uxExtSpect.view.tree.button.show.ContainersOnlyButton',
	{  extend: 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype: 'containersonlybutton',
		config: {
			text: 'Containers',
			handler: function () { this.showContainersOnly(); }
		}
	}
);

