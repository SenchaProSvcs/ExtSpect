Ext.define( 'uxExtSpect.view.tree.button.show.ClassesOnlyButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'classesonlybutton',
		config : {
			text : 'Classes',
			handler : function () { this.showClassesOnly(); }
		}
	}
);
