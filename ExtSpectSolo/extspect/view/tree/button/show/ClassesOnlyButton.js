Ext.define( 'extspect.view.tree.button.show.ClassesOnlyButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'classesonlybutton',
		config : {    text : 'Classes Only',
			handler : function () { this.showNoInstances(); }
		}
	}
);
