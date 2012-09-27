Ext.define( 'extspect.view.tree.button.show.InstancesButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'instancesbutton',
		config : {    text : 'Instances',
			handler : function () { this.showInstances(); }
		}
	}
);

