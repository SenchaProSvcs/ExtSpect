Ext.define( 'ux.extspect.view.tree.button.show.ClassesOnlyButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'classesonlybutton',
		config : {    text : 'Classes Only',
			handler : function () { this.showNoInstances(); }
		}
	}
);
