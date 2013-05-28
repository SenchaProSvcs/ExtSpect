Ext.define( 'uxExtSpect.view.tree.button.show.ListenersButton',
	{  extend: 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype: 'componentsbutton',
		config: {
			text: 'components',
			handler: function () { this.showListeners(); }
		}
	}
);
