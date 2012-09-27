Ext.define( 'extspect.view.object.button.sort.AlphaButton',
	{  extend : 'extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'alphabutton',
		config : {    text : 'A-z', pressed : true,
			handler : function () { this.sortAlphabetically(); }
		}
	}
);
