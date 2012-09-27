Ext.define( 'extspect.view.tree.button.show.NoListenersButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'nolistenersbutton',
		config : {    text : 'No Listeners',
			handler : function () { this.showNoListeners(); }
		}
	}
);

