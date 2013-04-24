Ext.define( 'ux.extspect.view.object.button.sort.AlphaButton',
	{  extend : 'ux.extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'alphabutton',
		config : {    text : 'A-z', pressed : true,
			handler : function () { this.sortAlphabetically(); }
		}
	}
);
