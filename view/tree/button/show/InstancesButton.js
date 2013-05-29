Ext.define( 'uxExtSpect.view.tree.button.show.InstancesButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'instancesbutton',
		config : {
			text : 'All Objects',
			handler : function () { this.showInstances(); }
		}
	}
);

