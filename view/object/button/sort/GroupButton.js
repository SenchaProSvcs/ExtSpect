Ext.define( 'ux.extspect.view.object.button.sort.GroupButton',
	{  extend : 'ux.extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'groupbutton',
		config : {
			text : 'Group',
			handler : function () { this.sortByGroup(); }
		}
	}
);
