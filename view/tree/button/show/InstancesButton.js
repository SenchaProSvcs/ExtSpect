Ext.define( 'ux.extspect.view.tree.button.show.InstancesButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'instancesbutton',
		config : {    text : 'Instances',
			handler : function () { this.showInstances(); }
		}
	}
);

