Ext.define( 'uxExtSpect.view.tree.button.show.ComponentsButton',
	{  extend: 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype: 'componentsbutton',
		config: {
			text: 'Components',
			handler: function () { this.showAllComponents(); }
		}
	}
);
