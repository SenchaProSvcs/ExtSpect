Ext.define( 'uxExtSpect.view.tree.button.show.ListenersButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'listenersbutton',
		config : {    text : '+ Listeners',
			handler : function () { this.showListeners(); }
		}
	}
);

