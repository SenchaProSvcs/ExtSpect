Ext.define( 'ux.extspect.view.tree.button.show.ListenersButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'listenersbutton',
		config : {    text : '+ Listeners',
			handler : function () { this.showListeners(); }
		}
	}
);

