Ext.define( 'extspect.view.tree.button.show.ListenersButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'listenersbutton',
		config : {    text : '+ Listeners',
			handler : function () { this.showListeners(); }
		}
	}
);

