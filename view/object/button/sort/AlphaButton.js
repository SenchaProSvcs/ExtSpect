Ext.define( 'uxExtSpect.view.object.button.sort.AlphaButton',
	{  extend: 'uxExtSpect.view.object.button.PropertiesListToolbarButton',
		xtype: 'alphabutton',
		config: {
			text: 'A-z',
			handler: function () { this.sortAlphabetically(); }
		}
	}
);
