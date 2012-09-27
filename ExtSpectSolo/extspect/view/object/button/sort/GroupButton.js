Ext.define( 'extspect.view.object.button.sort.GroupButton',
	{  extend : 'extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'groupbutton',
		config : {
			text : 'Group',
			handler : function () { this.sortByGroup(); }
		}
	}
);
