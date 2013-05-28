Ext.define( 'uxExtSpect.view.tree.button.show.ClassesOnlyButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'classesonlybutton',
		config : {
			text : 'Classes Only',
			handler : function () { this.showClassesOnly(); }
		}
	}
);
