Ext.define( 'uxExtSpect.view.object.button.sort.GroupButton',
	{  extend: 'uxExtSpect.view.object.button.PropertiesListToolbarButton',
		xtype: 'groupbutton',
		config: {
			text: 'Group',
			handler: function () { this.sortByGroup(); }
		}
	}
);
