Ext.define( 'ux.extspect.view.tree.button.show.NoListenersButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'nolistenersbutton',
		config : {    text : 'No Listeners',
			handler : function () { this.showNoListeners(); }
		}
	}
);

