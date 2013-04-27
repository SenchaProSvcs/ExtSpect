Ext.define( 'uxExtSpect.view.tree.button.show.NoListenersButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'nolistenersbutton',
		config : {    text : 'No Listeners',
			handler : function () { this.showNoListeners(); }
		}
	}
);

