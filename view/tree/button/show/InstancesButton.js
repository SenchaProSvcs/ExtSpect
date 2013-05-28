Ext.define( 'uxExtSpect.view.tree.button.show.InstancesButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'instancesbutton',
		config : {
			text : 'Instances',
			handler : function () { this.showInstances(); }
		}
	}
);

